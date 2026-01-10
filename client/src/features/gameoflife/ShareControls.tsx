import * as React from 'react';
import { Button } from '../../components/ui/button';
import { Dialog } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { generateShareUrl, copyToClipboard } from './shareUtils';

interface ShareControlsProps {
  grid: boolean[][];
  generation: number;
}

function ShareControls({ grid, generation }: ShareControlsProps) {
  const [showShareDialog, setShowShareDialog] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    const url = generateShareUrl(grid, generation);
    setShareUrl(url);
    setShowShareDialog(true);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleShare}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold"
      >
        Share Pattern
      </Button>

      {showShareDialog && (
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Share Your Pattern
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="share-url" className="text-gray-900 dark:text-white">
                    Shareable URL
                  </Label>
                  <Input
                    id="share-url"
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="mt-1"
                    onClick={(e) => e.currentTarget.select()}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Share this URL with others to let them view and interact with your current pattern at generation {generation}.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleCopy}
                    className={`flex-1 ${
                      copied
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-orange-600 hover:bg-orange-700'
                    } text-white`}
                  >
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </Button>
                  <Button
                    onClick={() => setShowShareDialog(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default ShareControls;
