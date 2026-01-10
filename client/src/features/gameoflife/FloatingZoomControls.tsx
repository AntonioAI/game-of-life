import { Button } from "../../components/ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface FloatingZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

function FloatingZoomControls({ zoom, onZoomIn, onZoomOut, onReset }: FloatingZoomControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
      <Button
        onClick={onZoomIn}
        variant="default"
        size="icon"
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg w-10 h-10"
        title="Zoom In"
      >
        <ZoomIn className="h-5 w-5" />
      </Button>
      <Button
        onClick={onZoomOut}
        variant="default"
        size="icon"
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg w-10 h-10"
        title="Zoom Out"
      >
        <ZoomOut className="h-5 w-5" />
      </Button>
      <Button
        onClick={onReset}
        variant="default"
        size="icon"
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg w-10 h-10"
        title="Reset View"
      >
        <Maximize2 className="h-5 w-5" />
      </Button>
      <div className="px-2 py-1 bg-blue-600 text-white rounded-md shadow-lg text-center">
        <span className="text-xs font-semibold">
          {Math.round(zoom * 100)}%
        </span>
      </div>
    </div>
  );
}

export default FloatingZoomControls;
