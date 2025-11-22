import { useState, useCallback, useEffect, useRef } from 'react';
import type { Pattern } from './patterns';

type Grid = boolean[][];

export interface GameOfLifeState {
  grid: Grid;
  isRunning: boolean;
  speed: number;
  generation: number;
  gridWidth: number;
  gridHeight: number;
  liveCells: number;
  growthRate: number | null;
  populationDensity: number;
  boundaryType: 'toroidal' | 'finite';
  gridColor: string;
  deadCellColor: string;
  aliveCellColor: string;
  gridThickness: number;
  toggleCell: (row: number, col: number) => void;
  toggleSimulation: () => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
  randomize: () => void;
  loadPattern: (pattern: Pattern, startRow: number, startCol: number) => void;
  setGridSize: (width: number, height: number) => void;
  step: () => void;
  toggleBoundaryType: () => void;
  setGridColor: (color: string) => void;
  setDeadCellColor: (color: string) => void;
  setAliveCellColor: (color: string) => void;
  setGridThickness: (thickness: number) => void;
}

function createEmptyGrid(width: number, height: number): Grid {
  return Array(height)
    .fill(null)
    .map(() => Array(width).fill(false));
}

function countLiveNeighbors(
  grid: Grid,
  row: number,
  col: number,
  width: number,
  height: number,
  boundaryType: 'toroidal' | 'finite'
): number {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newRow = row + i;
      const newCol = col + j;

      // Check boundaries
      if (boundaryType === 'finite') {
        if (newRow < 0 || newRow >= height || newCol < 0 || newCol >= width) {
          continue;
        }
        if (grid[newRow] && grid[newRow][newCol]) count++;
      } else {
        // Toroidal wrapping
        const wrappedRow = ((newRow % height) + height) % height;
        const wrappedCol = ((newCol % width) + width) % width;
        if (grid[wrappedRow] && grid[wrappedRow][wrappedCol]) count++;
      }
    }
  }
  return count;
}

function nextGeneration(
  grid: Grid,
  width: number,
  height: number,
  boundaryType: 'toroidal' | 'finite'
): Grid {
  const newGrid = createEmptyGrid(width, height);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const liveNeighbors = countLiveNeighbors(grid, row, col, width, height, boundaryType);
      const isAlive = grid[row][col];

      if (isAlive && (liveNeighbors === 2 || liveNeighbors === 3)) {
        newGrid[row][col] = true;
      } else if (!isAlive && liveNeighbors === 3) {
        newGrid[row][col] = true;
      }
    }
  }

  return newGrid;
}

function countLiveCells(grid: Grid): number {
  return grid.reduce((sum, row) => sum + row.filter((cell) => cell).length, 0);
}

function useGameOfLife(): GameOfLifeState {
  const [gridWidth, setGridWidth] = useState(40);
  const [gridHeight, setGridHeight] = useState(40);
  const [grid, setGrid] = useState<Grid>(createEmptyGrid(40, 40));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [generation, setGeneration] = useState(0);
  const [previousLiveCells, setPreviousLiveCells] = useState(0);
  const [boundaryType, setBoundaryType] = useState<'toroidal' | 'finite'>('toroidal');
  const [gridColor, setGridColor] = useState('#93c5fd');
  const [deadCellColor, setDeadCellColor] = useState('#f3f4f6');
  const [aliveCellColor, setAliveCellColor] = useState('#06b6d4');
  const [gridThickness, setGridThickness] = useState(1);
  const simulationRef = useRef<NodeJS.Timeout | null>(null);

  const setGridSize = useCallback((width: number, height: number) => {
    setGridWidth(width);
    setGridHeight(height);
    setGrid(createEmptyGrid(width, height));
    setGeneration(0);
    setIsRunning(false);
  }, []);

  const toggleCell = useCallback((row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      newGrid[row][col] = !newGrid[row][col];
      return newGrid;
    });
  }, []);

  const toggleSimulation = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const toggleBoundaryType = useCallback(() => {
    setBoundaryType((prev) => (prev === 'toroidal' ? 'finite' : 'toroidal'));
  }, []);

  const reset = useCallback(() => {
    setGrid(createEmptyGrid(gridWidth, gridHeight));
    setGeneration(0);
    setIsRunning(false);
  }, [gridWidth, gridHeight]);

  const randomize = useCallback(() => {
    setGrid(() => {
      const newGrid = createEmptyGrid(gridWidth, gridHeight);
      for (let row = 0; row < gridHeight; row++) {
        for (let col = 0; col < gridWidth; col++) {
          newGrid[row][col] = Math.random() > 0.7;
        }
      }
      return newGrid;
    });
    setGeneration(0);
    setIsRunning(false);
  }, [gridWidth, gridHeight]);

  const loadPattern = useCallback(
    (pattern: Pattern, startRow: number, startCol: number) => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((r) => [...r]);
        pattern.cells.forEach(([row, col]) => {
          const actualRow = (startRow + row) % gridHeight;
          const actualCol = (startCol + col) % gridWidth;
          if (newGrid[actualRow]) {
            newGrid[actualRow][actualCol] = true;
          }
        });
        return newGrid;
      });
    },
    [gridWidth, gridHeight]
  );

  const step = useCallback(() => {
    setGrid((prevGrid) => nextGeneration(prevGrid, gridWidth, gridHeight, boundaryType));
    setGeneration((prev) => prev + 1);
  }, [gridWidth, gridHeight, boundaryType]);

  const liveCells = countLiveCells(grid);
  const growthRate = generation > 0 ? liveCells - previousLiveCells : null;
  const populationDensity = (liveCells / (gridWidth * gridHeight)) * 100;

  useEffect(() => {
    if (!isRunning) {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
        simulationRef.current = null;
      }
      return;
    }

    // Speed multiplier: speed 10 = 1x, speed 50 = 5x, speed 200 = 20x
    // Formula: multiplier = speed / 10
    // Base interval at 1x speed: 500ms
    const speedMultiplier = speed / 10;
    const interval = Math.max(50, 500 / speedMultiplier);
    console.log('Speed:', speedMultiplier + 'x', 'Interval (ms):', interval, 'Updates/sec:', (1000 / interval).toFixed(2));

    simulationRef.current = setInterval(() => {
      setGrid((prevGrid) => nextGeneration(prevGrid, gridWidth, gridHeight, boundaryType));
      setGeneration((prev) => prev + 1);
    }, interval);

    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
    };
  }, [isRunning, speed, gridWidth, gridHeight, boundaryType]);

  useEffect(() => {
    setPreviousLiveCells(liveCells);
  }, [generation, liveCells]);

  return {
    grid,
    isRunning,
    speed,
    generation,
    gridWidth,
    gridHeight,
    liveCells,
    growthRate,
    populationDensity,
    boundaryType,
    gridColor,
    deadCellColor,
    aliveCellColor,
    gridThickness,
    toggleCell,
    toggleSimulation,
    setSpeed,
    reset,
    randomize,
    loadPattern,
    setGridSize,
    step,
    toggleBoundaryType,
    setGridColor,
    setDeadCellColor,
    setAliveCellColor,
    setGridThickness,
  };
}

export default useGameOfLife;
