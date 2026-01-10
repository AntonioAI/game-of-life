import { useState, useCallback, useEffect, useRef } from 'react';
import type { Pattern } from './patterns';
import { PATTERNS } from './patterns';
import type { AnimationMode } from './animationModes';
import { RULESETS, type Ruleset, applyRule } from './rulesets';

type Grid = boolean[][];
export type CellAgeGrid = number[][];

export interface GameOfLifeState {
  grid: Grid;
  cellAges: CellAgeGrid;
  isRunning: boolean;
  speed: number;
  generation: number;
  gridWidth: number;
  gridHeight: number;
  liveCells: number;
  populationDensity: number;
  boundaryType: 'toroidal' | 'finite';
  gridColor: string;
  deadCellColor: string;
  aliveCellColor: string;
  gridThickness: number;
  showGridOverlay: boolean;
  gridLineOpacity: number;
  animationMode: AnimationMode;
  populationHistory: Array<{ generation: number; population: number }>;
  ruleset: Ruleset;
  toggleCell: (row: number, col: number) => void;
  toggleSimulation: () => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
  randomize: () => void;
  loadPattern: (pattern: Pattern, startRow: number, startCol: number) => void;
  setGridSize: (width: number, height: number) => void;
  step: () => void;
  stepBack: () => void;
  canStepBack: boolean;
  toggleBoundaryType: () => void;
  setGridColor: (color: string) => void;
  setDeadCellColor: (color: string) => void;
  setAliveCellColor: (color: string) => void;
  setGridThickness: (thickness: number) => void;
  setShowGridOverlay: (show: boolean) => void;
  setGridLineOpacity: (opacity: number) => void;
  setAnimationMode: (mode: AnimationMode) => void;
  setRuleset: (ruleset: Ruleset) => void;
  loadSavedState: (grid: Grid, generation: number) => void;
}

function createEmptyGrid(width: number, height: number): Grid {
  return Array(height)
    .fill(null)
    .map(() => Array(width).fill(false));
}

function createEmptyCellAgeGrid(width: number, height: number): CellAgeGrid {
  return Array(height)
    .fill(null)
    .map(() => Array(width).fill(0));
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
  boundaryType: 'toroidal' | 'finite',
  ruleset: Ruleset
): Grid {
  const newGrid = createEmptyGrid(width, height);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const liveNeighbors = countLiveNeighbors(grid, row, col, width, height, boundaryType);
      const isAlive = grid[row][col];

      newGrid[row][col] = applyRule(isAlive, liveNeighbors, ruleset);
    }
  }

  return newGrid;
}

function updateCellAges(grid: Grid, previousGrid: Grid, cellAges: CellAgeGrid): CellAgeGrid {
  const newAges = cellAges.map(row => [...row]);
  
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col]) {
        // Cell is alive, increment age
        newAges[row][col] = (previousGrid[row][col] ? cellAges[row][col] : 0) + 1;
      } else {
        // Cell is dead, reset age
        newAges[row][col] = 0;
      }
    }
  }
  
  return newAges;
}

function countLiveCells(grid: Grid): number {
  return grid.reduce((sum, row) => sum + row.filter((cell) => cell).length, 0);
}

function useGameOfLife(): GameOfLifeState {
  const simulationRef = useRef<NodeJS.Timeout | null>(null);

  const [gridWidth, setGridWidth] = useState(40);
  const [gridHeight, setGridHeight] = useState(40);
  const [grid, setGrid] = useState<Grid>(() => {
    const emptyGrid = createEmptyGrid(40, 40);
    const pentomino = PATTERNS.find(p => p.name === 'Pentomino');
    if (pentomino) {
      const startRow = Math.floor(40 / 2) - 1;
      const startCol = Math.floor(40 / 2) - 1;
      pentomino.cells.forEach(([row, col]) => {
        const actualRow = (startRow + row) % 40;
        const actualCol = (startCol + col) % 40;
        if (emptyGrid[actualRow]) {
          emptyGrid[actualRow][actualCol] = true;
        }
      });
    }
    return emptyGrid;
  });
  const [cellAges, setCellAges] = useState<CellAgeGrid>(() => createEmptyCellAgeGrid(40, 40));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [generation, setGeneration] = useState(0);
  const [boundaryType, setBoundaryType] = useState<'toroidal' | 'finite'>('toroidal');
  const [gridColor, setGridColor] = useState('#93c5fd');
  const [deadCellColor, setDeadCellColor] = useState('#f3f4f6');
  const [aliveCellColor, setAliveCellColor] = useState('#06b6d4');
  const [gridThickness, setGridThickness] = useState(1);
  const [showGridOverlay, setShowGridOverlay] = useState(true);
  const [gridLineOpacity, setGridLineOpacity] = useState(0.5);
  const [animationMode, setAnimationMode] = useState<AnimationMode>('fade');
  const [populationHistory, setPopulationHistory] = useState<Array<{ generation: number; population: number }>>([]);
  const [ruleset, setRuleset] = useState<Ruleset>(RULESETS[0]); // Default to Game of Life
  
  // History for stepping back
  const [gridHistory, setGridHistory] = useState<Array<{ grid: Grid; cellAges: CellAgeGrid }>>([]);

  const setGridSize = useCallback((width: number, height: number) => {
    setGridWidth(width);
    setGridHeight(height);
    setGrid(createEmptyGrid(width, height));
    setCellAges(createEmptyCellAgeGrid(width, height));
    setGeneration(0);
    setIsRunning(false);
  }, []);

  const toggleCell = useCallback((row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      newGrid[row][col] = !newGrid[row][col];
      return newGrid;
    });
    setGeneration(0);
  }, []);

  const toggleSimulation = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const toggleBoundaryType = useCallback(() => {
    setBoundaryType((prev) => (prev === 'toroidal' ? 'finite' : 'toroidal'));
  }, []);

  const reset = useCallback(() => {
    setGrid(createEmptyGrid(gridWidth, gridHeight));
    setCellAges(createEmptyCellAgeGrid(gridWidth, gridHeight));
    setGeneration(0);
    setIsRunning(false);
    setPopulationHistory([]);
    setGridHistory([]);
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

  const loadSavedState = useCallback((newGrid: Grid, newGeneration: number) => {
    setGrid(newGrid);
    setGeneration(newGeneration);
    setIsRunning(false);
  }, []);

  const step = useCallback(() => {
    // Save current state to history before stepping
    setGridHistory((prevHistory) => [...prevHistory, { grid, cellAges }]);
    
    const newGrid = nextGeneration(grid, gridWidth, gridHeight, boundaryType, ruleset);
    const newAges = updateCellAges(newGrid, grid, cellAges);
    
    setGrid(newGrid);
    setCellAges(newAges);
    setGeneration((prev) => prev + 1);
  }, [grid, cellAges, gridWidth, gridHeight, boundaryType, ruleset]);

  const stepBack = useCallback(() => {
    if (gridHistory.length === 0) return;
    
    const previousState = gridHistory[gridHistory.length - 1];
    const newHistory = gridHistory.slice(0, -1);
    
    setGrid(previousState.grid);
    setCellAges(previousState.cellAges);
    setGridHistory(newHistory);
    setGeneration((prev) => Math.max(0, prev - 1));
  }, [gridHistory]);

  const liveCells = countLiveCells(grid);
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
      setGrid((prevGrid) => {
        const newGrid = nextGeneration(prevGrid, gridWidth, gridHeight, boundaryType, ruleset);
        
        setCellAges((prevAges) => {
          const newAges = updateCellAges(newGrid, prevGrid, prevAges);
          
          // Save current state to history
          setGridHistory((prevHistory) => {
            // Limit history to last 100 states to prevent memory issues
            const newHistory = [...prevHistory, { grid: prevGrid, cellAges: prevAges }];
            return newHistory.length > 100 ? newHistory.slice(-100) : newHistory;
          });
          
          return newAges;
        });
        
        return newGrid;
      });
      setGeneration((prev) => prev + 1);
    }, interval);

    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
    };
  }, [isRunning, speed, gridWidth, gridHeight, boundaryType, ruleset]);

  useEffect(() => {
      setPopulationHistory((prev) => {
        const existingIndex = prev.findIndex((entry) => entry.generation === generation);
        let updated: Array<{ generation: number; population: number }>;
        
        if (existingIndex >= 0) {
          // Update existing generation entry
          updated = [...prev];
          updated[existingIndex] = { generation, population: liveCells };
        } else {
          // Add new generation entry
          updated = [...prev, { generation, population: liveCells }];
        }
        
        return updated;
      });
    }, [generation, liveCells]);

  return {
    grid,
    cellAges,
    isRunning,
    speed,
    generation,
    gridWidth,
    gridHeight,
    liveCells,
    populationDensity,
    boundaryType,
    gridColor,
    deadCellColor,
    aliveCellColor,
    gridThickness,
    showGridOverlay,
    gridLineOpacity,
    animationMode,
    populationHistory,
    ruleset,
    toggleCell,
    toggleSimulation,
    setSpeed,
    reset,
    randomize,
    loadPattern,
    setGridSize,
    step,
    stepBack,
    canStepBack: gridHistory.length > 0,
    toggleBoundaryType,
    setGridColor,
    setDeadCellColor,
    setAliveCellColor,
    setGridThickness,
    setShowGridOverlay,
    setGridLineOpacity,
    setAnimationMode,
    setRuleset,
    loadSavedState,
  };
}

export default useGameOfLife;
