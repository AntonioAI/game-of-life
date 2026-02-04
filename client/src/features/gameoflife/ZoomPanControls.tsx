import { Button } from "../../components/ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface ZoomPanControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

function ZoomPanControls({ zoom, onZoomIn, onZoomOut, onReset }: ZoomPanControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Button
          onClick={onZoomOut}
          variant="outline"
          size="lg"
          className="flex-1 flex items-center justify-center gap-2"
        >
          <ZoomOut className="h-4 w-4" />
          Zoom Out
        </Button>
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md min-w-[80px] text-center">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {Math.round(zoom * 100)}%
          </span>
        </div>
        <Button
          onClick={onZoomIn}
          variant="outline"
          size="lg"
          className="flex-1 flex items-center justify-center gap-2"
        >
          <ZoomIn className="h-4 w-4" />
          Zoom In
        </Button>
      </div>
      <Button
        onClick={onReset}
        variant="outline"
        size="lg"
        className="w-full flex items-center justify-center gap-2"
      >
        <Maximize2 className="h-4 w-4" />
        Reset View
      </Button>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        Use mouse wheel to zoom, click and drag to pan around the grid
      </p>
    </div>
  );
}

export default ZoomPanControls;
