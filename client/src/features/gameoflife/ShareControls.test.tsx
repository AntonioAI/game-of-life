import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShareControls from './ShareControls';

// Mock the shareUtils module
vi.mock('./shareUtils', () => ({
  generateShareUrl: vi.fn((grid: boolean[][], generation: number) => {
    return `https://example.com?pattern=encoded_${generation}`;
  }),
  copyToClipboard: vi.fn(() => Promise.resolve())
}));

describe('ShareControls', () => {
  const mockGrid = [
    [true, false],
    [false, true]
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render share button', () => {
    // Arrange & Act
    render(<ShareControls grid={mockGrid} generation={5} />);

    // Assert
    expect(screen.getByText('Share Pattern')).toBeInTheDocument();
  });

  it('should open share dialog when button is clicked', () => {
    // Arrange
    render(<ShareControls grid={mockGrid} generation={5} />);
    const shareButton = screen.getByText('Share Pattern');

    // Act
    fireEvent.click(shareButton);

    // Assert
    expect(screen.getByText('Share Your Pattern')).toBeInTheDocument();
    expect(screen.getByLabelText('Shareable URL')).toBeInTheDocument();
  });

  it('should display generated URL in dialog', () => {
    // Arrange
    render(<ShareControls grid={mockGrid} generation={10} />);
    const shareButton = screen.getByText('Share Pattern');

    // Act
    fireEvent.click(shareButton);

    // Assert
    const urlInput = screen.getByLabelText('Shareable URL') as HTMLInputElement;
    expect(urlInput.value).toContain('encoded_10');
  });

  it('should show generation in description text', () => {
    // Arrange
    render(<ShareControls grid={mockGrid} generation={42} />);
    const shareButton = screen.getByText('Share Pattern');

    // Act
    fireEvent.click(shareButton);

    // Assert
    expect(screen.getByText(/generation 42/i)).toBeInTheDocument();
  });

  it('should copy URL to clipboard when copy button is clicked', async () => {
    // Arrange
    const { copyToClipboard } = await import('./shareUtils');
    render(<ShareControls grid={mockGrid} generation={5} />);
    
    fireEvent.click(screen.getByText('Share Pattern'));
    const copyButton = screen.getByText('Copy to Clipboard');

    // Act
    fireEvent.click(copyButton);

    // Assert
    await waitFor(() => {
      expect(copyToClipboard).toHaveBeenCalled();
    });
  });

  it('should show copied confirmation after copying', async () => {
    // Arrange
    render(<ShareControls grid={mockGrid} generation={5} />);
    
    fireEvent.click(screen.getByText('Share Pattern'));
    const copyButton = screen.getByText('Copy to Clipboard');

    // Act
    fireEvent.click(copyButton);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('should close dialog when close button is clicked', () => {
    // Arrange
    render(<ShareControls grid={mockGrid} generation={5} />);
    
    fireEvent.click(screen.getByText('Share Pattern'));
    const closeButton = screen.getByText('Close');

    // Act
    fireEvent.click(closeButton);

    // Assert
    expect(screen.queryByText('Share Your Pattern')).not.toBeInTheDocument();
  });

  it('should select URL text when input is clicked', () => {
    // Arrange
    render(<ShareControls grid={mockGrid} generation={5} />);
    
    fireEvent.click(screen.getByText('Share Pattern'));
    const urlInput = screen.getByLabelText('Shareable URL') as HTMLInputElement;
    const selectSpy = vi.spyOn(urlInput, 'select');

    // Act
    fireEvent.click(urlInput);

    // Assert
    expect(selectSpy).toHaveBeenCalled();
  });

  it('should handle different grid sizes', () => {
    // Arrange
    const largeGrid = Array(10).fill(null).map(() => Array(10).fill(false));
    render(<ShareControls grid={largeGrid} generation={100} />);

    // Act
    fireEvent.click(screen.getByText('Share Pattern'));

    // Assert
    const urlInput = screen.getByLabelText('Shareable URL') as HTMLInputElement;
    expect(urlInput.value).toBeTruthy();
  });
});
