import * as React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PopulationHistoryProps {
  data: Array<{ generation: number; population: number }>;
}

function PopulationHistory({ data }: PopulationHistoryProps) {
  if (data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/40 dark:to-gray-800/40 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Start the simulation to see population history
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-25 dark:from-indigo-900/20 dark:to-indigo-800/20 p-4 border border-indigo-200 dark:border-indigo-700">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
        Population History
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-indigo-200 dark:stroke-indigo-800"
          />
          <XAxis
            dataKey="generation"
            className="text-xs text-gray-500 dark:text-gray-400"
            tick={{ fill: 'currentColor' }}
          />
          <YAxis
            className="text-xs text-gray-500 dark:text-gray-400"
            tick={{ fill: 'currentColor' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            cursor={{ stroke: 'rgba(99, 102, 241, 0.3)' }}
          />
          <Line
            type="monotone"
            dataKey="population"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PopulationHistory;
