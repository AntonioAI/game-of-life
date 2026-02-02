import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnimationModeSelector from './AnimationModeSelector';

describe('AnimationModeSelector', () => {
  it('should render with initial animation mode', () => {
    // Arrange
    const mockOnChange = vi.fn();

    // Act
    render(<AnimationModeSelector animationMode="none" onAnimationModeChange={mockOnChange} />);

    // Assert
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should display description for selected mode', () => {
    // Arrange
    const mockOnChange = vi.fn();

    // Act
    render(<AnimationModeSelector animationMode="fade" onAnimationModeChange={mockOnChange} />);

    // Assert
    expect(screen.getByText(/smooth fade transitions/i)).toBeInTheDocument();
  });

  it('should call onChange when mode is changed', async () => {
    // Arrange
    const mockOnChange = vi.fn();
    const user = userEvent.setup();
    render(<AnimationModeSelector animationMode="none" onAnimationModeChange={mockOnChange} />);

    // Act
    const trigger = screen.getByRole('combobox');
    await user.click(trigger);
    const fadeOption = await screen.findByRole('option', { name: /fade/i });
    await user.click(fadeOption);

    // Assert
    expect(mockOnChange).toHaveBeenCalledWith('fade');
  });

  it('should display correct description for heatmap mode', () => {
    // Arrange
    const mockOnChange = vi.fn();

    // Act
    render(<AnimationModeSelector animationMode="heatmap" onAnimationModeChange={mockOnChange} />);

    // Assert
    expect(screen.getByText(/age\/activity/i)).toBeInTheDocument();
  });

  it('should display correct description for none mode', () => {
    // Arrange
    const mockOnChange = vi.fn();

    // Act
    render(<AnimationModeSelector animationMode="none" onAnimationModeChange={mockOnChange} />);

    // Assert
    expect(screen.getByText(/instant cell state changes/i)).toBeInTheDocument();
  });
});
