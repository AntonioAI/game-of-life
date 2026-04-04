import { describe, it, expect } from 'vitest';
import {
  gridsEqual,
  copyGrid,
  isGridEmpty,
  countLiveCells,
  detectCycle,
  isStable,
  getConvergenceState,
  analyzeGridPattern,
  type Grid,
} from './patternAnalyzer';

describe('patternAnalyzer', () => {
  // Helper to create a block still life (2x2 alive square)
  function createBlock(): Grid {
    return [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ];
  }

  // Helper to create a blinker oscillator (period 2)
  // State 1: vertical
  function createBlinkerVertical(): Grid {
    return [
      [false, false, false],
      [true, true, true],
      [false, false, false],
    ];
  }

  // State 2 of blinker: horizontal
  function createBlinkerHorizontal(): Grid {
    return [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];
  }

  // Helper to create empty grid
  function createEmptyGrid(width: number, height: number): Grid {
    return Array(height)
      .fill(null)
      .map(() => Array(width).fill(false));
  }

  describe('gridsEqual', () => {
    it('should return true for identical grids', () => {
      const grid1 = createBlock();
      const grid2 = createBlock();
      expect(gridsEqual(grid1, grid2)).toBe(true);
    });

    it('should return false for different grids', () => {
      const grid1 = createBlock();
      const grid2 = createBlinkerVertical();
      expect(gridsEqual(grid1, grid2)).toBe(false);
    });

    it('should return false for different dimensions', () => {
      const grid1 = createBlock();
      const grid2 = createEmptyGrid(5, 5);
      expect(gridsEqual(grid1, grid2)).toBe(false);
    });

    it('should be case-sensitive about cell state', () => {
      const grid1: Grid = [[true, false], [false, true]];
      const grid2: Grid = [[false, false], [false, true]];
      expect(gridsEqual(grid1, grid2)).toBe(false);
    });
  });

  describe('copyGrid', () => {
    it('should create a deep copy', () => {
      const original = createBlock();
      const copy = copyGrid(original);

      expect(gridsEqual(original, copy)).toBe(true);

      // Verify it's a deep copy (modifying copy doesn't affect original)
      copy[0][0] = true;
      expect(gridsEqual(original, copy)).toBe(false);
    });
  });

  describe('isGridEmpty', () => {
    it('should return true for completely empty grid', () => {
      const empty = createEmptyGrid(5, 5);
      expect(isGridEmpty(empty)).toBe(true);
    });

    it('should return false if any cell is alive', () => {
      const grid = createEmptyGrid(5, 5);
      grid[2][2] = true;
      expect(isGridEmpty(grid)).toBe(false);
    });

    it('should return false for block pattern', () => {
      const block = createBlock();
      expect(isGridEmpty(block)).toBe(false);
    });
  });

  describe('countLiveCells', () => {
    it('should count 0 cells in empty grid', () => {
      const empty = createEmptyGrid(5, 5);
      expect(countLiveCells(empty)).toBe(0);
    });

    it('should count 4 cells in block pattern', () => {
      const block = createBlock();
      expect(countLiveCells(block)).toBe(4);
    });

    it('should count 3 cells in blinker', () => {
      const blinker = createBlinkerVertical();
      expect(countLiveCells(blinker)).toBe(3);
    });
  });

  describe('isStable', () => {
    it('should return true if grid matches previous', () => {
      const block = createBlock();
      const previousBlock = copyGrid(block);
      expect(isStable(block, previousBlock)).toBe(true);
    });

    it('should return false if grid differs from previous', () => {
      const blinkerV = createBlinkerVertical();
      const blinkerH = createBlinkerHorizontal();
      expect(isStable(blinkerH, blinkerV)).toBe(false);
    });

    it('should return false if previousGrid is null', () => {
      const block = createBlock();
      expect(isStable(block, null)).toBe(false);
    });
  });

  describe('detectCycle', () => {
    it('should detect period 1 (still life)', () => {
      const block = createBlock();
      const history = [copyGrid(block)];
      const period = detectCycle(block, history);
      expect(period).toBe(1);
    });

    it('should detect period 2 oscillator (blinker)', () => {
      // Blinker cycle: V -> H -> V (period 2)
      const blinkerV = createBlinkerVertical();
      const blinkerH = createBlinkerHorizontal();

      const history = [copyGrid(blinkerV), copyGrid(blinkerH)];
      const period = detectCycle(blinkerV, history);
      expect(period).toBe(2);
    });

    it('should handle period 3 oscillator', () => {
      const gridA = createEmptyGrid(5, 5);
      gridA[2][2] = true; // Single cell

      const gridB = createEmptyGrid(5, 5);
      gridB[2][3] = true;

      const gridC = createEmptyGrid(5, 5);
      gridC[2][4] = true;

      const history = [copyGrid(gridA), copyGrid(gridB), copyGrid(gridC)];
      const period = detectCycle(gridA, history);
      expect(period).toBe(3);
    });

    it('should return null if no cycle detected', () => {
      const gridA = createEmptyGrid(5, 5);
      gridA[0][0] = true;

      const gridB = createEmptyGrid(5, 5);
      gridB[1][1] = true;

      const gridC = createEmptyGrid(5, 5);
      gridC[2][2] = true;

      const history = [copyGrid(gridA), copyGrid(gridB)];
      const period = detectCycle(gridC, history);
      expect(period).toBeNull();
    });

    it('should return null for empty history', () => {
      const block = createBlock();
      const period = detectCycle(block, []);
      expect(period).toBeNull();
    });

    it('should respect maxLookback parameter', () => {
      const gridA = createEmptyGrid(5, 5);
      gridA[0][0] = true;

      const gridB = createEmptyGrid(5, 5);
      gridB[1][1] = true;

      const history: Grid[] = [];
      // Add gridA at the beginning
      history.push(copyGrid(gridA));
      
      // Add 150 different grids varying grid B (to create unique states)
      for (let i = 0; i < 150; i++) {
        const grid = createEmptyGrid(5, 5);
        grid[1 + (i % 4)][1 + (i % 4)] = true;
        history.push(copyGrid(grid));
      }

      // gridA appears at index 0, which is 150 generations ago from the last state (index 150)
      // With maxLookback=100, should not detect it (since 150 > 100)
      const period = detectCycle(gridA, history, 100);
      expect(period).toBeNull();

      // With maxLookback=200, should detect it at distance 151 (history length)
      const period2 = detectCycle(gridA, history, 200);
      expect(period2).toBe(151);
    });
  });

  describe('getConvergenceState', () => {
    it('should detect stable empty grid', () => {
      const empty = createEmptyGrid(5, 5);
      const result = getConvergenceState(empty, []);
      expect(result.type).toBe('stable');
    });

    it('should detect stable still life (block)', () => {
      const block = createBlock();
      const previousBlock = copyGrid(block);
      const history = [previousBlock];

      const result = getConvergenceState(block, history);
      expect(result.type).toBe('stable');
      expect(result.stableGenerationCount).toBe(1);
    });

    it('should count consecutive stable generations', () => {
      const block = createBlock();
      const history = [copyGrid(block), copyGrid(block), copyGrid(block)];

      const result = getConvergenceState(block, history);
      expect(result.type).toBe('stable');
      expect(result.stableGenerationCount).toBe(3); // 3 in history (loop counts pairs + initial)
    });

    it('should detect oscillating pattern (blinker)', () => {
      const blinkerV = createBlinkerVertical();
      const blinkerH = createBlinkerHorizontal();

      const history = [copyGrid(blinkerV), copyGrid(blinkerH)];
      const result = getConvergenceState(blinkerV, history);
      expect(result.type).toBe('oscillating');
      expect(result.period).toBe(2);
    });

    it('should detect chaotic pattern (no cycle, unpredictable)', () => {
      const gridA = createEmptyGrid(5, 5);
      gridA[0][0] = true;

      const gridB = createEmptyGrid(5, 5);
      gridB[1][1] = true;

      const gridC = createEmptyGrid(5, 5);
      gridC[2][2] = true;

      const gridD = createEmptyGrid(5, 5);
      gridD[3][3] = true;

      const history = [copyGrid(gridA), copyGrid(gridB), copyGrid(gridC)];
      const result = getConvergenceState(gridD, history);
      expect(result.type).toBe('chaotic');
    });

    it('should detect converging pattern (stabilizing population)', () => {
      // Create a chaotic pattern that changes each generation
      const grid1 = createEmptyGrid(5, 5);
      grid1[0][0] = true;
      grid1[1][1] = true;
      grid1[2][2] = true;

      const grid2 = createEmptyGrid(5, 5);
      grid2[0][1] = true;
      grid2[1][2] = true;
      grid2[2][3] = true;

      const grid3 = createEmptyGrid(5, 5);
      grid3[0][2] = true;
      grid3[1][3] = true;
      grid3[2][4] = true;

      const grid4 = createEmptyGrid(5, 5);
      grid4[0][3] = true;
      grid4[1][4] = true;

      // History shows grid changing each generation
      const history = [copyGrid(grid1), copyGrid(grid2), copyGrid(grid3)];

      // Population history shows convergence (values stabilizing)
      const populationHistory = [
        { population: 100 },
        { population: 95 },
        { population: 90 },
        { population: 88 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
        { population: 87 },
      ];

      const result = getConvergenceState(grid4, history, populationHistory);
      expect(result.type).toBe('converging');
    });
  });

  describe('analyzeGridPattern', () => {
    it('should provide complete analysis for still life', () => {
      const block = createBlock();
      const previousBlock = copyGrid(block);
      const history = [previousBlock];

      const analysis = analyzeGridPattern(block, history);

      expect(analysis.type).toBe('stable');
      expect(analysis.isEmpty).toBe(false);
      expect(analysis.liveCellCount).toBe(4);
      expect(analysis.stableGenerationCount).toBe(1);
    });

    it('should track when grid last changed', () => {
      const block = createBlock();
      const history = [
        copyGrid(block),
        copyGrid(block),
        copyGrid(block),
      ];

      const analysis = analyzeGridPattern(block, history);
      expect(analysis.lastChangeGeneration).toBeNull(); // Never changed
    });

    it('should report empty grid', () => {
      const empty = createEmptyGrid(5, 5);
      const analysis = analyzeGridPattern(empty, []);

      expect(analysis.isEmpty).toBe(true);
      expect(analysis.liveCellCount).toBe(0);
    });
  });

  describe('integration: real-world patterns', () => {
    it('should correctly analyze a block (most famous still life)', () => {
      const block = createBlock();
      const blockRepeat = copyGrid(block);
      const history = [blockRepeat];

      const analysis = analyzeGridPattern(block, history);
      expect(analysis.type).toBe('stable');
      expect(analysis.period).toBeUndefined();
      expect(analysis.liveCellCount).toBe(4);
    });

    it('should correctly analyze a blinker oscillator', () => {
      const blinkerV = createBlinkerVertical();
      const blinkerH = createBlinkerHorizontal();

      // Simulate blinker oscillation over time
      const history: Grid[] = [
        copyGrid(blinkerV),
        copyGrid(blinkerH),
      ];

      // At generation 3, we expect to see blinkerV again
      const analysis = analyzeGridPattern(blinkerV, history);
      expect(analysis.type).toBe('oscillating');
      expect(analysis.period).toBe(2);
      expect(analysis.liveCellCount).toBe(3);
    });
  });
});
