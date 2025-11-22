import * as React from 'react';
import ColorSchemeSelector from './ColorSchemeSelector';

interface ColorCustomizerProps {
  gridColor: string;
  deadCellColor: string;
  aliveCellColor: string;
  gridThickness: number;
  onGridColorChange: (color: string) => void;
  onDeadCellColorChange: (color: string) => void;
  onAliveCellColorChange: (color: string) => void;
  onGridThicknessChange: (thickness: number) => void;
}

function ColorCustomizer({
  gridColor,
  deadCellColor,
  aliveCellColor,
  gridThickness,
  onGridColorChange,
  onDeadCellColorChange,
  onAliveCellColorChange,
  onGridThicknessChange,
}: ColorCustomizerProps) {
  const handleApplyScheme = (newGridColor: string, newDeadColor: string, newAliveColor: string) => {
    onGridColorChange(newGridColor);
    onDeadCellColorChange(newDeadColor);
    onAliveCellColorChange(newAliveColor);
  };

  return (
    <div className="space-y-4">
      <ColorSchemeSelector onApplyScheme={handleApplyScheme} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-2">
            Grid Color
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={gridColor}
              onChange={(e) => onGridColorChange(e.target.value)}
              className="h-10 w-14 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">{gridColor}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-2">
            Dead Cell
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={deadCellColor}
              onChange={(e) => onDeadCellColorChange(e.target.value)}
              className="h-10 w-14 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">{deadCellColor}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-2">
            Alive Cell
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={aliveCellColor}
              onChange={(e) => onAliveCellColorChange(e.target.value)}
              className="h-10 w-14 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">{aliveCellColor}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-2">
            Grid Thickness
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="1"
              max="5"
              value={gridThickness}
              onChange={(e) => onGridThicknessChange(Number(e.target.value))}
              className="h-10 w-14 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-2 text-sm"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">px</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorCustomizer;
