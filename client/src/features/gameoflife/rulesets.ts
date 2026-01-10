/**
 * Represents a cellular automaton ruleset.
 * Each ruleset defines birth and survival conditions for cells.
 */
export interface Ruleset {
  name: string;
  description: string;
  birth: number[];
  survival: number[];
  notation: string;
}

/**
 * Interface for rule application strategy.
 * Follows Strategy Pattern for flexible rule application.
 */
export interface RuleStrategy {
  /**
   * Determines if a cell should be alive in the next generation.
   * @param isAlive - Current state of the cell
   * @param liveNeighbors - Number of live neighboring cells
   * @returns true if cell should be alive, false otherwise
   */
  apply(isAlive: boolean, liveNeighbors: number): boolean;
}

/**
 * Standard rule strategy implementation.
 * Applies birth and survival rules based on neighbor count.
 */
export class StandardRuleStrategy implements RuleStrategy {
  constructor(private ruleset: Ruleset) {}

  apply(isAlive: boolean, liveNeighbors: number): boolean {
    if (isAlive) {
      return this.ruleset.survival.includes(liveNeighbors);
    } else {
      return this.ruleset.birth.includes(liveNeighbors);
    }
  }
}

/**
 * Available cellular automaton rulesets.
 * Game of Life (B3/S23) is the default at index 0.
 */
export const RULESETS: Ruleset[] = [
  {
    name: 'Game of Life',
    description: 'Conway\'s classic Game of Life - the original and most famous cellular automaton',
    birth: [3],
    survival: [2, 3],
    notation: 'B3/S23',
  },
  {
    name: 'HighLife',
    description: 'Similar to Life but with an additional birth condition, creating replicators',
    birth: [3, 6],
    survival: [2, 3],
    notation: 'B36/S23',
  },
  {
    name: 'Day & Night',
    description: 'Symmetric rule where birth and survival conditions are complementary',
    birth: [3, 6, 7, 8],
    survival: [3, 4, 6, 7, 8],
    notation: 'B3678/S34678',
  },
  {
    name: 'Seeds',
    description: 'All cells die in every generation, creating explosive patterns',
    birth: [2],
    survival: [],
    notation: 'B2/S',
  },
  {
    name: 'Maze',
    description: 'Creates intricate maze-like patterns that stabilize quickly',
    birth: [3],
    survival: [1, 2, 3, 4, 5],
    notation: 'B3/S12345',
  },
  {
    name: 'Coral',
    description: 'Grows slowly like coral formations',
    birth: [3],
    survival: [4, 5, 6, 7, 8],
    notation: 'B3/S45678',
  },
  {
    name: 'Replicator',
    description: 'Creates self-replicating patterns',
    birth: [1, 3, 5, 7],
    survival: [1, 3, 5, 7],
    notation: 'B1357/S1357',
  },
  {
    name: 'Life Without Death',
    description: 'Cells are born but never die, creating expanding patterns',
    birth: [3],
    survival: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    notation: 'B3/S012345678',
  },
  {
    name: 'Move',
    description: 'Creates mobile patterns that move across the grid',
    birth: [3, 6, 8],
    survival: [2, 4, 5],
    notation: 'B368/S245',
  },
  {
    name: 'Diamoeba',
    description: 'Creates diamond-shaped amoeba-like patterns',
    birth: [3, 5, 6, 7, 8],
    survival: [5, 6, 7, 8],
    notation: 'B35678/S5678',
  },
];

/**
 * Parses B/S notation string into birth and survival arrays.
 * @param notation - Rule notation string (e.g., "B3/S23")
 * @returns Object with birth and survival arrays, or null if invalid
 */
export function parseRuleNotation(notation: string): { birth: number[]; survival: number[] } | null {
  const match = notation.match(/B(\d*)\/?S(\d*)/i);
  if (!match) return null;

  const birth = match[1] ? match[1].split('').map(Number) : [];
  const survival = match[2] ? match[2].split('').map(Number) : [];

  return { birth, survival };
}

/**
 * Formats birth and survival arrays into B/S notation.
 * @param birth - Array of neighbor counts for birth
 * @param survival - Array of neighbor counts for survival
 * @returns Formatted rule notation string
 */
export function formatRuleNotation(birth: number[], survival: number[]): string {
  const birthStr = birth.sort((a, b) => a - b).join('');
  const survivalStr = survival.sort((a, b) => a - b).join('');
  return `B${birthStr}/S${survivalStr}`;
}

/**
 * Applies a ruleset to determine if a cell should be alive.
 * @param isAlive - Current state of the cell
 * @param liveNeighbors - Number of live neighboring cells
 * @param ruleset - The ruleset to apply
 * @returns true if cell should be alive, false otherwise
 */
export function applyRule(
  isAlive: boolean,
  liveNeighbors: number,
  ruleset: Ruleset
): boolean {
  const strategy = new StandardRuleStrategy(ruleset);
  return strategy.apply(isAlive, liveNeighbors);
}

/**
 * Finds a ruleset by its notation.
 * @param notation - Rule notation string (e.g., "B3/S23")
 * @returns The matching ruleset, or undefined if not found
 */
export function getRulesetByNotation(notation: string): Ruleset | undefined {
  return RULESETS.find(r => r.notation === notation);
}

/**
 * Validates that a ruleset has valid birth and survival values.
 * @param ruleset - The ruleset to validate
 * @returns true if ruleset is valid, false otherwise
 */
export function validateRuleset(ruleset: Ruleset): boolean {
  const isValidArray = (arr: number[]) => 
    Array.isArray(arr) && 
    arr.every(n => Number.isInteger(n) && n >= 0 && n <= 8);
  
  return isValidArray(ruleset.birth) && 
         isValidArray(ruleset.survival) &&
         typeof ruleset.name === 'string' &&
         typeof ruleset.notation === 'string' &&
         ruleset.notation === formatRuleNotation(ruleset.birth, ruleset.survival);
}
