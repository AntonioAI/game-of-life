import * as React from 'react';

interface AnalyticsProps {
  generation: number;
  liveCells: number;
  populationDensity: number;
  gridWidth: number;
  gridHeight: number;
  speed: number;
  boundaryType: 'toroidal' | 'finite';
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
}: AnalyticsProps) {
  const totalCells = gridWidth * gridHeight;
  const speedValue = Math.round(speed / 10);
  const boundaryLabel = boundaryType === 'toroidal' ? 'Toroidal' : 'Finite';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
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
      </div>
    </div>
  );
}

export default Analytics;
