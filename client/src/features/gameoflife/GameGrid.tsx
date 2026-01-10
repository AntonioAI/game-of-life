import * as React from 'react';
import GameCell from './GameCell';
import type { AnimationMode } from './animationModes';
import type { CellAgeGrid } from './useGameOfLife';

interface GameGridProps {
  grid: boolean[][];
  cellAges: CellAgeGrid;
  onCellClick: (row: number, col: number) => void;
  deadCellColor: string;
  aliveCellColor: string;
  gridColor: string;
  gridThickness: number;
  showGridOverlay: boolean;
  gridLineOpacity: number;
  animationMode: AnimationMode;
  zoom: number;
  panX: number;
  panY: number;
  onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: () => void;
  isDragging: boolean;
  getHasDragged: () => boolean;
}

function GameGrid({
  grid,
  cellAges,
  onCellClick,
  deadCellColor,
  aliveCellColor,
  gridColor,
  gridThickness,
  showGridOverlay,
  gridLineOpacity,
  animationMode,
  zoom,
  panX,
  panY,
  onWheel,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  isDragging,
  getHasDragged,
}: GameGridProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = React.useState(16);
  const [isHoveringGrid, setIsHoveringGrid] = React.useState(false);

  function handleCellClick(row: number, col: number) {
    // Only toggle cell if the user did not drag
    if (!getHasDragged()) {
      onCellClick(row, col);
    }
  }

  function handleMouseEnter() {
    setIsHoveringGrid(true);
  }

  function handleMouseLeaveWrapper() {
    setIsHoveringGrid(false);
    onMouseLeave();
  }

  React.useEffect(() => {
    const calculateCellSize = () => {
      if (!containerRef.current) return;

      const rows = grid.length;
      const cols = grid[0]?.length || 1;

      // Get the actual available space from the container's parent
      const parent = containerRef.current.parentElement;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const availableWidth = parentRect.width;
      const availableHeight = parentRect.height;

      // Calculate cell size based on grid dimensions
      const cellSizeByWidth = Math.floor(availableWidth / cols);
      const cellSizeByHeight = Math.floor(availableHeight / rows);

      // Use the smaller of the two to fit within available space
      const newCellSize = Math.max(2, Math.min(cellSizeByWidth, cellSizeByHeight));
      setCellSize(newCellSize);
    };

    // Use ResizeObserver to handle container size changes
    const resizeObserver = new ResizeObserver(() => {
      calculateCellSize();
    });

    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }

    calculateCellSize();
    window.addEventListener('resize', calculateCellSize);

    return () => {
      window.removeEventListener('resize', calculateCellSize);
      resizeObserver.disconnect();
    };
  }, [grid.length, grid[0]?.length]);

  // Use native wheel event listener to prevent page scrolling when hovering over grid
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleNativeWheel = (e: WheelEvent) => {
      if (isHoveringGrid) {
        e.preventDefault();
        // Create synthetic React event to pass to onWheel handler
        const syntheticEvent = {
          deltaY: e.deltaY,
          clientX: e.clientX,
          clientY: e.clientY,
          currentTarget: e.currentTarget,
          preventDefault: () => {},
          stopPropagation: () => {},
        } as React.WheelEvent<HTMLDivElement>;
        onWheel(syntheticEvent);
      }
    };

    // Use passive: false to allow preventDefault
    container.addEventListener('wheel', handleNativeWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleNativeWheel);
    };
  }, [isHoveringGrid, onWheel]);

  return (
    <div 
      ref={containerRef} 
      className="flex justify-center overflow-auto"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveWrapper}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none', // Prevent default touch behaviors
        userSelect: 'none', // Prevent text selection during drag
      }}
    >
      <div 
        className="inline-block rounded border-2 border-blue-300 dark:border-blue-700"
        style={{
          transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((isAlive, colIndex) => (
              <GameCell
                key={`${rowIndex}-${colIndex}`}
                isAlive={isAlive}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                size={cellSize}
                deadCellColor={deadCellColor}
                aliveCellColor={aliveCellColor}
                gridColor={gridColor}
                gridThickness={gridThickness}
                showGridOverlay={showGridOverlay}
                gridLineOpacity={gridLineOpacity}
                animationMode={animationMode}
                cellAge={cellAges[rowIndex][colIndex]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameGrid;
