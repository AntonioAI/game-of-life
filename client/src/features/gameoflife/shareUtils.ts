/**
 * Utilities for encoding and decoding grid states to shareable URLs
 */

type Grid = boolean[][];

export interface EncodedState {
  grid: Grid;
  generation: number;
  gridWidth: number;
  gridHeight: number;
}

/**
 * Encodes a grid state into a compact base64 string
 * Uses run-length encoding to compress consecutive cells
 */
export function encodeGridState(
  grid: Grid,
  generation: number = 0
): string {
  const height = grid.length;
  const width = grid[0]?.length || 0;
  
  // Flatten grid to binary string with run-length encoding
  let binaryStr = '';
  let currentValue = false;
  let count = 0;
  
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const cellValue = grid[row][col];
      
      if (cellValue === currentValue) {
        count++;
      } else {
        // Write previous run
        if (count > 0) {
          binaryStr += encodeRun(count, currentValue);
        }
        currentValue = cellValue;
        count = 1;
      }
    }
  }
  
  // Write final run
  if (count > 0) {
    binaryStr += encodeRun(count, currentValue);
  }
  
  // Create state object
  const state = {
    w: width,
    h: height,
    g: generation,
    d: binaryStr
  };
  
  // Convert to base64
  const jsonStr = JSON.stringify(state);
  return btoa(jsonStr);
}

/**
 * Encodes a run of cells (count + value)
 * Format: count as base-36 followed by 0 or 1
 */
function encodeRun(count: number, value: boolean): string {
  return count.toString(36) + (value ? '1' : '0');
}

/**
 * Decodes a base64 encoded grid state
 */
export function decodeGridState(encoded: string): EncodedState | null {
  try {
    const jsonStr = atob(encoded);
    const state = JSON.parse(jsonStr);
    
    const width = state.w;
    const height = state.h;
    const generation = state.g || 0;
    const data = state.d;
    
    // Decode run-length encoded data
    const grid: Grid = Array(height)
      .fill(null)
      .map(() => Array(width).fill(false));
    
    let cellIndex = 0;
    let i = 0;
    
     while (i < data.length && cellIndex < width * height) {
       // Read count (base-36 number)
       let countStr = '';
       while (i < data.length && data[i] !== '0' && data[i] !== '1') {
         countStr += data[i];
         i++;
       }
       
       if (i >= data.length || countStr === '') break;
       
       const count = parseInt(countStr, 36);
       const value = data[i] === '1';
       i++;
       
       // Fill cells
       for (let j = 0; j < count && cellIndex < width * height; j++) {
         const row = Math.floor(cellIndex / width);
         const col = cellIndex % width;
         grid[row][col] = value;
         cellIndex++;
       }
     }
    
    return {
      grid,
      generation,
      gridWidth: width,
      gridHeight: height
    };
  } catch (error) {
    console.error('Failed to decode grid state:', error);
    return null;
  }
}

/**
 * Generates a shareable URL with the encoded grid state
 */
export function generateShareUrl(grid: Grid, generation: number = 0): string {
  const encoded = encodeGridState(grid, generation);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?pattern=${encoded}`;
}

/**
 * Extracts the encoded pattern from the current URL
 */
export function getPatternFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('pattern');
}

/**
 * Copies text to clipboard
 */
export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  
  // Fallback for older browsers
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
      resolve();
    } catch (error) {
      document.body.removeChild(textarea);
      reject(error);
    }
  });
}
