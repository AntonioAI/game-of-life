import { describe, it, expect } from 'vitest';
import { colorSchemes } from './colorSchemes';

describe('colorSchemes', () => {
  describe('colorSchemes array', () => {
    it('should contain at least one color scheme', () => {
      // Arrange & Act
      const schemeCount = colorSchemes.length;

      // Assert
      expect(schemeCount).toBeGreaterThan(0);
    });

    it('should have valid color scheme structure', () => {
      // Arrange
      const scheme = colorSchemes[0];

      // Act & Assert
      expect(scheme).toHaveProperty('name');
      expect(scheme).toHaveProperty('gridColor');
      expect(scheme).toHaveProperty('deadCellColor');
      expect(scheme).toHaveProperty('aliveCellColor');
    });

    it('should have non-empty name for each scheme', () => {
      // Arrange & Act
      const allHaveNames = colorSchemes.every((s) => s.name.length > 0);

      // Assert
      expect(allHaveNames).toBe(true);
    });

    it('should have valid hex colors for gridColor', () => {
      // Arrange
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

      // Act
      const allValid = colorSchemes.every((s) => hexColorRegex.test(s.gridColor));

      // Assert
      expect(allValid).toBe(true);
    });

    it('should have valid hex colors for deadCellColor', () => {
      // Arrange
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

      // Act
      const allValid = colorSchemes.every((s) => hexColorRegex.test(s.deadCellColor));

      // Assert
      expect(allValid).toBe(true);
    });

    it('should have valid hex colors for aliveCellColor', () => {
      // Arrange
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

      // Act
      const allValid = colorSchemes.every((s) => hexColorRegex.test(s.aliveCellColor));

      // Assert
      expect(allValid).toBe(true);
    });

    it('should contain Light Mode scheme', () => {
      // Arrange & Act
      const lightMode = colorSchemes.find((s) => s.name === 'Light Mode');

      // Assert
      expect(lightMode).toBeDefined();
    });

    it('should contain Dark Mode scheme', () => {
      // Arrange & Act
      const darkMode = colorSchemes.find((s) => s.name === 'Dark Mode');

      // Assert
      expect(darkMode).toBeDefined();
    });

    it('should have unique scheme names', () => {
      // Arrange
      const names = colorSchemes.map((s) => s.name);

      // Act
      const uniqueNames = new Set(names);

      // Assert
      expect(uniqueNames.size).toBe(names.length);
    });
  });
});
