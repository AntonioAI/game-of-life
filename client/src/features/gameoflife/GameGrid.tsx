import * as React from 'react';
import GameCell from './GameCell';

interface GameGridProps {
  grid: boolean[][];
  onCellClick: (row: number, col: number) => void;
  deadCellColor: string;
  aliveCellColor: string;
  gridColor: string;
  gridThickness: number;
}

function GameGrid({
  grid,
  onCellClick,
  deadCellColor,
  aliveCellColor,
  gridColor,
  gridThickness,
}: GameGridProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = React.useState(16);

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

  return (
    <div ref={containerRef} className="flex justify-center overflow-auto">
      <div className="inline-block rounded border-2 border-blue-300 dark:border-blue-700">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((isAlive, colIndex) => (
              <GameCell
                key={`${rowIndex}-${colIndex}`}
                isAlive={isAlive}
                onClick={() => onCellClick(rowIndex, colIndex)}
                size={cellSize}
                deadCellColor={deadCellColor}
                aliveCellColor={aliveCellColor}
                gridColor={gridColor}
                gridThickness={gridThickness}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameGrid;
