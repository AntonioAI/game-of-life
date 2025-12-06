import * as React from 'react';
import { Toggle } from '../../components/ui/toggle';
import { Slider } from '../../components/ui/slider';

interface GridOverlayCustomizerProps {
  showGridOverlay: boolean;
  gridLineOpacity: number;
  gridThickness: number;
  onShowGridOverlayChange: (show: boolean) => void;
  onGridLineOpacityChange: (opacity: number) => void;
  onGridThicknessChange: (thickness: number) => void;
}

function GridOverlayCustomizer({
  showGridOverlay,
  gridLineOpacity,
  gridThickness,
  onShowGridOverlayChange,
  onGridLineOpacityChange,
  onGridThicknessChange,
}: GridOverlayCustomizerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-900 dark:text-white">
          Show Grid Overlay
        </label>
        <Toggle
          pressed={showGridOverlay}
          onPressedChange={onShowGridOverlayChange}
          className="data-[state=on]:bg-blue-600 data-[state=on]:text-white"
        >
          {showGridOverlay ? 'On' : 'Off'}
        </Toggle>
      </div>

      {showGridOverlay && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white">
              Grid Line Opacity: <span className="text-blue-600 dark:text-cyan-400">{Math.round(gridLineOpacity * 100)}%</span>
            </label>
            <Slider
              value={[gridLineOpacity]}
              onValueChange={(value) => onGridLineOpacityChange(value[0])}
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white">
              Grid Line Thickness: <span className="text-blue-600 dark:text-cyan-400">{gridThickness}px</span>
            </label>
            <Slider
              value={[gridThickness]}
              onValueChange={(value) => onGridThicknessChange(value[0])}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default GridOverlayCustomizer;
