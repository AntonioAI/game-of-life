import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Statistics from './Statistics';

describe('Statistics', () => {
  describe('rendering', () => {
    it('should display generation count', () => {
      // Arrange
      const generation = 42;

      // Act
      render(<Statistics generation={generation} liveCells={10} growthRate={5} />);

      // Assert
      expect(screen.getByText('Generation')).toBeInTheDocument();
      expect(screen.getByText(generation.toString())).toBeInTheDocument();
    });

    it('should display live cells count', () => {
      // Arrange
      const liveCells = 100;

      // Act
      render(<Statistics generation={1} liveCells={liveCells} growthRate={0} />);

      // Assert
      expect(screen.getByText('Live Cells')).toBeInTheDocument();
      expect(screen.getByText(liveCells.toString())).toBeInTheDocument();
    });

    it('should display growth rate label', () => {
      // Arrange & Act
      render(<Statistics generation={1} liveCells={10} growthRate={5} />);

      // Assert
      expect(screen.getByText('Growth Rate')).toBeInTheDocument();
    });

    it('should display positive growth rate with plus sign', () => {
      // Arrange
      const growthRate = 15;

      // Act
      render(<Statistics generation={1} liveCells={25} growthRate={growthRate} />);

      // Assert
      expect(screen.getByText(`+${growthRate}`)).toBeInTheDocument();
    });

    it('should display negative growth rate without plus sign', () => {
      // Arrange
      const growthRate = -10;

      // Act
      render(<Statistics generation={1} liveCells={5} growthRate={growthRate} />);

      // Assert
      expect(screen.getByText(growthRate.toString())).toBeInTheDocument();
    });

    it('should display zero growth rate without sign', () => {
      // Arrange
      const growthRate = 0;

      // Act
      render(<Statistics generation={1} liveCells={10} growthRate={growthRate} />);

      // Assert
      expect(screen.getByText(growthRate.toString())).toBeInTheDocument();
    });

    it('should display dash when growth rate is null', () => {
      // Arrange & Act
      render(<Statistics generation={0} liveCells={10} growthRate={null} />);

      // Assert
      expect(screen.getByText('—')).toBeInTheDocument();
    });
  });

  describe('generation zero', () => {
    it('should handle generation 0 correctly', () => {
      // Arrange & Act
      render(<Statistics generation={0} liveCells={5} growthRate={null} />);

      // Assert
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle zero live cells', () => {
      // Arrange & Act
      render(<Statistics generation={5} liveCells={0} growthRate={-10} />);

      // Assert
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should handle large generation numbers', () => {
      // Arrange
      const largeGeneration = 999999;

      // Act
      render(<Statistics generation={largeGeneration} liveCells={50} growthRate={2} />);

      // Assert
      expect(screen.getByText(largeGeneration.toString())).toBeInTheDocument();
    });
  });
});
