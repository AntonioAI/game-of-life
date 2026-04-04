/**
 * Pattern analysis utilities for detecting cycles, stability, and convergence in Game of Life.
 * These tools analyze grid evolution to identify:
 * - Stable patterns (no change generation to generation)
 * - Oscillators (repeating patterns with period > 1)
 * - Chaotic vs. converging behavior
 */

export type Grid = boolean[][];

export type ConvergenceState = 'stable' | 'oscillating' | 'chaotic' | 'converging';

export interface CycleAnalysis {
  type: ConvergenceState;
  period?: number; // For oscillating patterns (e.g., 2 for blinker)
  stableGenerationCount?: number; // How many generations the pattern has been stable
}

/**
 * Compare two grids for exact equality
 */
export function gridsEqual(grid1: Grid, grid2: Grid): boolean {
  if (grid1.length !== grid2.length || grid1[0].length !== grid2[0].length) {
    return false;
  }

  for (let row = 0; row < grid1.length; row++) {
    for (let col = 0; col < grid1[row].length; col++) {
      if (grid1[row][col] !== grid2[row][col]) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Create a deep copy of a grid
 */
export function copyGrid(grid: Grid): Grid {
  return grid.map((row) => [...row]);
}

/**
 * Check if a grid is completely empty (all cells dead)
 */
export function isGridEmpty(grid: Grid): boolean {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col]) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Count live cells in a grid
 */
export function countLiveCells(grid: Grid): number {
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col]) {
        count++;
      }
    }
  }
  return count;
}

/**
 * Detect if a grid state has a cycle based on history.
 * Returns the period (number of generations until state repeats) or null if no cycle.
 *
 * Example:
 * - Blinker: period = 2 (state A -> B -> A repeats)
 * - Pulsar: period = 3 (state A -> B -> C -> A repeats)
 * - Block (still life): period = 1 (state never changes)
 *
 * @param currentGrid - The grid state to check
 * @param gridHistory - Array of previous grid states [oldest, ..., most recent]
 * @param maxLookback - Maximum generations to look back (default 100)
 * @returns period if cycle detected, null otherwise
 */
export function detectCycle(
  currentGrid: Grid,
  gridHistory: Grid[],
  maxLookback: number = 100
): number | null {
  // Can't have a cycle without history
  if (gridHistory.length === 0) {
    return null;
  }

  // Look for a matching state in history
  // Check from most recent (generation -1) back to oldest
  const lookbackDistance = Math.min(gridHistory.length, maxLookback);

  for (let i = 1; i <= lookbackDistance; i++) {
    const historyIndex = gridHistory.length - i;
    if (historyIndex >= 0) {
      if (gridsEqual(currentGrid, gridHistory[historyIndex])) {
        // Found matching state at distance i generations ago
        // This means the period is i (it repeats every i generations)
        return i;
      }
    }
  }

  return null;
}

/**
 * Check if a grid is stable (all cells will remain in same state).
 * A grid is stable if it hasn't changed compared to previous state.
 *
 * @param currentGrid - The current grid
 * @param previousGrid - The grid from the previous generation
 * @returns true if grid is identical to previous
 */
export function isStable(currentGrid: Grid, previousGrid: Grid | null): boolean {
  if (previousGrid === null) {
    return false;
  }
  return gridsEqual(currentGrid, previousGrid);
}

/**
 * Calculate the convergence state by analyzing the grid pattern.
 * This combines multiple signals to classify the simulation state.
 *
 * States:
 * - 'stable': Grid hasn't changed (still life pattern)
 * - 'oscillating': Grid repeats with a period (e.g., blinker repeats every 2 generations)
 * - 'chaotic': Grid is changing every generation with no cycle detected
 * - 'converging': Pattern is trending toward stability (less chaotic over time)
 *
 * @param currentGrid - The current grid state
 * @param gridHistory - Array of previous grid states
 * @param populationHistory - Array of population values for trend analysis
 * @returns CycleAnalysis object with type and metadata
 */
export function getConvergenceState(
  currentGrid: Grid,
  gridHistory: Grid[],
  populationHistory: Array<{ population: number }> = []
): CycleAnalysis {
  // Empty grid is technically stable
  if (isGridEmpty(currentGrid)) {
    return {
      type: 'stable',
      stableGenerationCount: gridHistory.length,
    };
  }

  // Check if stable (no change from previous generation)
  const previousGrid = gridHistory.length > 0 ? gridHistory[gridHistory.length - 1] : null;

  if (previousGrid && isStable(currentGrid, previousGrid)) {
    // Count how many generations it's been stable
    let stableCount = 1;
    for (let i = gridHistory.length - 1; i > 0; i--) {
      if (gridsEqual(gridHistory[i], gridHistory[i - 1])) {
        stableCount++;
      } else {
        break;
      }
    }

    return {
      type: 'stable',
      stableGenerationCount: stableCount,
    };
  }

  // Check if oscillating (repeating pattern)
  const period = detectCycle(currentGrid, gridHistory);
  if (period !== null && period > 0) {
    return {
      type: 'oscillating',
      period,
    };
  }

  // Analyze trend to determine if converging or chaotic
  // A pattern is "converging" if the population is stabilizing
  // A pattern is "chaotic" if it's highly variable or growing unpredictably

  if (populationHistory.length >= 20) {
    // Look at the last 20 generations
    const recentPopulations = populationHistory.slice(-20).map((p) => p.population);
    const avgPopulation = recentPopulations.reduce((a, b) => a + b, 0) / recentPopulations.length;
    const variance = recentPopulations.reduce((sum, p) => sum + Math.pow(p - avgPopulation, 2), 0) / recentPopulations.length;
    const populationStdDev = Math.sqrt(variance);
    const coefficientOfVariation = populationStdDev / (avgPopulation || 1);

    // If coefficient of variation is low, population is stabilizing
    if (coefficientOfVariation < 0.1) {
      return {
        type: 'converging',
      };
    }
  }

  // Default: chaotic (changing without detected cycle)
  return {
    type: 'chaotic',
  };
}

/**
 * Analyze grid history to understand pattern behavior.
 * Provides detailed metrics about the simulation's evolution.
 *
 * @param currentGrid - The current grid state
 * @param gridHistory - Array of previous grid states
 * @param populationHistory - Array of population values for trend analysis
 * @returns Comprehensive analysis
 */
export interface GridAnalysis extends CycleAnalysis {
  isEmpty: boolean;
  liveCellCount: number;
  lastChangeGeneration: number | null;
}

export function analyzeGridPattern(
  currentGrid: Grid,
  gridHistory: Grid[],
  populationHistory: Array<{ population: number }> = []
): GridAnalysis {
  const convergence = getConvergenceState(currentGrid, gridHistory, populationHistory);
  const isEmpty = isGridEmpty(currentGrid);
  const liveCellCount = countLiveCells(currentGrid);

  // Find when the grid last changed
  let lastChangeGeneration: number | null = null;
  if (gridHistory.length > 0) {
    for (let i = gridHistory.length - 1; i >= 0; i--) {
      if (!gridsEqual(currentGrid, gridHistory[i])) {
        lastChangeGeneration = gridHistory.length - i;
        break;
      }
    }
  }

  return {
    ...convergence,
    isEmpty,
    liveCellCount,
    lastChangeGeneration,
  };
}
