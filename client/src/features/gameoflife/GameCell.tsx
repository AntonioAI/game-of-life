import * as React from 'react';
import type { AnimationMode } from './animationModes';

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
  animationMode: AnimationMode;
  cellAge: number;
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
  animationMode,
  cellAge,
}: GameCellProps) {
  function getRgbFromHex(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  function getCellColor() {
    if (!isAlive) {
      return deadCellColor;
    }

    if (animationMode === 'heatmap') {
      const maxAge = 20;
      const normalizedAge = Math.min(cellAge / maxAge, 1);
      
      const aliveRgb = getRgbFromHex(aliveCellColor);
      const r = Math.floor(aliveRgb.r + (255 - aliveRgb.r) * normalizedAge);
      const g = Math.floor(aliveRgb.g * (1 - normalizedAge * 0.5));
      const b = Math.floor(aliveRgb.b * (1 - normalizedAge * 0.5));
      
      return `rgb(${r}, ${g}, ${b})`;
    }

    return aliveCellColor;
  }

  const borderColor = showGridOverlay
    ? (() => {
        const { r, g, b } = getRgbFromHex(gridColor);
        return `rgba(${r}, ${g}, ${b}, ${gridLineOpacity})`;
      })()
    : 'transparent';

  const transitionClass = animationMode === 'fade' ? 'transition-colors duration-300' : '';

  return (
    <button
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        backgroundColor: getCellColor(),
        borderColor: borderColor,
        borderWidth: `${gridThickness}px`,
        borderStyle: 'solid',
      }}
      className={`border hover:opacity-80 ${transitionClass}`}
      title={isAlive ? `Alive (Age: ${cellAge})` : 'Dead'}
    />
  );
}

export default GameCell;
