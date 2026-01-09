import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useGameOfLife from './useGameOfLife';

describe('useGameOfLife', () => {
  describe('initial state', () => {
    it('should initialize with default grid size', () => {
      // Arrange & Act
      const { result } = renderHook(() => useGameOfLife());

      // Assert
      expect(result.current.gridWidth).toBe(40);
      expect(result.current.gridHeight).toBe(40);
    });

    it('should initialize with simulation paused', () => {
      // Arrange & Act
      const { result } = renderHook(() => useGameOfLife());

      // Assert
      expect(result.current.isRunning).toBe(false);
    });

    it('should initialize at generation 0', () => {
      // Arrange & Act
      const { result } = renderHook(() => useGameOfLife());

      // Assert
      expect(result.current.generation).toBe(0);
    });

    it('should initialize with default speed', () => {
      // Arrange & Act
      const { result } = renderHook(() => useGameOfLife());

      // Assert
      expect(result.current.speed).toBe(100);
    });

    it('should initialize with toroidal boundary type', () => {
      // Arrange & Act
      const { result } = renderHook(() => useGameOfLife());

      // Assert
      expect(result.current.boundaryType).toBe('toroidal');
    });
  });

  describe('toggleCell', () => {
    it('should toggle a cell from dead to alive', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      const row = 5;
      const col = 5;

      // Act
      act(() => {
        result.current.reset();
      });
      const beforeState = result.current.grid[row][col];
      act(() => {
        result.current.toggleCell(row, col);
      });

      // Assert
      expect(beforeState).toBe(false);
      expect(result.current.grid[row][col]).toBe(true);
    });

    it('should toggle a cell from alive to dead', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      const row = 5;
      const col = 5;

      // Act
      act(() => {
        result.current.reset();
        result.current.toggleCell(row, col);
      });
      const beforeState = result.current.grid[row][col];
      act(() => {
        result.current.toggleCell(row, col);
      });

      // Assert
      expect(beforeState).toBe(true);
      expect(result.current.grid[row][col]).toBe(false);
    });
  });

  describe('toggleSimulation', () => {
    it('should start simulation when paused', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());

      // Act
      act(() => {
        result.current.toggleSimulation();
      });

      // Assert
      expect(result.current.isRunning).toBe(true);
    });

    it('should pause simulation when running', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());

      // Act
      act(() => {
        result.current.toggleSimulation();
      });
      act(() => {
        result.current.toggleSimulation();
      });

      // Assert
      expect(result.current.isRunning).toBe(false);
    });
  });

  describe('setSpeed', () => {
    it('should update speed value', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      const newSpeed = 50;

      // Act
      act(() => {
        result.current.setSpeed(newSpeed);
      });

      // Assert
      expect(result.current.speed).toBe(newSpeed);
    });
  });

  describe('reset', () => {
    it('should clear all cells', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      act(() => {
        result.current.toggleCell(5, 5);
        result.current.toggleCell(6, 6);
      });

      // Act
      act(() => {
        result.current.reset();
      });

      // Assert
      const hasLiveCells = result.current.grid.some((row) => row.some((cell) => cell));
      expect(hasLiveCells).toBe(false);
    });

    it('should reset generation to 0', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      act(() => {
        result.current.step();
      });

      // Act
      act(() => {
        result.current.reset();
      });

      // Assert
      expect(result.current.generation).toBe(0);
    });

    it('should stop simulation', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      act(() => {
        result.current.toggleSimulation();
      });

      // Act
      act(() => {
        result.current.reset();
      });

      // Assert
      expect(result.current.isRunning).toBe(false);
    });
  });

  describe('randomize', () => {
    it('should populate grid with random cells', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());

      // Act
      act(() => {
        result.current.randomize();
      });

      // Assert
      const hasLiveCells = result.current.grid.some((row) => row.some((cell) => cell));
      expect(hasLiveCells).toBe(true);
    });

    it('should reset generation to 0', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      act(() => {
        result.current.step();
      });

      // Act
      act(() => {
        result.current.randomize();
      });

      // Assert
      expect(result.current.generation).toBe(0);
    });
  });

  describe('step', () => {
    it('should increment generation by 1', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      const initialGeneration = result.current.generation;

      // Act
      act(() => {
        result.current.step();
      });

      // Assert
      expect(result.current.generation).toBe(initialGeneration + 1);
    });
  });

  describe('toggleBoundaryType', () => {
    it('should switch from toroidal to finite', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());

      // Act
      act(() => {
        result.current.toggleBoundaryType();
      });

      // Assert
      expect(result.current.boundaryType).toBe('finite');
    });

    it('should switch from finite to toroidal', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());

      // Act
      act(() => {
        result.current.toggleBoundaryType();
        result.current.toggleBoundaryType();
      });

      // Assert
      expect(result.current.boundaryType).toBe('toroidal');
    });
  });

  describe('setGridSize', () => {
    it('should update grid width', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      const newWidth = 20;

      // Act
      act(() => {
        result.current.setGridSize(newWidth, 20);
      });

      // Assert
      expect(result.current.gridWidth).toBe(newWidth);
    });

    it('should update grid height', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      const newHeight = 30;

      // Act
      act(() => {
        result.current.setGridSize(20, newHeight);
      });

      // Assert
      expect(result.current.gridHeight).toBe(newHeight);
    });

    it('should reset generation', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      act(() => {
        result.current.step();
      });

      // Act
      act(() => {
        result.current.setGridSize(20, 20);
      });

      // Assert
      expect(result.current.generation).toBe(0);
    });
  });

  describe('color customization', () => {
    it('should update grid color', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      const newColor = '#ff0000';

      // Act
      act(() => {
        result.current.setGridColor(newColor);
      });

      // Assert
      expect(result.current.gridColor).toBe(newColor);
    });

    it('should update dead cell color', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      const newColor = '#00ff00';

      // Act
      act(() => {
        result.current.setDeadCellColor(newColor);
      });

      // Assert
      expect(result.current.deadCellColor).toBe(newColor);
    });

    it('should update alive cell color', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      const newColor = '#0000ff';

      // Act
      act(() => {
        result.current.setAliveCellColor(newColor);
      });

      // Assert
      expect(result.current.aliveCellColor).toBe(newColor);
    });

    it('should update grid thickness', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      const newThickness = 2;

      // Act
      act(() => {
        result.current.setGridThickness(newThickness);
      });

      // Assert
      expect(result.current.gridThickness).toBe(newThickness);
    });
  });

  describe('statistics', () => {
    it('should count live cells correctly', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());

      // Act
      act(() => {
        result.current.reset();
        result.current.toggleCell(0, 0);
        result.current.toggleCell(1, 1);
      });

      // Assert
      expect(result.current.liveCells).toBe(2);
    });

    it('should calculate population density', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());

      // Act
      act(() => {
        result.current.reset();
      });

      // Assert
      expect(result.current.populationDensity).toBeGreaterThanOrEqual(0);
      expect(result.current.populationDensity).toBeLessThanOrEqual(100);
    });
  });

  describe('grid overlay settings', () => {
    it('should toggle grid overlay visibility', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());

      // Act
      act(() => {
        result.current.setShowGridOverlay(false);
      });

      // Assert
      expect(result.current.showGridOverlay).toBe(false);
    });

    it('should update grid line opacity', () => {
      // Arrange
      const { result } = renderHook(() => useGameOfLife());
      const newOpacity = 0.8;

      // Act
      act(() => {
        result.current.setGridLineOpacity(newOpacity);
      });

      // Assert
      expect(result.current.gridLineOpacity).toBe(newOpacity);
    });
  });
});
