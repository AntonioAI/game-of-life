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
 * Encodes a grid state into a compact base64url string
 * Uses run-length encoding to compress consecutive cells
 *
 * Run format (unambiguous with delimiter):
 *   <value><countBase36>|
 * Example:
 *   1a|0f|  => 10 trues, 15 falses
 */
export function encodeGridState(
  grid: Grid,
  generation: number = 0
): string {
  const height = grid.length;
  const width = grid[0]?.length || 0;

  const state = {
    w: width,
    h: height,
    g: generation,
    d: "",
  };

  if (height === 0 || width === 0) {
    return base64UrlEncode(JSON.stringify(state));
  }

  // Flatten grid row-major and RLE
  let encodedRuns = "";
  let currentValue = grid[0][0];
  let count = 1;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (row === 0 && col === 0) continue;

      const cellValue = grid[row][col];
      if (cellValue === currentValue) {
        count++;
      } else {
        encodedRuns += encodeRun(count, currentValue);
        currentValue = cellValue;
        count = 1;
      }
    }
  }

  encodedRuns += encodeRun(count, currentValue);
  state.d = encodedRuns;

  return base64UrlEncode(JSON.stringify(state));
}

/**
 * Encodes a run of cells
 * Format: <value><countBase36>|
 */
function encodeRun(count: number, value: boolean): string {
  return (value ? "1" : "0") + count.toString(36) + "|";
}

/**
 * Decodes a base64url encoded grid state
 */
export function decodeGridState(encoded: string): EncodedState | null {
  try {
    const jsonStr = base64UrlDecode(encoded);
    const state = JSON.parse(jsonStr);

    const width: number = state.w;
    const height: number = state.h;
    const generation: number = state.g ?? 0;
    const data: string = state.d ?? "";

    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 0 || height < 0) {
      return null;
    }

    const grid: Grid = Array.from({ length: height }, () => Array(width).fill(false));

    const totalCells = width * height;
    let cellIndex = 0;

    const runs = data.split("|").filter(Boolean);

    for (const run of runs) {
      if (cellIndex >= totalCells) break;

      const valueChar = run[0];
      const countStr = run.slice(1);

      if ((valueChar !== "0" && valueChar !== "1") || countStr.length === 0) {
        return null;
      }

      const value = valueChar === "1";
      const count = parseInt(countStr, 36);

      if (!Number.isFinite(count) || count <= 0) {
        return null;
      }

      for (let j = 0; j < count && cellIndex < totalCells; j++) {
        const row = Math.floor(cellIndex / width);
        const col = cellIndex % width;
        grid[row][col] = value;
        cellIndex++;
      }
    }

    // If we didn't fill exactly, something went wrong
    if (cellIndex !== totalCells) {
      return null;
    }

    return { grid, generation, gridWidth: width, gridHeight: height };
  } catch (error) {
    console.error("Failed to decode grid state:", error);
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
  return params.get("pattern");
}

/**
 * base64url helpers (URL safe: - and _ instead of + and /, no padding)
 */
function base64UrlEncode(str: string): string {
  const b64 = btoa(str);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(b64url: string): string {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "===".slice((b64.length + 3) % 4);
  return atob(padded);
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
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand("copy");
      document.body.removeChild(textarea);
      resolve();
    } catch (error) {
      document.body.removeChild(textarea);
      reject(error);
    }
  });
}
