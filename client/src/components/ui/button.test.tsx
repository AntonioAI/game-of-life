import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  describe('rendering', () => {
    it('should render button with text', () => {
      // Arrange
      const buttonText = 'Click me';

      // Act
      render(<Button>{buttonText}</Button>);

      // Assert
      expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument();
    });

    it('should render as child component when asChild is true', () => {
      // Arrange
      const linkText = 'Link Button';

      // Act
      render(
        <Button asChild>
          <a href="/test">{linkText}</a>
        </Button>
      );

      // Assert
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('should apply default variant', () => {
      // Arrange & Act
      render(<Button>Default</Button>);

      // Assert
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary');
    });

    it('should apply destructive variant', () => {
      // Arrange & Act
      render(<Button variant="destructive">Delete</Button>);

      // Assert
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-destructive');
    });

    it('should apply outline variant', () => {
      // Arrange & Act
      render(<Button variant="outline">Outline</Button>);

      // Assert
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border-input');
    });

    it('should apply ghost variant', () => {
      // Arrange & Act
      render(<Button variant="ghost">Ghost</Button>);

      // Assert
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-accent');
    });
  });

  describe('sizes', () => {
    it('should apply default size', () => {
      // Arrange & Act
      render(<Button>Default Size</Button>);

      // Assert
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9');
      expect(button).toHaveClass('px-4');
      expect(button).toHaveClass('py-2');
    });

    it('should apply small size', () => {
      // Arrange & Act
      render(<Button size="sm">Small</Button>);

      // Assert
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-8');
    });

    it('should apply large size', () => {
      // Arrange & Act
      render(<Button size="lg">Large</Button>);

      // Assert
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10');
    });

    it('should apply icon size', () => {
      // Arrange & Act
      render(<Button size="icon">+</Button>);

      // Assert
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9');
      expect(button).toHaveClass('w-9');
    });
  });

  describe('interactions', () => {
    it('should call onClick when clicked', async () => {
      // Arrange
      const user = userEvent.setup();
      const handleClick = vi.fn();

      // Act
      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByRole('button'));

      // Assert
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should not call onClick when disabled', async () => {
      // Arrange
      const user = userEvent.setup();
      const handleClick = vi.fn();

      // Act
      render(<Button onClick={handleClick} disabled>Click me</Button>);
      await user.click(screen.getByRole('button'));

      // Assert
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    it('should apply disabled styles when disabled', () => {
      // Arrange & Act
      render(<Button disabled>Disabled</Button>);

      // Assert
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:pointer-events-none');
    });
  });

  describe('custom className', () => {
    it('should accept custom className', () => {
      // Arrange
      const customClass = 'custom-button-class';

      // Act
      render(<Button className={customClass}>Custom</Button>);

      // Assert
      const button = screen.getByRole('button');
      expect(button).toHaveClass(customClass);
    });
  });
});
