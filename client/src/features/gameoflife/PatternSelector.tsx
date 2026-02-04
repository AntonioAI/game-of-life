import * as React from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { PATTERNS, PATTERN_TYPE_LABELS, type Pattern, type PatternType } from './patterns';
import PatternPreview from './PatternPreview';

interface PatternSelectorProps {
  onLoadPattern: (pattern: Pattern, startRow: number, startCol: number) => void;
  gridWidth: number;
  gridHeight: number;
  currentRuleset?: string;
}

function PatternSelector({ onLoadPattern, gridWidth, gridHeight, currentRuleset = 'B3/S23' }: PatternSelectorProps) {
  const [selectedPattern, setSelectedPattern] = React.useState<Pattern>(PATTERNS[0]);
  const [showMenu, setShowMenu] = React.useState(false);
  const [showAllPatterns, setShowAllPatterns] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<PatternType | 'all'>('all');

  /**
   * IMPORTANT: Filtering logic must match tests:
   * - If "All rulesets" is OFF:
   *   - For Conway (B3/S23): show patterns with no ruleset OR ruleset === B3/S23
   *   - For other rulesets: show ONLY patterns with ruleset === currentRuleset
   * - If "All rulesets" is ON: show all patterns
   */
  const patternsForRuleset = React.useMemo(() => {
    if (showAllPatterns) return PATTERNS;

    if (currentRuleset === 'B3/S23') {
      return PATTERNS.filter((p) => !p.ruleset || p.ruleset === 'B3/S23');
    }

    return PATTERNS.filter((p) => p.ruleset === currentRuleset);
  }, [currentRuleset, showAllPatterns]);

  // Filter patterns by ruleset + search query + type
  const filteredPatterns = React.useMemo(() => {
    let patterns = patternsForRuleset;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      patterns = patterns.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }

    // Filter by pattern type
    if (selectedType !== 'all') {
      patterns = patterns.filter((p) => p.type === selectedType);
    }

    return patterns;
  }, [patternsForRuleset, searchQuery, selectedType]);

  /**
   * Ensure the selected pattern is valid for the current ruleset filter.
   * This is what your tests expect:
   * - HighLife (B35/S236) => default trigger shows "Replicator"
   * - Conway (B3/S23) => default trigger shows "Glider"
   * - Day & Night => default trigger shows "Diamond"
   *
   * So when ruleset changes (or when "All rulesets" is unchecked),
   * pick the first pattern from the ruleset-filtered list.
   */
  React.useEffect(() => {
    // If there are no patterns (shouldn't happen), keep existing selection
    if (patternsForRuleset.length === 0) return;

    const isSelectionValid = patternsForRuleset.some((p) => p.name === selectedPattern.name);
    if (!isSelectionValid) {
      setSelectedPattern(patternsForRuleset[0]);
    }
  }, [patternsForRuleset, selectedPattern.name]);

  const handleSelectPattern = (pattern: Pattern) => {
    setSelectedPattern(pattern);
    setShowMenu(false);
  };

  const handleOpenMenu = () => {
    setShowMenu(!showMenu);
    if (!showMenu) {
      // Reset search when opening menu
      setSearchQuery('');
      setSelectedType('all');
    }
  };

  const handleLoadPattern = () => {
    // Calculate pattern bounds to center it properly
    const minRow = Math.min(...selectedPattern.cells.map(([r]) => r));
    const maxRow = Math.max(...selectedPattern.cells.map(([r]) => r));
    const minCol = Math.min(...selectedPattern.cells.map(([, c]) => c));
    const maxCol = Math.max(...selectedPattern.cells.map(([, c]) => c));

    const patternHeight = maxRow - minRow + 1;
    const patternWidth = maxCol - minCol + 1;

    // Center the pattern in the grid
    const startRow = Math.floor((gridHeight - patternHeight) / 2) - minRow;
    const startCol = Math.floor((gridWidth - patternWidth) / 2) - minCol;

    onLoadPattern(selectedPattern, startRow, startCol);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-900 dark:text-white">Load Preset Pattern</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <button
            onClick={handleOpenMenu}
            className="w-full rounded bg-gray-200 dark:bg-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 font-medium"
          >
            {selectedPattern.name}
          </button>
          {showMenu && (
            <div className="absolute top-full z-10 mt-1 w-full rounded bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 max-h-[500px] flex flex-col">
              <div className="sticky top-0 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 px-3 py-2 space-y-2">
                <Input
                  type="text"
                  placeholder="Search patterns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800"
                />
                <div className="flex gap-2 items-center justify-between">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as PatternType | 'all')}
                    className="flex-1 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Types</option>
                    {Object.entries(PATTERN_TYPE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <label className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={showAllPatterns}
                      onChange={(e) => setShowAllPatterns(e.target.checked)}
                      className="rounded"
                    />
                    All rulesets
                  </label>
                </div>
              </div>
              <div className="overflow-y-auto flex-1">
                {filteredPatterns.length === 0 ? (
                  <div className="px-3 py-6 text-center text-sm text-gray-500 dark:text-gray-400">No patterns found</div>
                ) : (
                  filteredPatterns.map((pattern) => (
                    <button
                      key={pattern.name}
                      onClick={() => handleSelectPattern(pattern)}
                      className="w-full border-b border-gray-200 dark:border-gray-700 px-3 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700 last:border-b-0 flex items-center gap-3"
                    >
                      <div className="flex-shrink-0">
                        <PatternPreview pattern={pattern} size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-gray-900 dark:text-white">{pattern.name}</div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                            {PATTERN_TYPE_LABELS[pattern.type]}
                          </span>
                          {pattern.ruleset && pattern.ruleset !== currentRuleset && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 font-mono">
                              {pattern.ruleset}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{pattern.description}</div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <Button onClick={handleLoadPattern} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold">
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
