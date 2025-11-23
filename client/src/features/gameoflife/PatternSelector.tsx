import * as React from 'react';
import { Button } from '../../components/ui/button';
import { PATTERNS, type Pattern } from './patterns';
import PatternPreview from './PatternPreview';

interface PatternSelectorProps {
  onLoadPattern: (pattern: Pattern, startRow: number, startCol: number) => void;
  gridWidth: number;
  gridHeight: number;
}

function PatternSelector({ onLoadPattern, gridWidth, gridHeight }: PatternSelectorProps) {
  const [selectedPattern, setSelectedPattern] = React.useState<Pattern>(PATTERNS[0]);
  const [showMenu, setShowMenu] = React.useState(false);

  const handleSelectPattern = (pattern: Pattern) => {
    setSelectedPattern(pattern);
    setShowMenu(false);
  };

  const handleLoadPattern = () => {
    // Calculate pattern bounds to center it properly
    const minRow = Math.min(...selectedPattern.cells.map(([r]) => r));
    const maxRow = Math.max(...selectedPattern.cells.map(([r]) => r));
    const minCol = Math.min(...selectedPattern.cells.map(([, c]) => c));
    const maxCol = Math.max(...selectedPattern.cells.map(([, c]) => c));
    
    const patternHeight = maxRow - minRow + 1;
    const patternWidth = maxCol - minCol + 1;
    
    // Center the pattern on the grid
    const startRow = Math.floor((gridHeight - patternHeight) / 2) - minRow;
    const startCol = Math.floor((gridWidth - patternWidth) / 2) - minCol;
    
    onLoadPattern(selectedPattern, startRow, startCol);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
        Load Preset Pattern
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-full rounded bg-gray-200 dark:bg-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 font-medium"
          >
            {selectedPattern.name}
          </button>
          {showMenu && (
            <div className="absolute top-full z-10 mt-1 w-full rounded bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
              {PATTERNS.map((pattern) => (
                <button
                  key={pattern.name}
                  onClick={() => handleSelectPattern(pattern)}
                  className="w-full border-b border-gray-200 dark:border-gray-700 px-3 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700 last:border-b-0 flex items-center gap-3"
                >
                  <div className="flex-shrink-0">
                    <PatternPreview pattern={pattern} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white">{pattern.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{pattern.description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <Button
          onClick={handleLoadPattern}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold"
        >
          Load
        </Button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Patterns are placed at the center of the grid. Click Load multiple times to add more patterns.
      </p>
    </div>
  );
}

export default PatternSelector;
