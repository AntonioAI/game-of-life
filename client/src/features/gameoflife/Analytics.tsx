import * as React from 'react';
import type { CycleAnalysis } from './patternAnalyzer';
import type { PatternMatch } from './patternMatcher';

interface AnalyticsProps {
  generation: number;
  liveCells: number;
  populationDensity: number;
  gridWidth: number;
  gridHeight: number;
  speed: number;
  boundaryType: 'toroidal' | 'finite';
  convergenceState: CycleAnalysis;
  detectedPatterns?: PatternMatch[];
}

function AnalyticsCard({
  label,
  value,
  unit,
  bgColor,
  textColor,
  icon,
}: {
  label: string;
  value: string | number;
  unit?: string;
  bgColor: string;
  textColor: string;
  icon: string;
}) {
  return (
    <div
      className={`rounded-lg ${bgColor} p-4 border transition-all hover:shadow-md`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold uppercase tracking-wider opacity-75">{label}</p>
        <span className="text-lg">{icon}</span>
      </div>
      <p className={`text-2xl font-bold ${textColor}`}>
        {value}
        {unit && <span className="text-sm ml-1 font-normal opacity-80">{unit}</span>}
      </p>
    </div>
  );
}

function Analytics({
  generation,
  liveCells,
  populationDensity,
  gridWidth,
  gridHeight,
  speed,
  boundaryType,
  convergenceState,
  detectedPatterns = [],
}: AnalyticsProps) {
  const totalCells = gridWidth * gridHeight;
  const speedValue = Math.round(speed / 10);
  const boundaryLabel = boundaryType === 'toroidal' ? 'Toroidal' : 'Finite';

  // Format convergence state display
  const getStatusLabel = (): string => {
    switch (convergenceState.type) {
      case 'stable':
        return 'Stable';
      case 'oscillating':
        return `Oscillating (P${convergenceState.period})`;
      case 'converging':
        return 'Converging';
      case 'chaotic':
        return 'Chaotic';
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = (): string => {
    switch (convergenceState.type) {
      case 'stable':
        return '✓'; // Check mark
      case 'oscillating':
        return '🔄'; // Refresh/cycle
      case 'converging':
        return '📉'; // Trending down
      case 'chaotic':
        return '🌀'; // Spiral
      default:
        return '❓';
    }
  };

  const getStatusColor = (): {
    bgColor: string;
    textColor: string;
  } => {
    switch (convergenceState.type) {
      case 'stable':
        return {
          bgColor: 'bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/60 dark:to-green-800/40 border-green-200 dark:border-green-700',
          textColor: 'text-green-600 dark:text-green-300',
        };
      case 'oscillating':
        return {
          bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/60 dark:to-yellow-800/40 border-yellow-200 dark:border-yellow-700',
          textColor: 'text-yellow-600 dark:text-yellow-300',
        };
      case 'converging':
        return {
          bgColor: 'bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/60 dark:to-blue-800/40 border-blue-200 dark:border-blue-700',
          textColor: 'text-blue-600 dark:text-blue-300',
        };
      case 'chaotic':
        return {
          bgColor: 'bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/60 dark:to-red-800/40 border-red-200 dark:border-red-700',
          textColor: 'text-red-600 dark:text-red-300',
        };
      default:
        return {
          bgColor: 'bg-gray-100 dark:bg-gray-800',
          textColor: 'text-gray-600 dark:text-gray-300',
        };
    }
  };

  const statusColor = getStatusColor();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-7">
        <AnalyticsCard
          label="Generation"
          value={generation}
          bgColor="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/60 dark:to-blue-800/40 border-blue-200 dark:border-blue-700"
          textColor="text-blue-600 dark:text-blue-300"
          icon="📊"
        />
        <AnalyticsCard
          label="Live Cells"
          value={liveCells}
          unit={`/ ${totalCells}`}
          bgColor="bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-900/60 dark:to-cyan-800/40 border-cyan-200 dark:border-cyan-700"
          textColor="text-cyan-600 dark:text-cyan-300"
          icon="🔋"
        />
        <AnalyticsCard
          label="Population"
          value={populationDensity.toFixed(1)}
          unit="%"
          bgColor="bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900/60 dark:to-teal-800/40 border-teal-200 dark:border-teal-700"
          textColor="text-teal-600 dark:text-teal-300"
          icon="📈"
        />
        <AnalyticsCard
          label="Grid Size"
          value={`${gridWidth}×${gridHeight}`}
          bgColor="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/60 dark:to-purple-800/40 border-purple-200 dark:border-purple-700"
          textColor="text-purple-600 dark:text-purple-300"
          icon="📐"
        />
        <AnalyticsCard
          label="Speed"
          value={speedValue}
          unit="x"
          bgColor="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/60 dark:to-orange-800/40 border-orange-200 dark:border-orange-700"
          textColor="text-orange-600 dark:text-orange-300"
          icon="⚡"
        />
        <AnalyticsCard
          label="Boundary"
          value={boundaryLabel}
          bgColor="bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/60 dark:to-rose-800/40 border-rose-200 dark:border-rose-700"
          textColor="text-rose-600 dark:text-rose-300"
          icon="🎯"
        />
        <AnalyticsCard
          label="Status"
          value={getStatusLabel()}
          bgColor={statusColor.bgColor}
          textColor={statusColor.textColor}
          icon={getStatusIcon()}
        />
      </div>

      {/* Detected Patterns Section */}
      {detectedPatterns.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Detected Patterns ({detectedPatterns.length})
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {detectedPatterns.map((pattern, index) => (
              <div
                key={`${pattern.name}-${pattern.x}-${pattern.y}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    pattern.category === 'Still Life' ? 'bg-green-500' :
                    pattern.category === 'Oscillator' ? 'bg-blue-500' :
                    pattern.category === 'Spaceship' ? 'bg-purple-500' :
                    'bg-red-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {pattern.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {pattern.category} • {pattern.width}×{pattern.height} • Rotation: {pattern.rotation}°
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    ({pattern.x}, {pattern.y})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
