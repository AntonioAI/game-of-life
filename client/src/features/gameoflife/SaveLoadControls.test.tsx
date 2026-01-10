import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SaveLoadControls from './SaveLoadControls';

describe('SaveLoadControls', () => {
  describe('component rendering', () => {
    it('should render save button', () => {
      // Arrange & Act
      render(
        <SaveLoadControls
          grid={[[true]]}
          generation={0}
          onLoad={vi.fn()}
        />
      );

      // Assert
      expect(screen.getByText('Save Current State')).toBeInTheDocument();
    });

    it('should render load button', () => {
      // Arrange & Act
      render(
        <SaveLoadControls
          grid={[[true]]}
          generation={0}
          onLoad={vi.fn()}
        />
      );

      // Assert
      expect(screen.getByText('Load Saved State')).toBeInTheDocument();
    });
  });

  describe('save functionality', () => {
    it('should show save dialog when save button clicked', () => {
      // Arrange
      render(
        <SaveLoadControls
          grid={[[true]]}
          generation={0}
          onLoad={vi.fn()}
        />
      );

      // Act
      fireEvent.click(screen.getByText('Save Current State'));

      // Assert
      expect(screen.getByText('Save Grid State')).toBeInTheDocument();
    });

    it('should close save dialog when cancel clicked', () => {
      // Arrange
      render(
        <SaveLoadControls
          grid={[[true]]}
          generation={0}
          onLoad={vi.fn()}
        />
      );
      fireEvent.click(screen.getByText('Save Current State'));

      // Act
      fireEvent.click(screen.getByText('Cancel'));

      // Assert
      expect(screen.queryByText('Save Grid State')).not.toBeInTheDocument();
    });
  });

  describe('load functionality', () => {
    it('should show load dialog when load button clicked', () => {
      // Arrange
      localStorage.setItem('game-of-life-state-test', JSON.stringify({
        name: 'test',
        grid: [[true]],
        generation: 5,
        timestamp: Date.now(),
      }));
      render(
        <SaveLoadControls
          grid={[[true]]}
          generation={0}
          onLoad={vi.fn()}
        />
      );

      // Act
      fireEvent.click(screen.getByText('Load Saved State'));

      // Assert
      expect(screen.getByText('Load Grid State')).toBeInTheDocument();
    });

    it('should call onLoad when state is loaded', () => {
      // Arrange
      const onLoad = vi.fn();
      const testGrid = [[true, false], [false, true]];
      const testGeneration = 10;
      localStorage.setItem('game-of-life-state-test', JSON.stringify({
        name: 'test',
        grid: testGrid,
        generation: testGeneration,
        timestamp: Date.now(),
      }));
      render(
        <SaveLoadControls
          grid={[[true]]}
          generation={0}
          onLoad={onLoad}
        />
      );
      fireEvent.click(screen.getByText('Load Saved State'));

      // Act
      const loadButton = screen.getAllByRole('button').find(btn => 
        btn.textContent === 'Load'
      );
      if (loadButton) {
        fireEvent.click(loadButton);
      }

      // Assert
      expect(onLoad).toHaveBeenCalledWith(testGrid, testGeneration);
    });
  });

  describe('empty state', () => {
    it('should show empty state message when no saved states exist', () => {
      // Arrange
      localStorage.clear();
      render(
        <SaveLoadControls
          grid={[[true]]}
          generation={0}
          onLoad={vi.fn()}
        />
      );

      // Act
      fireEvent.click(screen.getByText('Load Saved State'));

      // Assert
      expect(screen.getByText(/No saved states yet/i)).toBeInTheDocument();
    });
  });
});
