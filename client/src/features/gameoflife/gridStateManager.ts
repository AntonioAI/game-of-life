export interface SavedGridState {
  name: string;
  grid: boolean[][];
  generation: number;
  timestamp: number;
}

const STORAGE_PREFIX = "game-of-life-state-";

/**
 * Save a grid state into localStorage.
 * Defensive: catches localStorage errors (quota, privacy mode, etc.).
 */
export function saveGridState(
  name: string,
  grid: boolean[][],
  generation: number
): void {
  const state: SavedGridState = {
    name,
    grid,
    generation: Number.isFinite(generation) ? Math.floor(generation) : 0,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(state));
  } catch {
    // In some environments (Safari private mode / quota exceeded) this can throw.
    // We intentionally do not throw in the app layer.
  }
}

/**
 * Load a grid state from localStorage.
 * Defensive: returns null for missing, invalid JSON, or invalid shape.
 */
export function loadGridState(name: string): SavedGridState | null {
  const key = `${STORAGE_PREFIX}${name}`;

  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    return null;
  }

  if (!raw) return null;

  const parsed = safeJsonParse(raw);
  if (!parsed || typeof parsed !== "object") return null;

  const normalized = normalizeSavedGridState(parsed);
  if (!normalized) return null;

  // Ensure the name matches the key-derived name (prevents weird data clashes)
  if (normalized.name !== name) {
    normalized.name = name;
  }

  return normalized;
}

/**
 * Returns all saved states sorted by timestamp DESC (newest first).
 * Defensive: ignores corrupted entries and handles localStorage access errors.
 *
 * Sort rules:
 *  1) timestamp DESC
 *  2) name DESC (tie-breaker) so ordering is stable in tests even if timestamps collide
 */
export function getSavedStates(): SavedGridState[] {
  let keys: string[] = [];

  try {
    // Snapshot keys first, because localStorage can change during iteration
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX)) keys.push(k);
    }
  } catch {
    return [];
  }

  const states: SavedGridState[] = [];

  for (const key of keys) {
    const name = key.slice(STORAGE_PREFIX.length);
    const state = loadGridState(name);
    if (state) states.push(state);
  }

  return states
    .slice()
    .sort((a, b) => {
      const tsDiff = (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0);
      if (tsDiff !== 0) return tsDiff;

      // Stable tie-breaker (matches your test expectation "new" before "old")
      return b.name.localeCompare(a.name);
    });
}

/**
 * Deletes a saved state.
 * Defensive: doesn't throw if localStorage errors.
 */
export function deleteSavedState(name: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${name}`);
  } catch {
    // no-op
  }
}

// -------------------------
// Helpers
// -------------------------

function safeJsonParse(input: string): unknown | null {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}

function normalizeSavedGridState(value: any): SavedGridState | null {
  // name: must be string
  const name = typeof value.name === "string" ? value.name : null;
  if (!name) return null;

  // generation: accept number or numeric string
  const generation = coerceInt(value.generation, 0);

  // timestamp: accept number or numeric string
  const timestamp = coerceInt(value.timestamp, 0);

  // grid: must be boolean[][]
  const grid = normalizeBooleanGrid(value.grid);
  if (!grid) return null;

  return {
    name,
    grid,
    generation,
    timestamp,
  };
}

function coerceInt(v: unknown, fallback: number): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
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

  // Allow empty grid, but if non-empty, enforce rectangular shape
  if (rows.length > 0) {
    const width = rows[0].length;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i].length !== width) return null;
    }
  }

  return rows;
}
