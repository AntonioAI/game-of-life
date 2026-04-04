import * as React from 'react';
import type { PatternMatch } from './patternMatcher';

interface PatternDetectionOverlayProps {
  detectedPatterns: PatternMatch[];
  cellSize: number;
  visible: boolean;
}

// Color palette for different pattern categories
const categoryColors: Record<string, string> = {
  'Still Life': 'rgba(34, 197, 94, 0.4)', // Green
  'Oscillator': 'rgba(59, 130, 246, 0.4)', // Blue
  'Spaceship': 'rgba(168, 85, 247, 0.4)', // Purple
  'Methuselah': 'rgba(241, 65, 108, 0.4)', // Red/Pink
  default: 'rgba(251, 146, 60, 0.4)', // Orange
};

function PatternDetectionOverlay({
  detectedPatterns,
  cellSize,
  visible,
}: PatternDetectionOverlayProps) {
  if (!visible || detectedPatterns.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {detectedPatterns.map((match, idx) => {
        const color = categoryColors[match.patternCategory] || categoryColors.default;
        const borderColor = match.patternCategory === 'Still Life' 
          ? 'rgb(34, 197, 94)' 
          : match.patternCategory === 'Oscillator'
          ? 'rgb(59, 130, 246)'
          : match.patternCategory === 'Spaceship'
          ? 'rgb(168, 85, 247)'
          : 'rgb(241, 65, 108)';

        return (
          <div
            key={`${match.patternName}-${match.y}-${match.x}-${idx}`}
            className="absolute transition-all"
            style={{
              left: `${match.x * cellSize}px`,
              top: `${match.y * cellSize}px`,
              width: `${match.width * cellSize}px`,
              height: `${match.height * cellSize}px`,
              backgroundColor: color,
              border: `2px solid ${borderColor}`,
              boxSizing: 'border-box',
            }}
            title={`${match.patternName} (${match.patternCategory})`}
          >
            {/* Pattern label - only show if not too small */}
            {match.width >= 2 && match.height >= 2 && (
              <div className="absolute top-0 left-0 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded pointer-events-auto cursor-default whitespace-nowrap">
                {match.patternName}
                {match.rotation > 0 && ` (${match.rotation}°)`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PatternDetectionOverlay;
