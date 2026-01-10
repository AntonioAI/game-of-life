export type AnimationMode = 'none' | 'fade' | 'heatmap';

export interface AnimationModeOption {
  value: AnimationMode;
  label: string;
  description: string;
}

export const animationModes: AnimationModeOption[] = [
  {
    value: 'none',
    label: 'No Animation',
    description: 'Instant cell state changes with no transition effects',
  },
  {
    value: 'fade',
    label: 'Fade',
    description: 'Smooth fade transitions when cells change state',
  },
  {
    value: 'heatmap',
    label: 'Heat Map',
    description: 'Cells show age/activity with color intensity gradients',
  },
];
