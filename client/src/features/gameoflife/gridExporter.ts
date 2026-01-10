export function exportGridAsRLE(grid: boolean[][], patternName: string): string {
  const height = grid.length;
  const width = grid[0]?.length || 0;

  let rle = `#N ${patternName}\n`;
  rle += `x = ${width}, y = ${height}\n`;

  let pattern = '';
  for (let row = 0; row < height; row++) {
    let runCount = 1;
    let currentCell = grid[row][0];

    for (let col = 1; col < width; col++) {
      if (grid[row][col] === currentCell) {
        runCount++;
      } else {
        pattern += encodeRun(runCount, currentCell);
        runCount = 1;
        currentCell = grid[row][col];
      }
    }
    pattern += encodeRun(runCount, currentCell);

    if (row < height - 1) {
      pattern += '$';
    }
  }

  pattern += '!';
  rle += pattern;

  return rle;
}

function encodeRun(count: number, isAlive: boolean): string {
  const char = isAlive ? 'o' : 'b';
  if (count === 1) {
    return char;
  }
  return `${count}${char}`;
}

export function exportGridAsPNG(
  grid: boolean[][],
  filename: string,
  cellSize: number,
  aliveColor: string,
  deadColor: string
): void {
  const height = grid.length;
  const width = grid[0]?.length || 0;

  const canvas = document.createElement('canvas');
  canvas.width = width * cellSize;
  canvas.height = height * cellSize;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      ctx.fillStyle = grid[row][col] ? aliveColor : deadColor;
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }

  canvas.toBlob((blob) => {
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  });
}
