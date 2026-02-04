export interface SavedGridState {
  name: string;
  grid: boolean[][];
  generation: number;
  timestamp: number;
}

const STORAGE_PREFIX = "game-of-life-state-";

// Ensures timestamps are always increasing even if Date.now() returns same ms
let lastTimestamp = 0;

export function saveGridState(
  name: string,
  grid: boolean[][],
  generation: number
): void {
  // Defensive generation coercion
  const gen = Number.isFinite(generation) ? Math.floor(generation) : 0;

  // Monotonic timestamp (fixes timestamp-collision ordering)
  let ts = Date.now();
  if (ts <= lastTimestamp) ts = lastTimestamp + 1;
  lastTimestamp = ts;

  const state: SavedGridState = {
    name,
    grid,
    generation: gen,
    timestamp: ts,
  };

  try {
    localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(state));
  } catch {
    // localStorage can throw in some environments (quota, privacy mode, etc.)
    // We intentionally don't throw; the app should continue to function.
  }
}

export function loadGridState(name: string): SavedGridState | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${name}`);
    if (!raw) return null;

    const parsed = safeJsonParse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    const normalized = normalizeSavedGridState(parsed);
    if (!normalized) return null;

    // Ensure name matches what caller asked for (key is source of truth)
    normalized.name = name;
    return normalized;
  } catch {
    return null;
  }
}

export function getSavedStates(): SavedGridState[] {
  const states: SavedGridState[] = [];

  let keys: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) keys.push(key);
    }
  } catch {
    return [];
  }

  for (const key of keys) {
    const name = key.slice(STORAGE_PREFIX.length);
    const state = loadGridState(name);
    if (state) states.push(state);
  }

  // Newest first
  return states
    .slice()
    .sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0));
}

export function deleteSavedState(name: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${name}`);
  } catch {
    // no-op
  }
}

// -----------------
// helpers
// -----------------

function safeJsonParse(input: string): unknown | null {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}

function normalizeSavedGridState(value: any): SavedGridState | null {
  // grid must be boolean[][]
  const grid = normalizeBooleanGrid(value.grid);
  if (!grid) return null;

  // generation can be number or numeric string
  const generation = coerceInt(value.generation, 0);

  // timestamp can be number or numeric string
  const timestamp = coerceInt(value.timestamp, 0);

  // name must be string (we'll overwrite it with key-derived name anyway)
  const name = typeof value.name === "string" ? value.name : "";

  return { name, grid, generation, timestamp };
}

function coerceInt(v: unknown, fallback: number): number {
  const n =
    typeof v === "number" ? v :
    typeof v === "string" ? Number(v) :
    NaN;

  if (!Number.isFinite(n)) return fallback;
  return Math.floor(n);
}

function normalizeBooleanGrid(v: unknown): boolean[][] | null {
  if (!Array.isArray(v)) return null;

  const rows: boolean[][] = [];
  for (const row of v) {
    if (!Array.isArray(row)) return null;

    const boolRow: boolean[] = [];
    for (const cell of row) {
      if (typeof cell !== "boolean") return null;
      boolRow.push(cell);
    }
    rows.push(boolRow);
  }

  // If non-empty, enforce rectangular
  if (rows.length > 0) {
    const width = rows[0].length;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i].length !== width) return null;
    }
  }

  return rows;
}
