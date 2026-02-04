import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { animationModes, type AnimationMode } from './animationModes';

interface AnimationModeSelectorProps {
  animationMode: AnimationMode;
  onAnimationModeChange: (mode: AnimationMode) => void;
}

function AnimationModeSelector({ animationMode, onAnimationModeChange }: AnimationModeSelectorProps) {
  function handleValueChange(value: string) {
    onAnimationModeChange(value as AnimationMode);
  }

  return (
    <div className="space-y-3">
      <Select value={animationMode} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select animation mode" />
        </SelectTrigger>
        <SelectContent>
          {animationModes.map((mode) => (
            <SelectItem key={mode.value} value={mode.value}>
              {mode.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {animationModes.find((m) => m.value === animationMode)?.description}
      </p>
    </div>
  );
}

export default AnimationModeSelector;
