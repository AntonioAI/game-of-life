import { describe, it, expect } from 'vitest';
import { 
  parseRuleNotation, 
  formatRuleNotation, 
  applyRule, 
  RULESETS,
  getRulesetByNotation,
  validateRuleset,
  StandardRuleStrategy
} from './rulesets';

describe('rulesets', () => {
  describe('parseRuleNotation', () => {
    it('should parse standard Game of Life notation', () => {
      // Arrange
      const notation = 'B3/S23';

      // Act
      const result = parseRuleNotation(notation);

      // Assert
      expect(result).toEqual({ birth: [3], survival: [2, 3] });
    });

    it('should parse HighLife notation', () => {
      // Arrange
      const notation = 'B36/S23';

      // Act
      const result = parseRuleNotation(notation);

      // Assert
      expect(result).toEqual({ birth: [3, 6], survival: [2, 3] });
    });

    it('should parse notation with empty survival', () => {
      // Arrange
      const notation = 'B2/S';

      // Act
      const result = parseRuleNotation(notation);

      // Assert
      expect(result).toEqual({ birth: [2], survival: [] });
    });

    it('should parse notation with empty birth', () => {
      // Arrange
      const notation = 'B/S23';

      // Act
      const result = parseRuleNotation(notation);

      // Assert
      expect(result).toEqual({ birth: [], survival: [2, 3] });
    });

    it('should parse notation case-insensitively', () => {
      // Arrange
      const notation = 'b3/s23';

      // Act
      const result = parseRuleNotation(notation);

      // Assert
      expect(result).toEqual({ birth: [3], survival: [2, 3] });
    });

    it('should return null for invalid notation', () => {
      // Arrange
      const notation = 'invalid';

      // Act
      const result = parseRuleNotation(notation);

      // Assert
      expect(result).toBeNull();
    });

    it('should parse complex notation with multiple digits', () => {
      // Arrange
      const notation = 'B3678/S34678';

      // Act
      const result = parseRuleNotation(notation);

      // Assert
      expect(result).toEqual({ birth: [3, 6, 7, 8], survival: [3, 4, 6, 7, 8] });
    });
  });

  describe('formatRuleNotation', () => {
    it('should format standard Game of Life rules', () => {
      // Arrange
      const birth = [3];
      const survival = [2, 3];

      // Act
      const result = formatRuleNotation(birth, survival);

      // Assert
      expect(result).toBe('B3/S23');
    });

    it('should sort birth and survival values', () => {
      // Arrange
      const birth = [6, 3];
      const survival = [3, 2];

      // Act
      const result = formatRuleNotation(birth, survival);

      // Assert
      expect(result).toBe('B36/S23');
    });

    it('should handle empty arrays', () => {
      // Arrange
      const birth: number[] = [];
      const survival: number[] = [];

      // Act
      const result = formatRuleNotation(birth, survival);

      // Assert
      expect(result).toBe('B/S');
    });

    it('should format Seeds ruleset correctly', () => {
      // Arrange
      const birth = [2];
      const survival: number[] = [];

      // Act
      const result = formatRuleNotation(birth, survival);

      // Assert
      expect(result).toBe('B2/S');
    });
  });

  describe('applyRule', () => {
    it('should apply Game of Life rules for alive cell with 2 neighbors', () => {
      // Arrange
      const isAlive = true;
      const liveNeighbors = 2;
      const ruleset = RULESETS[0]; // Game of Life

      // Act
      const result = applyRule(isAlive, liveNeighbors, ruleset);

      // Assert
      expect(result).toBe(true);
    });

    it('should apply Game of Life rules for alive cell with 3 neighbors', () => {
      // Arrange
      const isAlive = true;
      const liveNeighbors = 3;
      const ruleset = RULESETS[0]; // Game of Life

      // Act
      const result = applyRule(isAlive, liveNeighbors, ruleset);

      // Assert
      expect(result).toBe(true);
    });

    it('should apply Game of Life rules for alive cell with 1 neighbor (dies)', () => {
      // Arrange
      const isAlive = true;
      const liveNeighbors = 1;
      const ruleset = RULESETS[0]; // Game of Life

      // Act
      const result = applyRule(isAlive, liveNeighbors, ruleset);

      // Assert
      expect(result).toBe(false);
    });

    it('should apply Game of Life rules for dead cell with 3 neighbors (birth)', () => {
      // Arrange
      const isAlive = false;
      const liveNeighbors = 3;
      const ruleset = RULESETS[0]; // Game of Life

      // Act
      const result = applyRule(isAlive, liveNeighbors, ruleset);

      // Assert
      expect(result).toBe(true);
    });

    it('should apply Game of Life rules for dead cell with 2 neighbors (stays dead)', () => {
      // Arrange
      const isAlive = false;
      const liveNeighbors = 2;
      const ruleset = RULESETS[0]; // Game of Life

      // Act
      const result = applyRule(isAlive, liveNeighbors, ruleset);

      // Assert
      expect(result).toBe(false);
    });

    it('should apply HighLife rules for dead cell with 6 neighbors (birth)', () => {
      // Arrange
      const isAlive = false;
      const liveNeighbors = 6;
      const ruleset = RULESETS[1]; // HighLife

      // Act
      const result = applyRule(isAlive, liveNeighbors, ruleset);

      // Assert
      expect(result).toBe(true);
    });

    it('should apply Seeds rules for alive cell (always dies)', () => {
      // Arrange
      const isAlive = true;
      const liveNeighbors = 2;
      const ruleset = RULESETS[3]; // Seeds

      // Act
      const result = applyRule(isAlive, liveNeighbors, ruleset);

      // Assert
      expect(result).toBe(false);
    });

    it('should apply Seeds rules for dead cell with 2 neighbors (birth)', () => {
      // Arrange
      const isAlive = false;
      const liveNeighbors = 2;
      const ruleset = RULESETS[3]; // Seeds

      // Act
      const result = applyRule(isAlive, liveNeighbors, ruleset);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe('RULESETS', () => {
    it('should have Game of Life as first ruleset', () => {
      // Arrange & Act
      const firstRuleset = RULESETS[0];

      // Assert
      expect(firstRuleset.name).toBe('Game of Life');
      expect(firstRuleset.notation).toBe('B3/S23');
    });

    it('should have at least 5 different rulesets', () => {
      // Arrange & Act & Assert
      expect(RULESETS.length).toBeGreaterThanOrEqual(5);
    });

    it('should have unique names for all rulesets', () => {
      // Arrange
      const names = RULESETS.map(r => r.name);

      // Act
      const uniqueNames = new Set(names);

      // Assert
      expect(uniqueNames.size).toBe(names.length);
    });

    it('should have valid birth and survival arrays for all rulesets', () => {
      // Arrange & Act & Assert
      RULESETS.forEach(ruleset => {
        expect(Array.isArray(ruleset.birth)).toBe(true);
        expect(Array.isArray(ruleset.survival)).toBe(true);
        ruleset.birth.forEach(n => {
          expect(n).toBeGreaterThanOrEqual(0);
          expect(n).toBeLessThanOrEqual(8);
        });
        ruleset.survival.forEach(n => {
          expect(n).toBeGreaterThanOrEqual(0);
          expect(n).toBeLessThanOrEqual(8);
        });
      });
    });

    it('should have unique notation strings for all rulesets', () => {
      // Arrange
      const notations = RULESETS.map(r => r.notation);

      // Act
      const uniqueNotations = new Set(notations);

      // Assert
      expect(uniqueNotations.size).toBe(notations.length);
    });
  });

  describe('getRulesetByNotation', () => {
    it('should find Game of Life by notation', () => {
      // Arrange
      const notation = 'B3/S23';

      // Act
      const result = getRulesetByNotation(notation);

      // Assert
      expect(result).toBeDefined();
      expect(result?.name).toBe('Game of Life');
    });

    it('should find HighLife by notation', () => {
      // Arrange
      const notation = 'B36/S23';

      // Act
      const result = getRulesetByNotation(notation);

      // Assert
      expect(result).toBeDefined();
      expect(result?.name).toBe('HighLife');
    });

    it('should return undefined for invalid notation', () => {
      // Arrange
      const notation = 'B99/S99';

      // Act
      const result = getRulesetByNotation(notation);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe('validateRuleset', () => {
    it('should validate Game of Life ruleset', () => {
      // Arrange
      const ruleset = RULESETS[0];

      // Act
      const result = validateRuleset(ruleset);

      // Assert
      expect(result).toBe(true);
    });

    it('should validate all predefined rulesets', () => {
      // Arrange & Act & Assert
      RULESETS.forEach(ruleset => {
        expect(validateRuleset(ruleset)).toBe(true);
      });
    });

    it('should reject ruleset with invalid birth value', () => {
      // Arrange
      const invalidRuleset = {
        name: 'Invalid',
        description: 'Test',
        birth: [9], // Invalid: > 8
        survival: [2, 3],
        notation: 'B9/S23',
      };

      // Act
      const result = validateRuleset(invalidRuleset);

      // Assert
      expect(result).toBe(false);
    });

    it('should reject ruleset with mismatched notation', () => {
      // Arrange
      const invalidRuleset = {
        name: 'Invalid',
        description: 'Test',
        birth: [3],
        survival: [2, 3],
        notation: 'B36/S23', // Doesn't match birth array
      };

      // Act
      const result = validateRuleset(invalidRuleset);

      // Assert
      expect(result).toBe(false);
    });

    it('should reject ruleset with non-integer values', () => {
      // Arrange
      const invalidRuleset = {
        name: 'Invalid',
        description: 'Test',
        birth: [3.5], // Invalid: not integer
        survival: [2, 3],
        notation: 'B3/S23',
      };

      // Act
      const result = validateRuleset(invalidRuleset);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('StandardRuleStrategy', () => {
    it('should apply Game of Life rules correctly', () => {
      // Arrange
      const ruleset = RULESETS[0];
      const strategy = new StandardRuleStrategy(ruleset);

      // Act & Assert
      expect(strategy.apply(true, 2)).toBe(true); // Alive with 2 neighbors survives
      expect(strategy.apply(true, 3)).toBe(true); // Alive with 3 neighbors survives
      expect(strategy.apply(true, 1)).toBe(false); // Alive with 1 neighbor dies
      expect(strategy.apply(false, 3)).toBe(true); // Dead with 3 neighbors is born
      expect(strategy.apply(false, 2)).toBe(false); // Dead with 2 neighbors stays dead
    });

    it('should apply HighLife rules correctly', () => {
      // Arrange
      const ruleset = RULESETS[1]; // HighLife
      const strategy = new StandardRuleStrategy(ruleset);

      // Act & Assert
      expect(strategy.apply(false, 6)).toBe(true); // Dead with 6 neighbors is born (unique to HighLife)
      expect(strategy.apply(false, 3)).toBe(true); // Dead with 3 neighbors is born
    });

    it('should apply Seeds rules correctly', () => {
      // Arrange
      const ruleset = RULESETS.find(r => r.name === 'Seeds')!;
      const strategy = new StandardRuleStrategy(ruleset);

      // Act & Assert
      expect(strategy.apply(true, 2)).toBe(false); // All alive cells die
      expect(strategy.apply(false, 2)).toBe(true); // Dead with 2 neighbors is born
    });
  });
});
