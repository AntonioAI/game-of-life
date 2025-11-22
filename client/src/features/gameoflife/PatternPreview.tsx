import * as React from 'react';
import { type Pattern } from './patterns';

interface PatternPreviewProps {
  pattern: Pattern;
  size?: number;
}

function PatternPreview({ pattern, size = 40 }: PatternPreviewProps) {
  // Get pattern bounds
  const maxRow = Math.max(...pattern.cells.map(([r]) => r), 0);
  const maxCol = Math.max(...pattern.cells.map(([, c]) => c), 0);
  
  // Create a grid to visualize the pattern
  const grid: boolean[][] = [];
  for (let i = 0; i <= maxRow; i++) {
    grid[i] = [];
    for (let j = 0; j <= maxCol; j++) {
      grid[i][j] = false;
    }
  }
  
  // Mark alive cells
  pattern.cells.forEach(([r, c]) => {
    if (grid[r]) {
      grid[r][c] = true;
    }
  });

  const cellSize = Math.max(2, Math.floor(size / Math.max(maxRow + 1, maxCol + 1)));
  const previewWidth = (maxCol + 1) * cellSize;
  const previewHeight = (maxRow + 1) * cellSize;

  return (
    <div
      className="inline-block rounded border border-blue-300 dark:border-blue-700 bg-gray-100 dark:bg-gray-700 p-1"
      style={{
        width: Math.max(30, previewWidth),
        height: Math.max(30, previewHeight),
      }}
    >
      <svg
        width={Math.max(30, previewWidth)}
        height={Math.max(30, previewHeight)}
        className="block"
      >
        {grid.map((row, r) =>
          row.map((alive, c) =>
            alive ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#06b6d4"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}

export default PatternPreview;
