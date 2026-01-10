import { describe, it, expect } from 'vitest';
import { PATTERNS } from './patterns';

describe('patterns', () => {
  describe('PATTERNS', () => {
    it('should contain at least one pattern', () => {
      // Arrange & Act
      const patternCount = PATTERNS.length;

      // Assert
      expect(patternCount).toBeGreaterThan(0);
    });

    it('should have valid pattern structure', () => {
      // Arrange
      const pattern = PATTERNS[0];

      // Act & Assert
      expect(pattern).toHaveProperty('name');
      expect(pattern).toHaveProperty('description');
      expect(pattern).toHaveProperty('cells');
    });

    it('should have non-empty name for each pattern', () => {
      // Arrange & Act
      const allHaveNames = PATTERNS.every((p) => p.name.length > 0);

      // Assert
      expect(allHaveNames).toBe(true);
    });

    it('should have non-empty description for each pattern', () => {
      // Arrange & Act
      const allHaveDescriptions = PATTERNS.every((p) => p.description.length > 0);

      // Assert
      expect(allHaveDescriptions).toBe(true);
    });

    it('should have cells array for each pattern', () => {
      // Arrange & Act
      const allHaveCells = PATTERNS.every((p) => Array.isArray(p.cells));

      // Assert
      expect(allHaveCells).toBe(true);
    });

    it('should have valid cell coordinates', () => {
      // Arrange
      const pattern = PATTERNS.find((p) => p.name === 'Glider');

      // Act & Assert
      expect(pattern).toBeDefined();
      expect(pattern!.cells.length).toBeGreaterThan(0);
      expect(pattern!.cells[0]).toHaveLength(2);
    });

    it('should contain Glider pattern', () => {
      // Arrange & Act
      const glider = PATTERNS.find((p) => p.name === 'Glider');

      // Assert
      expect(glider).toBeDefined();
      expect(glider!.cells).toHaveLength(5);
    });

    it('should contain Blinker pattern', () => {
      // Arrange & Act
      const blinker = PATTERNS.find((p) => p.name === 'Blinker');

      // Assert
      expect(blinker).toBeDefined();
      expect(blinker!.cells).toHaveLength(3);
    });

    it('should contain Block pattern', () => {
      // Arrange & Act
      const block = PATTERNS.find((p) => p.name === 'Block');

      // Assert
      expect(block).toBeDefined();
      expect(block!.cells).toHaveLength(4);
    });

    it('should have unique pattern names', () => {
      // Arrange
      const names = PATTERNS.map((p) => p.name);

      // Act
      const uniqueNames = new Set(names);

      // Assert
      expect(uniqueNames.size).toBe(names.length);
    });

    it('should have valid ruleset notation if specified', () => {
      // Arrange
      const patternsWithRuleset = PATTERNS.filter((p) => p.ruleset);

      // Act & Assert
      patternsWithRuleset.forEach((pattern) => {
        expect(pattern.ruleset).toMatch(/^B\d*\/S\d*$/);
      });
    });

    it('should contain HighLife Replicator pattern', () => {
      // Arrange & Act
      const replicator = PATTERNS.find((p) => p.name === 'Replicator');

      // Assert
      expect(replicator).toBeDefined();
      expect(replicator!.ruleset).toBe('B36/S23');
      expect(replicator!.cells.length).toBeGreaterThan(0);
    });

    it('should contain Day & Night Diamond pattern', () => {
      // Arrange & Act
      const diamond = PATTERNS.find((p) => p.name === 'Diamond');

      // Assert
      expect(diamond).toBeDefined();
      expect(diamond!.ruleset).toBe('B3678/S34678');
    });

    it('should contain Seeds Two Seeds pattern', () => {
      // Arrange & Act
      const twoSeeds = PATTERNS.find((p) => p.name === 'Two Seeds');

      // Assert
      expect(twoSeeds).toBeDefined();
      expect(twoSeeds!.ruleset).toBe('B2/S');
    });

    it('should contain Maze Seed pattern', () => {
      // Arrange & Act
      const mazeSeed = PATTERNS.find((p) => p.name === 'Maze Seed');

      // Assert
      expect(mazeSeed).toBeDefined();
      expect(mazeSeed!.ruleset).toBe('B3/S12345');
    });

    it('should have Game of Life patterns without ruleset or with B3/S23', () => {
      // Arrange
      const golPatterns = PATTERNS.filter((p) => !p.ruleset || p.ruleset === 'B3/S23');

      // Act & Assert
      expect(golPatterns.length).toBeGreaterThan(0);
      const glider = golPatterns.find((p) => p.name === 'Glider');
      expect(glider).toBeDefined();
    });
  });
});
