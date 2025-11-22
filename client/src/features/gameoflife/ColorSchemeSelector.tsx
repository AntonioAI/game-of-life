import * as React from 'react';
import { Button } from '../../components/ui/button';
import { colorSchemes } from './colorSchemes';

interface ColorSchemeSelectorProps {
  onApplyScheme: (gridColor: string, deadCellColor: string, aliveCellColor: string) => void;
}

function ColorSchemeSelector({ onApplyScheme }: ColorSchemeSelectorProps) {
  const handleApplyScheme = (gridColor: string, deadCellColor: string, aliveCellColor: string) => {
    onApplyScheme(gridColor, deadCellColor, aliveCellColor);
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Quick Presets</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {colorSchemes.map((scheme) => (
          <Button
            key={scheme.name}
            onClick={() => handleApplyScheme(scheme.gridColor, scheme.deadCellColor, scheme.aliveCellColor)}
            variant="outline"
            className="text-xs h-10 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex gap-1">
              <div
                className="w-3 h-3 rounded border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: scheme.deadCellColor }}
              />
              <div
                className="w-3 h-3 rounded border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: scheme.aliveCellColor }}
              />
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: scheme.gridColor }}
              />
            </div>
            <span>{scheme.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ColorSchemeSelector;
