import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names', () => {
      // Arrange
      const class1 = 'text-red-500';
      const class2 = 'bg-blue-500';

      // Act
      const result = cn(class1, class2);

      // Assert
      expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('should handle conditional classes', () => {
      // Arrange
      const baseClass = 'text-base';
      const conditionalClass = false && 'hidden';

      // Act
      const result = cn(baseClass, conditionalClass);

      // Assert
      expect(result).toBe('text-base');
    });

    it('should merge tailwind classes correctly', () => {
      // Arrange
      const defaultPadding = 'p-4';
      const overridePadding = 'p-8';

      // Act
      const result = cn(defaultPadding, overridePadding);

      // Assert
      expect(result).toBe('p-8');
    });

    it('should handle empty input', () => {
      // Arrange & Act
      const result = cn();

      // Assert
      expect(result).toBe('');
    });

    it('should handle array of classes', () => {
      // Arrange
      const classes = ['text-sm', 'font-bold', 'text-blue-500'];

      // Act
      const result = cn(classes);

      // Assert
      expect(result).toBe('text-sm font-bold text-blue-500');
    });
  });
});
