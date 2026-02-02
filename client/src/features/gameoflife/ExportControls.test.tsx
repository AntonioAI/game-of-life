import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExportControls from './ExportControls';

describe('ExportControls', () => {
  describe('component rendering', () => {
    it('should render export button', () => {
      // Arrange & Act
      render(
        <ExportControls
          grid={[[true]]}
          aliveCellColor="#000000"
          deadCellColor="#ffffff"
        />
      );

      // Assert
      expect(screen.getByText('Export Grid')).toBeInTheDocument();
    });
  });

  describe('export dialog', () => {
    it('should show export dialog when button clicked', () => {
      // Arrange
      render(
        <ExportControls
          grid={[[true]]}
          aliveCellColor="#000000"
          deadCellColor="#ffffff"
        />
      );

      // Act
      fireEvent.click(screen.getByText('Export Grid'));

      // Assert
      expect(screen.getByText('Export Grid As')).toBeInTheDocument();
    });

    it('should show PNG export option', () => {
      // Arrange
      render(
        <ExportControls
          grid={[[true]]}
          aliveCellColor="#000000"
          deadCellColor="#ffffff"
        />
      );
      fireEvent.click(screen.getByText('Export Grid'));

      // Act & Assert
      expect(screen.getByText('PNG Image')).toBeInTheDocument();
    });

    it('should show RLE export option', () => {
      // Arrange
      render(
        <ExportControls
          grid={[[true]]}
          aliveCellColor="#000000"
          deadCellColor="#ffffff"
        />
      );
      fireEvent.click(screen.getByText('Export Grid'));

      // Act & Assert
      expect(screen.getByText('RLE Format')).toBeInTheDocument();
    });

    it('should close dialog on cancel', () => {
      // Arrange
      render(
        <ExportControls
          grid={[[true]]}
          aliveCellColor="#000000"
          deadCellColor="#ffffff"
        />
      );
      fireEvent.click(screen.getByText('Export Grid'));

      // Act
      fireEvent.click(screen.getByText('Cancel'));

      // Assert
      expect(screen.queryByText('Export Grid As')).not.toBeInTheDocument();
    });
  });

  describe('PNG export', () => {
    it('should allow setting filename for PNG export', () => {
      // Arrange
      render(
        <ExportControls
          grid={[[true]]}
          aliveCellColor="#000000"
          deadCellColor="#ffffff"
        />
      );
      fireEvent.click(screen.getByText('Export Grid'));

      // Act
      const input = screen.getByPlaceholderText(/Enter filename/i);
      fireEvent.change(input, { target: { value: 'my-pattern' } });

      // Assert
      expect(input).toHaveValue('my-pattern');
    });

    it('should allow setting cell size for PNG export', () => {
      // Arrange
      render(
        <ExportControls
          grid={[[true]]}
          aliveCellColor="#000000"
          deadCellColor="#ffffff"
        />
      );
      fireEvent.click(screen.getByText('Export Grid'));

      // Act
      const slider = screen.getByRole('slider');

      // Assert
      expect(slider).toBeInTheDocument();
    });
  });

  describe('RLE export', () => {
    it('should allow setting pattern name for RLE export', () => {
      // Arrange
      render(
        <ExportControls
          grid={[[true]]}
          aliveCellColor="#000000"
          deadCellColor="#ffffff"
        />
      );
      fireEvent.click(screen.getByText('Export Grid'));

      // Act
      const input = screen.getByPlaceholderText(/Enter pattern name/i);
      fireEvent.change(input, { target: { value: 'My Pattern' } });

      // Assert
      expect(input).toHaveValue('My Pattern');
    });
  });
});
