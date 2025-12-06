import * as React from 'react';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import GameGrid from '../features/gameoflife/GameGrid';
import PatternSelector from '../features/gameoflife/PatternSelector';
import GridSizeSelector from '../features/gameoflife/GridSizeSelector';
import Statistics from '../features/gameoflife/Statistics';
import Analytics from '../features/gameoflife/Analytics';
import PopulationHistory from '../features/gameoflife/PopulationHistory';
import ColorCustomizer from '../features/gameoflife/ColorCustomizer';
import GridOverlayCustomizer from '../features/gameoflife/GridOverlayCustomizer';
import useGameOfLife from '../features/gameoflife/useGameOfLife';

function GameOfLife() {
  const {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 p-3 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-3">
          <a href="https://antonioai.github.io/#projects">
            <Button
              variant="outline"
              className="text-gray-700 dark:text-gray-300"
            >
              ← Back to Projects
            </Button>
          </a>
        </div>
        <div>
          <h1 className="mb-2 text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Conway's Game of Life
          </h1>
          <p className="text-xs md:text-base text-gray-600 dark:text-blue-200">
            Interactive cellular automaton simulation
          </p>
        </div>

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

        <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} Antonio Innocente. Conway's Game of Life. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default GameOfLife;
