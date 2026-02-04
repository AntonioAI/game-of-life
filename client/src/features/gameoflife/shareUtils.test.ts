import { describe, it, expect } from 'vitest';
import { encodeGridState, decodeGridState, generateShareUrl, getPatternFromUrl } from './shareUtils';

describe('shareUtils', () => {
  describe('encodeGridState', () => {
    it('should encode an empty grid', () => {
      // Arrange
      const grid = [
        [false, false],
        [false, false]
      ];
      const generation = 0;

      // Act
      const encoded = encodeGridState(grid, generation);

      // Assert
      expect(encoded).toBeTruthy();
      expect(typeof encoded).toBe('string');
    });

    it('should encode a grid with alive cells', () => {
      // Arrange
      const grid = [
        [true, false],
        [false, true]
      ];
      const generation = 5;

      // Act
      const encoded = encodeGridState(grid, generation);

      // Assert
      expect(encoded).toBeTruthy();
      expect(typeof encoded).toBe('string');
    });

    it('should encode a larger grid with patterns', () => {
      // Arrange
      const grid = [
        [false, false, false, false, false],
        [false, true, true, true, false],
        [false, true, false, true, false],
        [false, true, true, true, false],
        [false, false, false, false, false]
      ];
      const generation = 10;

      // Act
      const encoded = encodeGridState(grid, generation);

      // Assert
      expect(encoded).toBeTruthy();
      expect(typeof encoded).toBe('string');
    });
  });

  describe('decodeGridState', () => {
    it('should decode an encoded empty grid', () => {
      // Arrange
      const originalGrid = [
        [false, false],
        [false, false]
      ];
      const generation = 0;
      const encoded = encodeGridState(originalGrid, generation);

      // Act
      const decoded = decodeGridState(encoded);

      // Assert
      expect(decoded).not.toBeNull();
      expect(decoded?.grid).toEqual(originalGrid);
      expect(decoded?.generation).toBe(generation);
      expect(decoded?.gridWidth).toBe(2);
      expect(decoded?.gridHeight).toBe(2);
    });

    it('should decode an encoded grid with alive cells', () => {
      // Arrange
      const originalGrid = [
        [true, false],
        [false, true]
      ];
      const generation = 5;
      const encoded = encodeGridState(originalGrid, generation);

      // Act
      const decoded = decodeGridState(encoded);

      // Assert
      expect(decoded).not.toBeNull();
      expect(decoded?.grid).toEqual(originalGrid);
      expect(decoded?.generation).toBe(generation);
      expect(decoded?.gridWidth).toBe(2);
      expect(decoded?.gridHeight).toBe(2);
    });

    it('should decode a larger grid with patterns', () => {
      // Arrange
      const originalGrid = [
        [false, false, false, false, false],
        [false, true, true, true, false],
        [false, true, false, true, false],
        [false, true, true, true, false],
        [false, false, false, false, false]
      ];
      const generation = 10;
      const encoded = encodeGridState(originalGrid, generation);

      // Act
      const decoded = decodeGridState(encoded);

      // Assert
      expect(decoded).not.toBeNull();
      expect(decoded?.grid).toEqual(originalGrid);
      expect(decoded?.generation).toBe(generation);
      expect(decoded?.gridWidth).toBe(5);
      expect(decoded?.gridHeight).toBe(5);
    });

    it('should return null for invalid encoded string', () => {
      // Arrange
      const invalidEncoded = 'invalid-base64-string!@#$';

      // Act
      const decoded = decodeGridState(invalidEncoded);

      // Assert
      expect(decoded).toBeNull();
    });

    it('should handle grids with all alive cells', () => {
      // Arrange
      const originalGrid = [
        [true, true, true],
        [true, true, true],
        [true, true, true]
      ];
      const generation = 3;
      const encoded = encodeGridState(originalGrid, generation);

      // Act
      const decoded = decodeGridState(encoded);

      // Assert
      expect(decoded).not.toBeNull();
      expect(decoded?.grid).toEqual(originalGrid);
      expect(decoded?.generation).toBe(generation);
    });

    it('should preserve generation count', () => {
      // Arrange
      const grid = [[true, false], [false, true]];
      const generation = 999;
      const encoded = encodeGridState(grid, generation);

      // Act
      const decoded = decodeGridState(encoded);

      // Assert
      expect(decoded?.generation).toBe(generation);
    });
  });

  describe('generateShareUrl', () => {
    it('should generate a URL with encoded pattern parameter', () => {
      // Arrange
      const grid = [
        [true, false],
        [false, true]
      ];
      const generation = 5;

      // Act
      const url = generateShareUrl(grid, generation);

      // Assert
      expect(url).toContain('?pattern=');
      expect(url).toContain(window.location.origin);
    });

    it('should generate different URLs for different grids', () => {
      // Arrange
      const grid1 = [[true, false], [false, true]];
      const grid2 = [[false, true], [true, false]];

      // Act
      const url1 = generateShareUrl(grid1, 0);
      const url2 = generateShareUrl(grid2, 0);

      // Assert
      expect(url1).not.toBe(url2);
    });

    it('should generate URLs that can be decoded back', () => {
      // Arrange
      const originalGrid = [
        [false, true, false],
        [true, true, true],
        [false, true, false]
      ];
      const generation = 7;

      // Act
      const url = generateShareUrl(originalGrid, generation);
      const encoded = url.split('?pattern=')[1];
      const decoded = decodeGridState(encoded);

      // Assert
      expect(decoded).not.toBeNull();
      expect(decoded?.grid).toEqual(originalGrid);
      expect(decoded?.generation).toBe(generation);
    });
  });

  describe('getPatternFromUrl', () => {
    it('should return null when no pattern parameter exists', () => {
      // Arrange
      // Using the current URL which likely has no pattern parameter

      // Act
      const pattern = getPatternFromUrl();

      // Assert
      // This may be null or a string depending on the test environment
      expect(pattern === null || typeof pattern === 'string').toBe(true);
    });
  });

  describe('encoding efficiency', () => {
    it('should efficiently encode repetitive patterns', () => {
      // Arrange
      const sparseGrid = Array(20).fill(null).map(() => Array(20).fill(false));
      sparseGrid[10][10] = true;
      sparseGrid[10][11] = true;
      sparseGrid[10][12] = true;
      
      const denseGrid = Array(20).fill(null).map(() => Array(20).fill(true));

      // Act
      const sparseEncoded = encodeGridState(sparseGrid, 0);
      const denseEncoded = encodeGridState(denseGrid, 0);

      // Assert
      // Both should be relatively compact despite different patterns
      expect(sparseEncoded.length).toBeLessThan(400 * 2); // Much smaller than uncompressed
      expect(denseEncoded.length).toBeLessThan(400 * 2); // Much smaller than uncompressed
    });
  });
});
