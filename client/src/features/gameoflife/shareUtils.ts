/**
 * Utilities for encoding and decoding grid states to shareable URLs
 *
 * Key design choices:
 * - Run-length encoding (RLE) with an unambiguous delimiter (`|`)
 * - base64url encoding (URL-safe: no + / = characters)
 * - decodeGridState returns null for invalid input WITHOUT logging to stderr
 */

type Grid = boolean[][];

export interface EncodedState {
  grid: Grid;
  generation: number;
  gridWidth: number;
  gridHeight: number;
}

/**
 * Encodes a grid state into a compact base64url string.
 * Uses run-length encoding to compress consecutive cells.
 *
 * RLE run format (unambiguous):
 *   <value><countBase36>|
 * where:
 *   value is '0' (dead) or '1' (alive)
 *   countBase36 is count.toString(36)
 *
 * Example: 10 alive, then 15 dead => "1a|0f|"
 */
export function encodeGridState(grid: Grid, generation: number = 0): string {
  const height = grid.length;
  const width = grid[0]?.length || 0;

  const state: { w: number; h: number; g: number; d: string } = {
    w: width,
    h: height,
    g: generation,
    d: "",
  };

  if (height === 0 || width === 0) {
    return base64UrlEncode(JSON.stringify(state));
  }

  // Ensure grid is rectangular
  for (let row = 0; row < height; row++) {
    if (grid[row].length !== width) {
      throw new Error("encodeGridState: grid is not rectangular");
    }
  }

  // RLE over row-major order
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

  // Final run
  encodedRuns += encodeRun(count, currentValue);

  state.d = encodedRuns;
  return base64UrlEncode(JSON.stringify(state));
}

/**
 * Encodes a run of cells.
 * Format: <value><countBase36>|
 */
function encodeRun(count: number, value: boolean): string {
  return (value ? "1" : "0") + count.toString(36) + "|";
}

/**
 * Decodes a base64url encoded grid state.
 * Returns null if the string is invalid or cannot be decoded safely.
 */
export function decodeGridState(encoded: string): EncodedState | null {
  try {
    const jsonStr = base64UrlDecode(encoded);
    if (jsonStr == null) return null;

    const state = JSON.parse(jsonStr) as { w: unknown; h: unknown; g?: unknown; d?: unknown };

    const width = state.w;
    const height = state.h;
    const generation = (state.g as number | undefined) ?? 0;
    const data = (state.d as string | undefined) ?? "";

    if (!Number.isInteger(width) || !Number.isInteger(height)) return null;
    if (width < 0 || height < 0) return null;
    if (!Number.isInteger(generation)) return null;
    if (typeof data !== "string") return null;

    // Create empty grid default false
    const grid: Grid = Array.from({ length: height }, () => Array(width).fill(false));

    // If empty grid, accept empty data
    const totalCells = width * height;
    if (totalCells === 0) {
      return { grid, generation, gridWidth: width, gridHeight: height };
    }

    // Parse runs: split by delimiter
    const runs = data.split("|").filter(Boolean);

    let cellIndex = 0;

    for (const run of runs) {
      if (cellIndex >= totalCells) break;

      const valueChar = run[0];
      const countStr = run.slice(1);

      if ((valueChar !== "0" && valueChar !== "1") || countStr.length === 0) {
        return null;
      }

      const count = parseInt(countStr, 36);
      if (!Number.isFinite(count) || count <= 0) return null;

      const value = valueChar === "1";

      for (let j = 0; j < count && cellIndex < totalCells; j++) {
        const row = Math.floor(cellIndex / width);
        const col = cellIndex % width;
        grid[row][col] = value;
        cellIndex++;
      }
    }

    // Must fill exactly the expected number of cells
    if (cellIndex !== totalCells) return null;

    return {
      grid,
      generation,
      gridWidth: width,
      gridHeight: height,
    };
  } catch {
    // Important: do NOT log to stderr here; invalid URLs are normal user input.
    return null;
  }
}

/**
 * Generates a shareable URL with the encoded grid state.
 */
export function generateShareUrl(grid: Grid, generation: number = 0): string {
  const encoded = encodeGridState(grid, generation);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?pattern=${encoded}`;
}

/**
 * Extracts the encoded pattern from the current URL.
 */
export function getPatternFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("pattern");
}

/**
 * Copies text to clipboard.
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

/**
 * base64url helpers (URL-safe: - and _ instead of + and /, no padding =)
 * We validate input for base64url alphabet before decoding to avoid atob throwing.
 */
function base64UrlEncode(str: string): string {
  const b64 = btoa(str);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(b64url: string): string | null {
  // base64url allowed chars are A-Z a-z 0-9 - _
  if (!/^[A-Za-z0-9_-]*$/.test(b64url)) return null;

  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "===".slice((b64.length + 3) % 4);

  try {
    return atob(padded);
  } catch {
    return null;
  }
}