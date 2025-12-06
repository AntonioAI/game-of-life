import * as React from 'react';

interface GameCellProps {
  isAlive: boolean;
  onClick: () => void;
  size: number;
  deadCellColor: string;
  aliveCellColor: string;
  gridColor: string;
  gridThickness: number;
  showGridOverlay: boolean;
  gridLineOpacity: number;
}

function GameCell({
  isAlive,
  onClick,
  size,
  deadCellColor,
  aliveCellColor,
  gridColor,
  gridThickness,
  showGridOverlay,
  gridLineOpacity,
}: GameCellProps) {
  const getRgbFromHex = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const borderColor = showGridOverlay
    ? (() => {
        const { r, g, b } = getRgbFromHex(gridColor);
        return `rgba(${r}, ${g}, ${b}, ${gridLineOpacity})`;
      })()
    : 'transparent';

  return (
    <button
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        backgroundColor: isAlive ? aliveCellColor : deadCellColor,
        borderColor: borderColor,
        borderWidth: `${gridThickness}px`,
        borderStyle: 'solid',
      }}
      className="border transition-colors hover:opacity-80"
      title={isAlive ? 'Alive' : 'Dead'}
    />
  );
}

export default GameCell;
