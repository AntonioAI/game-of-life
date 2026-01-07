import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameCell from './GameCell';

describe('GameCell', () => {
  describe('rendering', () => {
    it('should render a cell', () => {
      // Arrange
      const onToggle = vi.fn();

      // Act
      render(
        <GameCell
          isAlive={false}
          onClick={onToggle}
          size={20}
          deadCellColor="#ffffff"
          aliveCellColor="#000000"
          gridColor="#cccccc"
          gridThickness={1}
          showGridOverlay={true}
          gridLineOpacity={0.5}
        />
      );

      // Assert
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should apply dead cell color when not alive', () => {
      // Arrange
      const deadColor = '#ffffff';
      const onToggle = vi.fn();

      // Act
      render(
        <GameCell
          isAlive={false}
          onClick={onToggle}
          size={20}
          deadCellColor={deadColor}
          aliveCellColor="#000000"
          gridColor="#cccccc"
          gridThickness={1}
          showGridOverlay={true}
          gridLineOpacity={0.5}
        />
      );

      // Assert
      const cell = screen.getByRole('button');
      expect(cell).toHaveStyle({ backgroundColor: deadColor });
    });

    it('should apply alive cell color when alive', () => {
      // Arrange
      const aliveColor = '#000000';
      const onToggle = vi.fn();

      // Act
      render(
        <GameCell
          isAlive={true}
          onClick={onToggle}
          size={20}
          deadCellColor="#ffffff"
          aliveCellColor={aliveColor}
          gridColor="#cccccc"
          gridThickness={1}
          showGridOverlay={true}
          gridLineOpacity={0.5}
        />
      );

      // Assert
      const cell = screen.getByRole('button');
      expect(cell).toHaveStyle({ backgroundColor: aliveColor });
    });

    it('should set cell size correctly', () => {
      // Arrange
      const size = 30;
      const onToggle = vi.fn();

      // Act
      render(
        <GameCell
          isAlive={false}
          onClick={onToggle}
          size={size}
          deadCellColor="#ffffff"
          aliveCellColor="#000000"
          gridColor="#cccccc"
          gridThickness={1}
          showGridOverlay={true}
          gridLineOpacity={0.5}
        />
      );

      // Assert
      const cell = screen.getByRole('button');
      expect(cell).toHaveStyle({ width: `${size}px`, height: `${size}px` });
    });

    it('should show title attribute based on alive state', () => {
      // Arrange
      const onToggle = vi.fn();

      // Act
      render(
        <GameCell
          isAlive={true}
          onClick={onToggle}
          size={20}
          deadCellColor="#ffffff"
          aliveCellColor="#000000"
          gridColor="#cccccc"
          gridThickness={1}
          showGridOverlay={true}
          gridLineOpacity={0.5}
        />
      );

      // Assert
      const cell = screen.getByRole('button');
      expect(cell).toHaveAttribute('title', 'Alive');
    });
  });

  describe('interactions', () => {
    it('should call onClick when clicked', async () => {
      // Arrange
      const user = userEvent.setup();
      const onToggle = vi.fn();

      // Act
      render(
        <GameCell
          isAlive={false}
          onClick={onToggle}
          size={20}
          deadCellColor="#ffffff"
          aliveCellColor="#000000"
          gridColor="#cccccc"
          gridThickness={1}
          showGridOverlay={true}
          gridLineOpacity={0.5}
        />
      );
      await user.click(screen.getByRole('button'));

      // Assert
      expect(onToggle).toHaveBeenCalledOnce();
    });
  });
});
