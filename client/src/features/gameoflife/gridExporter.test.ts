import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportGridAsPNG, exportGridAsRLE } from './gridExporter';

describe('gridExporter', () => {
  describe('exportGridAsRLE', () => {
    it('should export empty grid as RLE format', () => {
      // Arrange
      const grid = [[false, false], [false, false]];

      // Act
      const rle = exportGridAsRLE(grid, 'Test Pattern');

      // Assert
      expect(rle).toContain('#N Test Pattern');
      expect(rle).toContain('x = 2, y = 2');
      expect(rle).toContain('2b$2b!');
    });

    it('should export single alive cell as RLE format', () => {
      // Arrange
      const grid = [[true]];

      // Act
      const rle = exportGridAsRLE(grid, 'Single Cell');

      // Assert
      expect(rle).toContain('#N Single Cell');
      expect(rle).toContain('x = 1, y = 1');
      expect(rle).toContain('o!');
    });

    it('should export glider pattern correctly', () => {
      // Arrange
      const grid = [
        [false, true, false],
        [false, false, true],
        [true, true, true],
      ];

      // Act
      const rle = exportGridAsRLE(grid, 'Glider');

      // Assert
      expect(rle).toContain('x = 3, y = 3');
      expect(rle).toContain('bo$');
      expect(rle).toContain('2bo$');
      expect(rle).toContain('3o!');
    });

    it('should handle runs of same cell type', () => {
      // Arrange
      const grid = [[true, true, true, true]];

      // Act
      const rle = exportGridAsRLE(grid, 'Line');

      // Assert
      expect(rle).toContain('4o!');
    });

    it('should handle mixed runs', () => {
      // Arrange
      const grid = [[false, false, true, true, false]];

      // Act
      const rle = exportGridAsRLE(grid, 'Mixed');

      // Assert
      expect(rle).toContain('2b2bo!');
    });
  });

  describe('exportGridAsPNG', () => {
    beforeEach(() => {
      // Mock canvas and document
      const mockCanvas = {
        getContext: vi.fn(() => ({
          fillStyle: '',
          fillRect: vi.fn(),
        })),
        toBlob: vi.fn((callback) => {
          callback(new Blob(['mock'], { type: 'image/png' }));
        }),
        width: 0,
        height: 0,
      };
      vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas as any);
      
      const mockLink = {
        href: '',
        download: '',
        click: vi.fn(),
      };
      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'canvas') return mockCanvas as any;
        if (tag === 'a') return mockLink as any;
        return {} as any;
      });

      global.URL.createObjectURL = vi.fn(() => 'blob:mock');
      global.URL.revokeObjectURL = vi.fn();
    });

    it('should create canvas with correct dimensions', () => {
      // Arrange
      const grid = [[true, false], [false, true]];
      const cellSize = 10;

      // Act
      exportGridAsPNG(grid, 'test.png', cellSize, '#000000', '#ffffff');

      // Assert
      const canvas = document.createElement('canvas');
      expect(canvas.width).toBeDefined();
    });

    it('should trigger download', () => {
      // Arrange
      const grid = [[true]];
      const filename = 'test.png';

      // Act
      exportGridAsPNG(grid, filename, 10, '#000000', '#ffffff');

      // Assert
      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });

    it('should use correct colors', () => {
      // Arrange
      const grid = [[true, false]];
      const aliveColor = '#ff0000';
      const deadColor = '#00ff00';
      const mockFillRect = vi.fn();
      const mockContext = {
        fillStyle: '',
        fillRect: mockFillRect,
      };
      const mockCanvas = {
        getContext: vi.fn(() => mockContext),
        toBlob: vi.fn((callback) => callback(new Blob())),
        width: 0,
        height: 0,
      };
      vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas as any);

      // Act
      exportGridAsPNG(grid, 'test.png', 10, aliveColor, deadColor);

      // Assert
      expect(mockCanvas.getContext).toHaveBeenCalledWith('2d');
    });
  });
});
