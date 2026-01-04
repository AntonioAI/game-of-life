import * as React from 'react';
import { Button } from '../../components/ui/button';
import { Slider } from '../../components/ui/slider';
import GameGrid from './GameGrid';
import PatternSelector from './PatternSelector';
import GridSizeSelector from './GridSizeSelector';
import Analytics from './Analytics';
import PopulationHistory from './PopulationHistory';
import ColorCustomizer from './ColorCustomizer';
import GridOverlayCustomizer from './GridOverlayCustomizer';
import useGameOfLife from './useGameOfLife';

function GameOfLifeSimulator() {
  const {
    grid,
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
    populationHistory,
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
    setShowGridOverlay,
    setGridLineOpacity,
  } = useGameOfLife();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900 p-2 w-full max-h-[50vh] md:max-h-[60vh] overflow-hidden flex items-center justify-center">
        <GameGrid
          grid={grid}
          onCellClick={toggleCell}
          deadCellColor={deadCellColor}
          aliveCellColor={aliveCellColor}
          gridColor={gridColor}
          gridThickness={gridThickness}
          showGridOverlay={showGridOverlay}
          gridLineOpacity={gridLineOpacity}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Live Simulation Statistics
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          These statistics update in real time as generations progress, showing population dynamics and simulation parameters.
        </p>
      </div>

      <Analytics
        generation={generation}
        liveCells={liveCells}
        populationDensity={populationDensity}
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        speed={speed}
        boundaryType={boundaryType}
      />
      <PopulationHistory data={populationHistory} />

      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={toggleSimulation}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            size="lg"
          >
            {isRunning ? 'Pause' : 'Play'}
          </Button>
          <Button
            onClick={step}
            className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold"
            size="lg"
            disabled={isRunning}
          >
            Step
          </Button>
          <Button
            onClick={reset}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
            size="lg"
          >
            Reset
          </Button>
          <Button
            onClick={randomize}
            className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold"
            size="lg"
          >
            Randomize
          </Button>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-blue-100 dark:border-blue-900">
          <label className="mb-4 block text-sm font-semibold text-gray-900 dark:text-white">
            Speed: <span className="text-blue-600 dark:text-cyan-400">{Math.round(speed / 10)}x</span>
          </label>
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={10}
            max={200}
            step={10}
            className="w-full"
          />
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-blue-100 dark:border-blue-900">
          <PatternSelector onLoadPattern={loadPattern} gridWidth={gridWidth} gridHeight={gridHeight} />
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-blue-100 dark:border-blue-900">
          <label className="mb-4 block text-sm font-semibold text-gray-900 dark:text-white">
            Grid Size (Current: <span className="text-cyan-600 dark:text-cyan-400">{gridWidth}×{gridHeight}</span>)
          </label>
          <GridSizeSelector
            width={gridWidth}
            height={gridHeight}
            onSetSize={setGridSize}
          />
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-blue-100 dark:border-blue-900">
          <label className="mb-4 block text-sm font-semibold text-gray-900 dark:text-white">
            Boundary Type: <span className="text-purple-600 dark:text-purple-400">{boundaryType === 'toroidal' ? 'Toroidal' : 'Finite'}</span>
          </label>
          <Button
            onClick={toggleBoundaryType}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
          >
            Toggle to {boundaryType === 'toroidal' ? 'Finite' : 'Toroidal'}
          </Button>
          <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">
            {boundaryType === 'toroidal'
              ? 'Toroidal: Grid wraps around at edges (like a donut)'
              : 'Finite: Cells at edges have fewer neighbors (hard boundaries)'}
          </p>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-blue-100 dark:border-blue-900">
          <label className="mb-4 block text-sm font-semibold text-gray-900 dark:text-white">
            Appearance
          </label>
          <ColorCustomizer
            gridColor={gridColor}
            deadCellColor={deadCellColor}
            aliveCellColor={aliveCellColor}
            gridThickness={gridThickness}
            onGridColorChange={setGridColor}
            onDeadCellColorChange={setDeadCellColor}
            onAliveCellColorChange={setAliveCellColor}
            onGridThicknessChange={setGridThickness}
          />
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-blue-100 dark:border-blue-900">
          <label className="mb-4 block text-sm font-semibold text-gray-900 dark:text-white">
            Grid Overlay
          </label>
          <GridOverlayCustomizer
            showGridOverlay={showGridOverlay}
            gridLineOpacity={gridLineOpacity}
            gridThickness={gridThickness}
            onShowGridOverlayChange={setShowGridOverlay}
            onGridLineOpacityChange={setGridLineOpacity}
            onGridThicknessChange={setGridThickness}
          />
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-blue-50 dark:bg-gray-800 p-5 border border-blue-200 dark:border-blue-900 text-sm">
        <p className="mb-3 text-gray-700 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">How to use:</strong> Click cells to toggle them alive or dead, then press Play to start the simulation.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">Rules:</strong> A live cell with 2-3 neighbors survives, a dead cell with exactly 3 neighbors becomes alive.
        </p>
      </div>
    </div>
  );
}

export default GameOfLifeSimulator;
