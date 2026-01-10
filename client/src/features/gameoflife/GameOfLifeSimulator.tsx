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
import SaveLoadControls from './SaveLoadControls';
import ExportControls from './ExportControls';
import AnimationModeSelector from './AnimationModeSelector';
import FloatingZoomControls from './FloatingZoomControls';
import FloatingSimulationControls from './FloatingSimulationControls';
import ShareControls from './ShareControls';
import RulesetSelector from './RulesetSelector';
import useGameOfLife from './useGameOfLife';
import { useZoomPan } from './useZoomPan';
import { getPatternFromUrl, decodeGridState } from './shareUtils';

function GameOfLifeSimulator() {
  const {
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
    canStepBack,
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
  } = useGameOfLife();

  const {
    zoom,
    panX,
    panY,
    isDragging,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetView,
    zoomIn,
    zoomOut,
    getHasDragged,
  } = useZoomPan({ minZoom: 0.5, maxZoom: 10, zoomStep: 0.2 });

  // Load shared pattern from URL on mount
  React.useEffect(() => {
    const encodedPattern = getPatternFromUrl();
    if (encodedPattern) {
      const decoded = decodeGridState(encodedPattern);
      if (decoded) {
        // Adjust grid size if needed
        if (decoded.gridWidth !== gridWidth || decoded.gridHeight !== gridHeight) {
          setGridSize(decoded.gridWidth, decoded.gridHeight);
        }
        // Load the shared state
        loadSavedState(decoded.grid, decoded.generation);
        
        // Clear the URL parameter after loading
        const url = new URL(window.location.href);
        url.searchParams.delete('pattern');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, []); // Only run on mount

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900 p-2 w-full">
        <div className="relative w-full max-h-[50vh] md:max-h-[60vh] overflow-hidden flex items-center justify-center">
          <GameGrid
            grid={grid}
            cellAges={cellAges}
            onCellClick={toggleCell}
            deadCellColor={deadCellColor}
            aliveCellColor={aliveCellColor}
            gridColor={gridColor}
            gridThickness={gridThickness}
            showGridOverlay={showGridOverlay}
            gridLineOpacity={gridLineOpacity}
            animationMode={animationMode}
            zoom={zoom}
            panX={panX}
            panY={panY}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            isDragging={isDragging}
            getHasDragged={getHasDragged}
          />
          <FloatingZoomControls
            zoom={zoom}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onReset={resetView}
          />
        </div>
        <FloatingSimulationControls
          isRunning={isRunning}
          speed={speed}
          canStepBack={canStepBack}
          onToggleSimulation={toggleSimulation}
          onStep={step}
          onStepBack={stepBack}
          onReset={reset}
          onRandomize={randomize}
          onSpeedChange={setSpeed}
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
        <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-blue-100 dark:border-blue-900">
          <label className="mb-4 block text-sm font-semibold text-gray-900 dark:text-white">
            Save & Load
          </label>
          <SaveLoadControls
            grid={grid}
            generation={generation}
            onLoad={loadSavedState}
          />
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-blue-100 dark:border-blue-900">
          <label className="mb-4 block text-sm font-semibold text-gray-900 dark:text-white">
            Share
          </label>
          <ShareControls
            grid={grid}
            generation={generation}
          />
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-blue-100 dark:border-blue-900">
          <label className="mb-4 block text-sm font-semibold text-gray-900 dark:text-white">
            Export
          </label>
          <ExportControls
            grid={grid}
            aliveCellColor={aliveCellColor}
            deadCellColor={deadCellColor}
          />
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-blue-100 dark:border-blue-900">
          <PatternSelector 
            onLoadPattern={loadPattern} 
            gridWidth={gridWidth} 
            gridHeight={gridHeight}
            currentRuleset={ruleset.notation}
          />
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
            Cellular Automaton Rules
          </label>
          <RulesetSelector
            currentRuleset={ruleset}
            onRulesetChange={setRuleset}
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
            onShowGridOverlayChange={setShowGridOverlay}
            onGridLineOpacityChange={setGridLineOpacity}
          />
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-blue-100 dark:border-blue-900">
          <label className="mb-4 block text-sm font-semibold text-gray-900 dark:text-white">
            Animation & Visualization
          </label>
          <AnimationModeSelector
            animationMode={animationMode}
            onAnimationModeChange={setAnimationMode}
          />
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-blue-50 dark:bg-gray-800 p-5 border border-blue-200 dark:border-blue-900 text-sm">
        <p className="mb-3 text-gray-700 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">How to use:</strong> Click cells to toggle them alive or dead, then press Play to start the simulation.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">Current Rules ({ruleset.notation}):</strong> {ruleset.description}
        </p>
      </div>
    </div>
  );
}

export default GameOfLifeSimulator;
