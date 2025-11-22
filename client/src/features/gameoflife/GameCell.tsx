import * as React from 'react';

interface GameCellProps {
  isAlive: boolean;
  onClick: () => void;
  size: number;
  deadCellColor: string;
  aliveCellColor: string;
  gridColor: string;
  gridThickness: number;
}

function GameCell({
  isAlive,
  onClick,
  size,
  deadCellColor,
  aliveCellColor,
  gridColor,
  gridThickness,
}: GameCellProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        backgroundColor: isAlive ? aliveCellColor : deadCellColor,
        borderColor: gridColor,
        borderWidth: `${gridThickness}px`,
      }}
      className="border transition-colors hover:opacity-80"
      title={isAlive ? 'Alive' : 'Dead'}
    />
  );
}

export default GameCell;
