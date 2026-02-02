import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameCell from './GameCell';

describe('GameCell', () => {
  it('should render a button', () => {
    // Arrange
    const mockOnClick = vi.fn();

    // Act
    render(
      <GameCell
        isAlive={false}
        onClick={mockOnClick}
        size={16}
        deadCellColor="#f3f4f6"
        aliveCellColor="#06b6d4"
        gridColor="#93c5fd"
        gridThickness={1}
        showGridOverlay={true}
        gridLineOpacity={0.5}
        animationMode="none"
        cellAge={0}
      />
    );

    // Assert
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    // Arrange
    const mockOnClick = vi.fn();
    const user = userEvent.setup();
    render(
      <GameCell
        isAlive={false}
        onClick={mockOnClick}
        size={16}
        deadCellColor="#f3f4f6"
        aliveCellColor="#06b6d4"
        gridColor="#93c5fd"
        gridThickness={1}
        showGridOverlay={true}
        gridLineOpacity={0.5}
        animationMode="none"
        cellAge={0}
      />
    );

    // Act
    await user.click(screen.getByRole('button'));

    // Assert
    expect(mockOnClick).toHaveBeenCalledOnce();
  });

  it('should apply correct background color when dead', () => {
    // Arrange
    const mockOnClick = vi.fn();

    // Act
    const { container } = render(
      <GameCell
        isAlive={false}
        onClick={mockOnClick}
        size={16}
        deadCellColor="#f3f4f6"
        aliveCellColor="#06b6d4"
        gridColor="#93c5fd"
        gridThickness={1}
        showGridOverlay={true}
        gridLineOpacity={0.5}
        animationMode="none"
        cellAge={0}
      />
    );

    // Assert
    const button = container.querySelector('button');
    expect(button).toHaveStyle({ backgroundColor: '#f3f4f6' });
  });

  it('should apply correct background color when alive with no animation', () => {
    // Arrange
    const mockOnClick = vi.fn();

    // Act
    const { container } = render(
      <GameCell
        isAlive={true}
        onClick={mockOnClick}
        size={16}
        deadCellColor="#f3f4f6"
        aliveCellColor="#06b6d4"
        gridColor="#93c5fd"
        gridThickness={1}
        showGridOverlay={true}
        gridLineOpacity={0.5}
        animationMode="none"
        cellAge={5}
      />
    );

    // Assert
    const button = container.querySelector('button');
    expect(button).toHaveStyle({ backgroundColor: '#06b6d4' });
  });

  it('should apply correct size', () => {
    // Arrange
    const mockOnClick = vi.fn();

    // Act
    const { container } = render(
      <GameCell
        isAlive={false}
        onClick={mockOnClick}
        size={32}
        deadCellColor="#f3f4f6"
        aliveCellColor="#06b6d4"
        gridColor="#93c5fd"
        gridThickness={1}
        showGridOverlay={true}
        gridLineOpacity={0.5}
        animationMode="none"
        cellAge={0}
      />
    );

    // Assert
    const button = container.querySelector('button');
    expect(button).toHaveStyle({ width: '32px', height: '32px' });
  });

  it('should apply fade animation class when fade mode is enabled', () => {
    // Arrange
    const mockOnClick = vi.fn();

    // Act
    const { container } = render(
      <GameCell
        isAlive={true}
        onClick={mockOnClick}
        size={16}
        deadCellColor="#f3f4f6"
        aliveCellColor="#06b6d4"
        gridColor="#93c5fd"
        gridThickness={1}
        showGridOverlay={true}
        gridLineOpacity={0.5}
        animationMode="fade"
        cellAge={0}
      />
    );

    // Assert
    const button = container.querySelector('button');
    expect(button?.className).toContain('transition-colors');
  });

  it('should not apply fade animation class when mode is none', () => {
    // Arrange
    const mockOnClick = vi.fn();

    // Act
    const { container } = render(
      <GameCell
        isAlive={true}
        onClick={mockOnClick}
        size={16}
        deadCellColor="#f3f4f6"
        aliveCellColor="#06b6d4"
        gridColor="#93c5fd"
        gridThickness={1}
        showGridOverlay={true}
        gridLineOpacity={0.5}
        animationMode="none"
        cellAge={0}
      />
    );

    // Assert
    const button = container.querySelector('button');
    expect(button?.className).not.toContain('transition-colors');
  });

  it('should use heatmap colors based on cell age', () => {
    // Arrange
    const mockOnClick = vi.fn();

    // Act
    const { container } = render(
      <GameCell
        isAlive={true}
        onClick={mockOnClick}
        size={16}
        deadCellColor="#f3f4f6"
        aliveCellColor="#06b6d4"
        gridColor="#93c5fd"
        gridThickness={1}
        showGridOverlay={true}
        gridLineOpacity={0.5}
        animationMode="heatmap"
        cellAge={10}
      />
    );

    // Assert
    const button = container.querySelector('button');
    const bgColor = button?.style.backgroundColor;
    expect(bgColor).toBeTruthy();
    expect(bgColor).toContain('rgb');
  });

  it('should show cell age in title when alive', () => {
    // Arrange
    const mockOnClick = vi.fn();

    // Act
    render(
      <GameCell
        isAlive={true}
        onClick={mockOnClick}
        size={16}
        deadCellColor="#f3f4f6"
        aliveCellColor="#06b6d4"
        gridColor="#93c5fd"
        gridThickness={1}
        showGridOverlay={true}
        gridLineOpacity={0.5}
        animationMode="none"
        cellAge={7}
      />
    );

    // Assert
    const button = screen.getByRole('button');
    expect(button.title).toContain('Age: 7');
  });

  it('should show Dead in title when not alive', () => {
    // Arrange
    const mockOnClick = vi.fn();

    // Act
    render(
      <GameCell
        isAlive={false}
        onClick={mockOnClick}
        size={16}
        deadCellColor="#f3f4f6"
        aliveCellColor="#06b6d4"
        gridColor="#93c5fd"
        gridThickness={1}
        showGridOverlay={true}
        gridLineOpacity={0.5}
        animationMode="none"
        cellAge={0}
      />
    );

    // Assert
    const button = screen.getByRole('button');
    expect(button.title).toBe('Dead');
  });
});
