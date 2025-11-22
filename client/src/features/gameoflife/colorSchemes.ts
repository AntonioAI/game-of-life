export interface ColorScheme {
  name: string;
  gridColor: string;
  deadCellColor: string;
  aliveCellColor: string;
}

export const colorSchemes: ColorScheme[] = [
  {
    name: 'Light Mode',
    gridColor: '#93c5fd',
    deadCellColor: '#f3f4f6',
    aliveCellColor: '#06b6d4',
  },
  {
    name: 'Dark Mode',
    gridColor: '#1e293b',
    deadCellColor: '#1a1a2e',
    aliveCellColor: '#00d4ff',
  },
  {
    name: 'High Contrast',
    gridColor: '#000000',
    deadCellColor: '#ffffff',
    aliveCellColor: '#ffff00',
  },
  {
    name: 'Neon',
    gridColor: '#00ff00',
    deadCellColor: '#0a0a0a',
    aliveCellColor: '#ff00ff',
  },
  {
    name: 'Ocean',
    gridColor: '#0369a1',
    deadCellColor: '#e0f2fe',
    aliveCellColor: '#0ea5e9',
  },
  {
    name: 'Forest',
    gridColor: '#15803d',
    deadCellColor: '#dcfce7',
    aliveCellColor: '#22c55e',
  },
  {
    name: 'Sunset',
    gridColor: '#ea580c',
    deadCellColor: '#fef3c7',
    aliveCellColor: '#f97316',
  },
  {
    name: 'Purple Dream',
    gridColor: '#7c3aed',
    deadCellColor: '#f3e8ff',
    aliveCellColor: '#d946ef',
  },
];
