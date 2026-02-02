import { describe, it, expect } from 'vitest';
import { animationModes, type AnimationMode } from './animationModes';

describe('animationModes', () => {
  it('should contain all animation mode options', () => {
    // Arrange & Act
    const modes = animationModes;

    // Assert
    expect(modes).toHaveLength(3);
    expect(modes.map(m => m.value)).toEqual(['none', 'fade', 'heatmap']);
  });

  it('should have none mode as first option', () => {
    // Arrange & Act
    const firstMode = animationModes[0];

    // Assert
    expect(firstMode.value).toBe('none');
    expect(firstMode.label).toBe('No Animation');
  });

  it('should have fade mode with correct properties', () => {
    // Arrange & Act
    const fadeMode = animationModes.find(m => m.value === 'fade');

    // Assert
    expect(fadeMode).toBeDefined();
    expect(fadeMode?.label).toBe('Fade');
    expect(fadeMode?.description).toContain('fade');
  });

  it('should have heatmap mode with correct properties', () => {
    // Arrange & Act
    const heatmapMode = animationModes.find(m => m.value === 'heatmap');

    // Assert
    expect(heatmapMode).toBeDefined();
    expect(heatmapMode?.label).toBe('Heat Map');
    expect(heatmapMode?.description).toContain('age');
  });

  it('should have descriptions for all modes', () => {
    // Arrange & Act & Assert
    animationModes.forEach(mode => {
      expect(mode.description).toBeTruthy();
      expect(mode.description.length).toBeGreaterThan(0);
    });
  });

  it('should have unique values for each mode', () => {
    // Arrange & Act
    const values = animationModes.map(m => m.value);
    const uniqueValues = new Set(values);

    // Assert
    expect(uniqueValues.size).toBe(values.length);
  });
});
