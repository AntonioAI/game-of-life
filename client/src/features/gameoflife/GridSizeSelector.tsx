import * as React from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

interface GridSizeSelectorProps {
  width: number;
  height: number;
  onSetSize: (width: number, height: number) => void;
}

function GridSizeSelector({ width, height, onSetSize }: GridSizeSelectorProps) {
  const [newWidth, setNewWidth] = React.useState(width.toString());
  const [newHeight, setNewHeight] = React.useState(height.toString());

  const handleApply = () => {
    const w = Math.max(10, Math.min(100, parseInt(newWidth) || width));
    const h = Math.max(10, Math.min(100, parseInt(newHeight) || height));
    setNewWidth(w.toString());
    setNewHeight(h.toString());
    onSetSize(w, h);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWidth(e.target.value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewHeight(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="grid-width" className="text-gray-900 dark:text-white font-semibold">
            Width
          </Label>
          <Input
            id="grid-width"
            type="number"
            value={newWidth}
            onChange={handleWidthChange}
            min="10"
            max="100"
            className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          <Label htmlFor="grid-height" className="text-gray-900 dark:text-white font-semibold">
            Height
          </Label>
          <Input
            id="grid-height"
            type="number"
            value={newHeight}
            onChange={handleHeightChange}
            min="10"
            max="100"
            className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>
      <Button
        onClick={handleApply}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold"
      >
        Apply Grid Size
      </Button>
    </div>
  );
}

export default GridSizeSelector;
