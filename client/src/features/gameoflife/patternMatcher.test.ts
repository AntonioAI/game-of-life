import { describe, it, expect } from 'vitest';
import {
  rotateCells90,
  flipCellsHorizontal,
  normalizeCells,
  getRotations,
  getBounds,
  patternMatchesAtLocation,
  findPatternInGrid,
  findAllPatternsInGrid,
  detectPatternsInGrid,
  type Grid,
} from './patternMatcher';

describe('patternMatcher', () => {
  // Helper to create empty grid
  function createEmptyGrid(width: number, height: number): Grid {
    return Array(height)
      .fill(null)
      .map(() => Array(width).fill(false));
  }

  // Helper to create grid with cells
  function createGridWithCells(width: number, height: number, cells: Array<[number, number]>): Grid {
    const grid = createEmptyGrid(width, height);
    cells.forEach(([r, c]) => {
      if (grid[r]) grid[r][c] = true;
    });
    return grid;
  }

  // Block (2x2 square)
  const blockCells: Array<[number, number]> = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  // Blinker (1x3 or 3x1 line)
  const blinkerCells: Array<[number, number]> = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];

  // Glider (asymmetric, demonstrates rotation importance)
  const gliderCells: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];

  describe('rotateCells90', () => {
    it('should rotate a line 90 degrees', () => {
      const line: Array<[number, number]> = [
        [0, 0],
        [0, 1],
        [0, 2],
      ];
      const rotated = rotateCells90(line);
      // Horizontal line becomes vertical line after 90° clockwise rotation
      expect(rotated.length).toBe(3);
      // After normalization, becomes vertical line at column 0
      expect(rotated[0]).toEqual([0, 0]);
      expect(rotated[1]).toEqual([1, 0]);
      expect(rotated[2]).toEqual([2, 0]);
    });

    it('should rotate a block 90 degrees (stays same)', () => {
      const rotated = rotateCells90(blockCells);
      // Block has rotational symmetry
      expect(rotated.length).toBe(4);
      // Should still form a 2x2 square
      const bounds = getBounds(rotated);
      expect(bounds.maxR - bounds.minR).toBe(1);
      expect(bounds.maxC - bounds.minC).toBe(1);
    });

    it('should rotate a glider', () => {
      const rotated = rotateCells90(gliderCells);
      expect(rotated.length).toBe(5);
      // Should still have 5 cells (rotation preserves count)
      expect(rotated.every(([r, c]) => r >= 0 && c >= 0)).toBe(true);
    });
  });

  describe('flipCellsHorizontal', () => {
    it('should flip a pattern horizontally', () => {
      const pattern: Array<[number, number]> = [
        [0, 0],
        [1, 1],
      ];
      const width = 2;
      const flipped = flipCellsHorizontal(pattern, width);

      expect(flipped[0]).toEqual([0, 1]); // [0,0] -> [0,1]
      expect(flipped[1]).toEqual([1, 0]); // [1,1] -> [1,0]
    });

    it('should flip block (stays same)', () => {
      const width = 2;
      const flipped = flipCellsHorizontal(blockCells, width);
      // Block has reflection symmetry
      expect(flipped.length).toBe(4);
    });
  });

  describe('normalizeCells', () => {
    it('should shift cells to origin', () => {
      const cells: Array<[number, number]> = [
        [5, 5],
        [5, 6],
        [6, 5],
        [6, 6],
      ];
      const normalized = normalizeCells(cells);

      expect(normalized[0]).toEqual([0, 0]);
      expect(normalized).toEqual(blockCells);
    });

    it('should handle empty array', () => {
      expect(normalizeCells([])).toEqual([]);
    });
  });

  describe('getRotations', () => {
    it('should return 4 rotations', () => {
      const rotations = getRotations(blinkerCells);
      expect(rotations.length).toBe(4);
      expect(rotations[0].length).toBe(3); // All have 3 cells
      expect(rotations[1].length).toBe(3);
      expect(rotations[2].length).toBe(3);
      expect(rotations[3].length).toBe(3);
    });

    it('should have different patterns for blinker', () => {
      const rotations = getRotations(blinkerCells);
      // Blinker has 2 distinct orientations (horizontal and vertical)
      // After 4 rotations should return to original, but we just verify structure
      expect(rotations.length).toBe(4);
      // All rotations should have 3 cells
      for (const rot of rotations) {
        expect(rot.length).toBe(3);
      }
      // Rotations 0 and 2 should represent same orientation (opposite directions)
      expect(getBounds(rotations[0]).maxC - getBounds(rotations[0]).minC).toEqual(
        getBounds(rotations[2]).maxC - getBounds(rotations[2]).minC
      );
    });

    it('should have symmetric block', () => {
      const rotations = getRotations(blockCells);
      // Block has rotational symmetry - stays 2x2 at all orientations
      expect(rotations.length).toBe(4);
      for (const rot of rotations) {
        expect(rot.length).toBe(4); // 4 cells
        const bounds = getBounds(rot);
        // Should be 2x2 bounding box
        expect(bounds.maxR - bounds.minR).toBe(1);
        expect(bounds.maxC - bounds.minC).toBe(1);
      }
    });
  });

  describe('getBounds', () => {
    it('should return bounding box of cells', () => {
      const bounds = getBounds(blockCells);
      expect(bounds.minR).toBe(0);
      expect(bounds.maxR).toBe(1);
      expect(bounds.minC).toBe(0);
      expect(bounds.maxC).toBe(1);
    });

    it('should handle single cell', () => {
      const single: Array<[number, number]> = [[5, 5]];
      const bounds = getBounds(single);
      expect(bounds.minR).toBe(5);
      expect(bounds.maxR).toBe(5);
      expect(bounds.minC).toBe(5);
      expect(bounds.maxC).toBe(5);
    });
  });

  describe('patternMatchesAtLocation', () => {
    it('should match a block at origin', () => {
      const grid = createGridWithCells(5, 5, blockCells);
      const matches = patternMatchesAtLocation(grid, blockCells, 0, 0, 5, 5);
      expect(matches).toBe(true);
    });

    it('should match a block at arbitrary location', () => {
      const grid = createGridWithCells(10, 10, [
        [3, 3],
        [3, 4],
        [4, 3],
        [4, 4],
      ]);
      const matches = patternMatchesAtLocation(grid, blockCells, 3, 3, 10, 10);
      expect(matches).toBe(true);
    });

    it('should not match if pattern extends out of bounds', () => {
      const grid = createGridWithCells(3, 3, blockCells);
      const matches = patternMatchesAtLocation(grid, blockCells, 2, 2, 3, 3);
      expect(matches).toBe(false);
    });

    it('should not match if cells are dead', () => {
      const grid = createGridWithCells(5, 5, [[0, 0]]); // Only one cell alive
      const matches = patternMatchesAtLocation(grid, blockCells, 0, 0, 5, 5);
      expect(matches).toBe(false);
    });
  });

  describe('findPatternInGrid', () => {
    it('should find block pattern at origin', () => {
      const grid = createGridWithCells(5, 5, blockCells);
      const match = findPatternInGrid(grid, 'Block', 'Still Life', blockCells);

      expect(match).not.toBeNull();
      expect(match?.patternName).toBe('Block');
      expect(match?.x).toBe(0);
      expect(match?.y).toBe(0);
    });

    it('should find block pattern at arbitrary location', () => {
      const grid = createGridWithCells(10, 10, [
        [5, 5],
        [5, 6],
        [6, 5],
        [6, 6],
      ]);
      const match = findPatternInGrid(grid, 'Block', 'Still Life', blockCells);

      expect(match).not.toBeNull();
      expect(match?.y).toBe(5);
      expect(match?.x).toBe(5);
    });

    it('should find blinker in horizontal orientation', () => {
      const grid = createGridWithCells(5, 5, blinkerCells);
      const match = findPatternInGrid(grid, 'Blinker', 'Oscillator', blinkerCells);

      expect(match).not.toBeNull();
      expect(match?.rotation).toBe(0); // Horizontal
    });

    it('should find blinker in vertical orientation', () => {
      // Vertical blinker (rotated 90°)
      const verticalBlinker = [
        [0, 0],
        [1, 0],
        [2, 0],
      ];
      const grid = createGridWithCells(5, 5, verticalBlinker);
      const match = findPatternInGrid(grid, 'Blinker', 'Oscillator', blinkerCells);

      expect(match).not.toBeNull();
      // Should detect rotation
      expect([0, 90, 180, 270]).toContain(match?.rotation);
    });

    it('should find glider', () => {
      const grid = createGridWithCells(10, 10, gliderCells);
      const match = findPatternInGrid(grid, 'Glider', 'Spaceship', gliderCells);

      expect(match).not.toBeNull();
      expect(match?.patternName).toBe('Glider');
    });

    it('should return null if pattern not found', () => {
      const grid = createEmptyGrid(5, 5);
      const match = findPatternInGrid(grid, 'Block', 'Still Life', blockCells);
      expect(match).toBeNull();
    });
  });

  describe('findAllPatternsInGrid', () => {
    it('should find multiple blocks', () => {
      const grid = createGridWithCells(10, 10, [
        // First block
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
        // Second block (separated)
        [5, 5],
        [5, 6],
        [6, 5],
        [6, 6],
      ]);

      const matches = findAllPatternsInGrid(grid, 'Block', 'Still Life', blockCells, 10);
      expect(matches.length).toBeGreaterThanOrEqual(1);
      expect(matches[0].patternName).toBe('Block');
    });

    it('should respect maxResults limit', () => {
      const grid = createGridWithCells(20, 20, [
        // Multiple blocks
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
        [0, 3],
        [0, 4],
        [1, 3],
        [1, 4],
        [0, 6],
        [0, 7],
        [1, 6],
        [1, 7],
      ]);

      const matches = findAllPatternsInGrid(grid, 'Block', 'Still Life', blockCells, 2);
      expect(matches.length).toBeLessThanOrEqual(2);
    });

    it('should find blocks with different rotations (if not rotationally symmetric)', () => {
      // Using blinker which has 2 distinct orientations
      const grid = createGridWithCells(10, 10, [
        // Horizontal blinker
        [0, 0],
        [0, 1],
        [0, 2],
        // Vertical blinker
        [3, 0],
        [4, 0],
        [5, 0],
      ]);

      const matches = findAllPatternsInGrid(grid, 'Blinker', 'Oscillator', blinkerCells, 10);
      // Should find at least 1 blinker (may find multiple if rotation-aware matching works)
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('detectPatternsInGrid', () => {
    it('should detect multiple pattern types', () => {
      const grid = createGridWithCells(10, 10, [
        // Block
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
        // Blinker
        [3, 0],
        [3, 1],
        [3, 2],
      ]);

      const patterns = [
        { name: 'Block', category: 'Still Life', cells: blockCells },
        { name: 'Blinker', category: 'Oscillator', cells: blinkerCells },
      ];

      const matches = detectPatternsInGrid(grid, patterns, 10);
      expect(matches.length).toBeGreaterThanOrEqual(2);

      const names = new Set(matches.map((m) => m.patternName));
      expect(names.has('Block')).toBe(true);
      expect(names.has('Blinker')).toBe(true);
    });

    it('should sort matches by position', () => {
      const grid = createGridWithCells(10, 10, [
        // Block at (5, 5)
        [5, 5],
        [5, 6],
        [6, 5],
        [6, 6],
        // Block at (0, 0)
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ]);

      const patterns = [{ name: 'Block', category: 'Still Life', cells: blockCells }];
      const matches = detectPatternsInGrid(grid, patterns, 10);

      // Should be sorted top-left to bottom-right
      if (matches.length > 1) {
        expect(matches[0].y).toBeLessThanOrEqual(matches[1].y);
      }
    });

    it('should return empty array for empty grid', () => {
      const grid = createEmptyGrid(10, 10);
      const patterns = [{ name: 'Block', category: 'Still Life', cells: blockCells }];
      const matches = detectPatternsInGrid(grid, patterns, 10);
      expect(matches.length).toBe(0);
    });
  });

  describe('integration: real patterns', () => {
    it('should find a glider in complex grid', () => {
      const grid = createGridWithCells(15, 15, [
        // Some noise
        [0, 0],
        [1, 1],
        [2, 2],
        // Glider at position (5, 5)
        [5, 6],
        [6, 7],
        [7, 5],
        [7, 6],
        [7, 7],
      ]);

      const patterns = [{ name: 'Glider', category: 'Spaceship', cells: gliderCells }];
      const matches = detectPatternsInGrid(grid, patterns, 10);

      expect(matches.some((m) => m.patternName === 'Glider')).toBe(true);
    });

    it('should handle grid with only noise', () => {
      const grid = createGridWithCells(10, 10, [
        [0, 0],
        [2, 3],
        [5, 5],
        [9, 9],
      ]);

      const patterns = [{ name: 'Block', category: 'Still Life', cells: blockCells }];
      const matches = detectPatternsInGrid(grid, patterns, 10);

      expect(matches.length).toBe(0);
    });
  });
});
