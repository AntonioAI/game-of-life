import * as React from 'react';
import { Button } from '../../components/ui/button';
import { Slider } from '../../components/ui/slider';
import { Play, Pause, RotateCcw, SkipForward, SkipBack, Shuffle } from 'lucide-react';

interface FloatingSimulationControlsProps {
  isRunning: boolean;
  speed: number;
  canStepBack: boolean;
  onToggleSimulation: () => void;
  onStep: () => void;
  onStepBack: () => void;
  onReset: () => void;
  onRandomize: () => void;
  onSpeedChange: (speed: number) => void;
}

function FloatingSimulationControls({
  isRunning,
  speed,
  canStepBack,
  onToggleSimulation,
  onStep,
  onStepBack,
  onReset,
  onRandomize,
  onSpeedChange,
}: FloatingSimulationControlsProps) {
  return (
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 flex flex-col gap-3 w-full max-w-md mx-auto mt-2">
      <div className="flex gap-1 justify-center">
        <Button
          onClick={onStepBack}
          size="sm"
          className="bg-orange-600 hover:bg-orange-700 text-white"
          disabled={isRunning || !canStepBack}
          title="Step Back"
        >
          <SkipBack className="w-4 h-4" />
        </Button>
        <Button
          onClick={onToggleSimulation}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          title={isRunning ? 'Pause' : 'Play'}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button
          onClick={onStep}
          size="sm"
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
          disabled={isRunning}
          title="Step"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
        <Button
          onClick={onReset}
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          onClick={onRandomize}
          size="sm"
          className="bg-violet-600 hover:bg-violet-700 text-white"
          title="Randomize"
        >
          <Shuffle className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
          Speed: <span className="text-blue-600 dark:text-cyan-400">{Math.round(speed / 10)}x</span>
        </label>
        <Slider
          value={[speed]}
          onValueChange={(value) => onSpeedChange(value[0])}
          min={10}
          max={200}
          step={10}
          className="flex-1"
        />
      </div>
    </div>
  );
}

export default FloatingSimulationControls;
