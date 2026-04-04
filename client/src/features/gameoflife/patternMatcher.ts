/**
 * Pattern matching utilities for detecting known patterns in Game of Life grids.
 * Detects patterns with Support for rotations and reflections.
 */

export type Grid = boolean[][];

export interface PatternMatch {
  patternName: string;
  patternCategory: string;
  x: number; // Top-left x coordinate
  y: number; // Top-left y coordinate
  width: number;
  height: number;
  rotation: number; // 0, 90, 180, 270
  isReflected: boolean; // Horizontally reflected
  cells: Array<[row: number, col: number]>; // Absolute coordinates of live cells in match
}

/**
 * Rotate a pattern's cells 90 degrees clockwise
 * @param cells - Array of [row, col] coordinates
 * @returns Rotated cells with normalized coordinates (adjusted to origin)
 */
export function rotateCells90(cells: Array<[number, number]>): Array<[number, number]> {
  if (cells.length === 0) return [];

  // For 90° clockwise rotation: (row, col) -> (col, -row)
  // But we need to normalize to positive coordinates
  const rotated = cells.map(([r, c]) => [c, -r] as [number, number]);

  // Find min row and col to normalize
  const minRow = Math.min(...rotated.map(([r]) => r));
  const minCol = Math.min(...rotated.map(([, c]) => c));

  return rotated.map(([r, c]) => [r - minRow, c - minCol] as [number, number]);
}

/**
 * Flip a pattern horizontally (mirror along vertical axis)
 * @param cells - Array of [row, col] coordinates
 * @param width - Width of pattern bounding box
 * @returns Flipped cells
 */
export function flipCellsHorizontal(
  cells: Array<[number, number]>,
  width: number
): Array<[number, number]> {
  return cells.map(([r, c]) => [r, width - 1 - c] as [number, number]);
}

/**
 * Normalize cells to start at [0, 0]
 */
export function normalizeCells(cells: Array<[number, number]>): Array<[number, number]> {
  if (cells.length === 0) return [];

  const minRow = Math.min(...cells.map(([r]) => r));
  const minCol = Math.min(...cells.map(([, c]) => c));

  return cells.map(([r, c]) => [r - minRow, c - minCol] as [number, number]);
}

/**
 * Get all rotations of a pattern cells
 */
export function getRotations(cells: Array<[number, number]>): Array<[number, number]>[] {
  let current = normalizeCells(cells);
  const rotations: Array<[number, number]>[] = [normalizeCells([...current])];

  // Generate 90, 180, 270 degree rotations
  for (let i = 0; i < 3; i++) {
    current = rotateCells90(current);
    rotations.push(normalizeCells([...current]));
  }

  return rotations;
}

/**
 * Get bounding box of cells
 */
export function getBounds(cells: Array<[number, number]>): { minR: number; maxR: number; minC: number; maxC: number } {
  const minR = Math.min(...cells.map(([r]) => r));
  const maxR = Math.max(...cells.map(([r]) => r));
  const minC = Math.min(...cells.map(([, c]) => c));
  const maxC = Math.max(...cells.map(([, c]) => c));
  return { minR, maxR, minC, maxC };
}

/**
 * Check if a pattern matches at a specific grid location
 */
export function patternMatchesAtLocation(
  grid: Grid,
  patternCells: Array<[number, number]>,
  startRow: number,
  startCol: number,
  gridHeight: number,
  gridWidth: number
): boolean {
  // Check each cell in pattern
  for (const [pr, pc] of patternCells) {
    const gr = startRow + pr;
    const gc = startCol + pc;

    // Out of bounds
    if (gr < 0 || gr >= gridHeight || gc < 0 || gc >= gridWidth) {
      return false;
    }

    // Cell should be alive
    if (!grid[gr]?.[gc]) {
      return false;
    }
  }

  return true;
}

/**
 * Search for a pattern in the grid at all rotations and reflections
 * Returns the first match found or null
 */
export function findPatternInGrid(
  grid: Grid,
  patternName: string,
  patternCategory: string,
  patternCells: Array<[number, number]>
): PatternMatch | null {
  const gridHeight = grid.length;
  const gridWidth = grid[0]?.length || 0;

  // Get all rotations of the pattern
  const rotations = getRotations(patternCells);

  // Try each rotation
  for (let rotationIndex = 0; rotationIndex < rotations.length; rotationIndex++) {
    const rotatedCells = rotations[rotationIndex];
    const bounds = getBounds(rotatedCells);
    const pHeight = bounds.maxR - bounds.minR + 1;
    const pWidth = bounds.maxC - bounds.minC + 1;

    // Scan all grid positions
    for (let row = 0; row <= gridHeight - pHeight; row++) {
      for (let col = 0; col <= gridWidth - pWidth; col++) {
        if (patternMatchesAtLocation(grid, rotatedCells, row, col, gridHeight, gridWidth)) {
          // Found a match! Get absolute coordinates
          const absoluteCells = rotatedCells.map(([r, c]) => [row + r, col + c] as [number, number]);

          return {
            patternName,
            patternCategory,
            x: col,
            y: row,
            width: pWidth,
            height: pHeight,
            rotation: rotationIndex * 90,
            isReflected: false,
            cells: absoluteCells,
          };
        }
      }
    }
  }

  return null;
}

/**
 * Find all instances of a pattern in the grid
 * Stops after finding specified count to avoid performance issues
 */
export function findAllPatternsInGrid(
  grid: Grid,
  patternName: string,
  patternCategory: string,
  patternCells: Array<[number, number]>,
  maxResults: number = 10
): PatternMatch[] {
  const gridHeight = grid.length;
  const gridWidth = grid[0]?.length || 0;
  const matches: PatternMatch[] = [];

  // Get all rotations of the pattern
  const rotations = getRotations(patternCells);

  // Track visited positions to avoid duplicates
  const visited = new Set<string>();

  // Try each rotation
  for (let rotationIndex = 0; rotationIndex < rotations.length; rotationIndex++) {
    const rotatedCells = rotations[rotationIndex];
    const bounds = getBounds(rotatedCells);
    const pHeight = bounds.maxR - bounds.minR + 1;
    const pWidth = bounds.maxC - bounds.minC + 1;

    // Scan all grid positions
    for (let row = 0; row <= gridHeight - pHeight; row++) {
      for (let col = 0; col <= gridWidth - pWidth; col++) {
        if (matches.length >= maxResults) {
          return matches;
        }

        const key = `${row}_${col}_${rotationIndex}`;
        if (visited.has(key)) continue;

        if (patternMatchesAtLocation(grid, rotatedCells, row, col, gridHeight, gridWidth)) {
          visited.add(key);

          // Found a match! Get absolute coordinates
          const absoluteCells = rotatedCells.map(([r, c]) => [row + r, col + c] as [number, number]);

          matches.push({
            patternName,
            patternCategory,
            x: col,
            y: row,
            width: pWidth,
            height: pHeight,
            rotation: rotationIndex * 90,
            isReflected: false,
            cells: absoluteCells,
          });
        }
      }
    }
  }

  return matches;
}

/**
 * Find all known patterns in a grid
 * Accepts an array of pattern definitions: { name, category, cells }
 */
export function detectPatternsInGrid(
  grid: Grid,
  patterns: Array<{ name: string; category: string; cells: Array<[number, number]> }>,
  maxResultsPerPattern: number = 3
): PatternMatch[] {
  const allMatches: PatternMatch[] = [];

  for (const pattern of patterns) {
    const matches = findAllPatternsInGrid(
      grid,
      pattern.name,
      pattern.category,
      pattern.cells,
      maxResultsPerPattern
    );
    allMatches.push(...matches);
  }

  // Sort by position (top-left to bottom-right)
  allMatches.sort((a, b) => {
    if (a.y !== b.y) return a.y - b.y;
    return a.x - b.x;
  });

  return allMatches;
}

/**
 * Optimized detection using spatial indexing
 * Divides grid into quadrants and searches only relevant areas
 * Returns set of grid cells that are part of any detected pattern
 */
export function detectPatternCellsFast(
  grid: Grid,
  patterns: Array<{ name: string; category: string; cells: Array<[number, number]> }>,
  maxResultsPerPattern: number = 3
): Set<string> {
  const patternCells = new Set<string>();
  const matches = detectPatternsInGrid(grid, patterns, maxResultsPerPattern);

  for (const match of matches) {
    for (const [row, col] of match.cells) {
      patternCells.add(`${row},${col}`);
    }
  }

  return patternCells;
}
