import * as React from 'react';
import { Button } from '../../components/ui/button';
import { Dialog } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { exportGridAsPNG, exportGridAsRLE } from './gridExporter';

interface ExportControlsProps {
  grid: boolean[][];
  aliveCellColor: string;
  deadCellColor: string;
}

function ExportControls({ grid, aliveCellColor, deadCellColor }: ExportControlsProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const [exportType, setExportType] = React.useState<'png' | 'rle'>('png');
  const [filename, setFilename] = React.useState('game-of-life');
  const [cellSize, setCellSize] = React.useState(10);
  const [patternName, setPatternName] = React.useState('My Pattern');

  const handleExportPNG = () => {
    exportGridAsPNG(grid, `${filename}.png`, cellSize, aliveCellColor, deadCellColor);
    setShowDialog(false);
  };

  const handleExportRLE = () => {
    const rle = exportGridAsRLE(grid, patternName);
    const blob = new Blob([rle], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.rle`;
    link.click();
    URL.revokeObjectURL(url);
    setShowDialog(false);
  };

  const handleFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value);
  };

  const handlePatternNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatternName(e.target.value);
  };

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold"
      >
        Export Grid
      </Button>

      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Export Grid As
              </h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    onClick={() => setExportType('png')}
                    variant={exportType === 'png' ? 'default' : 'outline'}
                    className="flex-1"
                  >
                    PNG Image
                  </Button>
                  <Button
                    onClick={() => setExportType('rle')}
                    variant={exportType === 'rle' ? 'default' : 'outline'}
                    className="flex-1"
                  >
                    RLE Format
                  </Button>
                </div>

                {exportType === 'png' && (
                  <>
                    <div>
                      <Label htmlFor="filename" className="text-gray-900 dark:text-white">
                        Filename
                      </Label>
                      <Input
                        id="filename"
                        type="text"
                        value={filename}
                        onChange={handleFilenameChange}
                        placeholder="Enter filename"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        .png extension will be added automatically
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-900 dark:text-white">
                        Cell Size: {cellSize}px
                      </Label>
                      <Slider
                        value={[cellSize]}
                        onValueChange={(value) => setCellSize(value[0])}
                        min={5}
                        max={50}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={handleExportPNG}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        Export PNG
                      </Button>
                      <Button
                        onClick={() => setShowDialog(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}

                {exportType === 'rle' && (
                  <>
                    <div>
                      <Label htmlFor="pattern-name" className="text-gray-900 dark:text-white">
                        Pattern Name
                      </Label>
                      <Input
                        id="pattern-name"
                        type="text"
                        value={patternName}
                        onChange={handlePatternNameChange}
                        placeholder="Enter pattern name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="filename-rle" className="text-gray-900 dark:text-white">
                        Filename
                      </Label>
                      <Input
                        id="filename-rle"
                        type="text"
                        value={filename}
                        onChange={handleFilenameChange}
                        placeholder="Enter filename"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        .rle extension will be added automatically
                      </p>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={handleExportRLE}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        Export RLE
                      </Button>
                      <Button
                        onClick={() => setShowDialog(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default ExportControls;
