export interface SavedGridState {
  name: string;
  grid: boolean[][];
  generation: number;
  timestamp: number;
}

const STORAGE_PREFIX = 'game-of-life-state-';

export function saveGridState(name: string, grid: boolean[][], generation: number): void {
  const state: SavedGridState = {
    name,
    grid,
    generation,
    timestamp: Date.now(),
  };
  localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(state));
}

export function loadGridState(name: string): SavedGridState | null {
  try {
    const data = localStorage.getItem(`${STORAGE_PREFIX}${name}`);
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function getSavedStates(): SavedGridState[] {
  const states: SavedGridState[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      const name = key.replace(STORAGE_PREFIX, '');
      const state = loadGridState(name);
      if (state) {
        states.push(state);
      }
    }
  }
  
  return states.sort((a, b) => b.timestamp - a.timestamp);
}

export function deleteSavedState(name: string): void {
  localStorage.removeItem(`${STORAGE_PREFIX}${name}`);
}
