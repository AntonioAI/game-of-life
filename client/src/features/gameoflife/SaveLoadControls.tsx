import * as React from 'react';
import { Button } from '../../components/ui/button';
import { Dialog } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { saveGridState, getSavedStates, loadGridState, deleteSavedState } from './gridStateManager';

interface SaveLoadControlsProps {
  grid: boolean[][];
  generation: number;
  onLoad: (grid: boolean[][], generation: number) => void;
}

function SaveLoadControls({ grid, generation, onLoad }: SaveLoadControlsProps) {
  const [showSaveDialog, setShowSaveDialog] = React.useState(false);
  const [showLoadDialog, setShowLoadDialog] = React.useState(false);
  const [saveName, setSaveName] = React.useState('');
  const [savedStates, setSavedStates] = React.useState(getSavedStates());

  const handleSave = () => {
    if (saveName.trim()) {
      saveGridState(saveName.trim(), grid, generation);
      setSaveName('');
      setShowSaveDialog(false);
      setSavedStates(getSavedStates());
    }
  };

  const handleLoad = (name: string) => {
    const state = loadGridState(name);
    if (state) {
      onLoad(state.grid, state.generation);
      setShowLoadDialog(false);
    }
  };

  const handleDelete = (name: string) => {
    deleteSavedState(name);
    setSavedStates(getSavedStates());
  };

  const handleOpenLoadDialog = () => {
    setSavedStates(getSavedStates());
    setShowLoadDialog(true);
  };

  const handleSaveNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveName(e.target.value);
  };

  return (
    <div className="flex gap-3">
      <Button
        onClick={() => setShowSaveDialog(true)}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
      >
        Save Current State
      </Button>
      <Button
        onClick={handleOpenLoadDialog}
        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
      >
        Load Saved State
      </Button>

      {showSaveDialog && (
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Save Grid State
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="save-name" className="text-gray-900 dark:text-white">
                    State Name
                  </Label>
                  <Input
                    id="save-name"
                    type="text"
                    value={saveName}
                    onChange={handleSaveNameChange}
                    placeholder="Enter a name for this state"
                    className="mt-1"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Current generation: {generation}
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    disabled={!saveName.trim()}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setShowSaveDialog(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {showLoadDialog && (
        <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-auto">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Load Grid State
              </h2>
              {savedStates.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No saved states yet. Save your current grid to load it later!
                </p>
              ) : (
                <div className="space-y-2">
                  {savedStates.map((state) => (
                    <div
                      key={state.name}
                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {state.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Generation: {state.generation} | {new Date(state.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleLoad(state.name)}
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Load
                        </Button>
                        <Button
                          onClick={() => handleDelete(state.name)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4">
                <Button
                  onClick={() => setShowLoadDialog(false)}
                  variant="outline"
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default SaveLoadControls;
