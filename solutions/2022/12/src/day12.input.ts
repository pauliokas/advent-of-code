export interface Coordinates {
  x: number;
  y: number;
}

export type Grid = number[][];

export default (input: string): { grid: Grid; start: Coordinates; end: Coordinates } => {
  let start: Coordinates;
  let end: Coordinates;
  const grid: Grid = [];

  const lines = input.trim().split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const gridLine = line.split('').map((char) => char.charCodeAt(0));
    grid.push(gridLine);

    const startIdx = line.indexOf('S');
    const endIdx = line.indexOf('E');

    if (startIdx >= 0) {
      gridLine[startIdx] = 'a'.charCodeAt(0);
      start = { x: startIdx, y: i };
    }

    if (endIdx >= 0) {
      gridLine[endIdx] = 'z'.charCodeAt(0);
      end = { x: endIdx, y: i };
    }
  }

  return { grid, start: start!, end: end! };
};
