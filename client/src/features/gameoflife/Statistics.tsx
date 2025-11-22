import * as React from 'react';

interface StatisticsProps {
  generation: number;
  liveCells: number;
  growthRate: number | null;
}

function Statistics({ generation, liveCells, growthRate }: StatisticsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-lg bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 p-4 text-center">
        <p className="text-sm font-semibold text-gray-600 dark:text-blue-300">Generation</p>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{generation}</p>
      </div>
      <div className="rounded-lg bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 p-4 text-center">
        <p className="text-sm font-semibold text-gray-600 dark:text-cyan-300">Live Cells</p>
        <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-300">{liveCells}</p>
      </div>
      <div className="rounded-lg bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 p-4 text-center">
        <p className="text-sm font-semibold text-gray-600 dark:text-purple-300">Growth Rate</p>
        {growthRate !== null ? (
          <p
            className={`text-2xl font-bold ${
              growthRate > 0
                ? 'text-teal-600 dark:text-teal-400'
                : growthRate < 0
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-yellow-600 dark:text-yellow-400'
            }`}
          >
            {growthRate > 0 ? '+' : ''}
            {growthRate}
          </p>
        ) : (
          <p className="text-2xl font-bold text-gray-400 dark:text-gray-500">—</p>
        )}
      </div>
    </div>
  );
}

export default Statistics;
