import { describe, it, expect } from 'vitest';
import { gridPresets } from './gridPresets';

describe('gridPresets', () => {
  describe('gridPresets array', () => {
    it('should contain at least one preset', () => {
      // Arrange & Act
      const presetCount = gridPresets.length;

      // Assert
      expect(presetCount).toBeGreaterThan(0);
    });

    it('should have valid preset structure', () => {
      // Arrange
      const preset = gridPresets[0];

      // Act & Assert
      expect(preset).toHaveProperty('name');
      expect(preset).toHaveProperty('width');
      expect(preset).toHaveProperty('height');
    });

    it('should have positive width values', () => {
      // Arrange & Act
      const allPositive = gridPresets.every((p) => p.width > 0);

      // Assert
      expect(allPositive).toBe(true);
    });

    it('should have positive height values', () => {
      // Arrange & Act
      const allPositive = gridPresets.every((p) => p.height > 0);

      // Assert
      expect(allPositive).toBe(true);
    });

    it('should have non-empty names', () => {
      // Arrange & Act
      const allHaveNames = gridPresets.every((p) => p.name.length > 0);

      // Assert
      expect(allHaveNames).toBe(true);
    });

    it('should have reasonable grid sizes', () => {
      // Arrange
      const maxReasonableSize = 100;

      // Act
      const allReasonable = gridPresets.every(
        (p) => p.width <= maxReasonableSize && p.height <= maxReasonableSize
      );

      // Assert
      expect(allReasonable).toBe(true);
    });

    it('should have unique preset names', () => {
      // Arrange
      const names = gridPresets.map((p) => p.name);

      // Act
      const uniqueNames = new Set(names);

      // Assert
      expect(uniqueNames.size).toBe(names.length);
    });
  });
});
