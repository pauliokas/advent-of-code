import type { Coords } from './day11.input.js';

const range = (start: number, end: number): number[] => new Array(end - start + 1).fill(0).map((_, idx) => start + idx);

const expandUniverses = (galaxies: Coords[], factor: number): Coords[] => {
  const boundingBox = { x: 0, y: 0 };
  for (const { x, y } of galaxies) {
    boundingBox.x = Math.max(boundingBox.x, x);
    boundingBox.y = Math.max(boundingBox.y, y);
  }

  const cols = range(0, boundingBox.x);
  const rows = range(0, boundingBox.y);

  for (const { x, y } of galaxies) {
    const colIdx = cols.indexOf(x);
    if (colIdx >= 0) cols.splice(colIdx, 1);

    const rowIdx = rows.indexOf(y);
    if (rowIdx >= 0) rows.splice(rowIdx, 1);
  }

  const newGalaxies: Coords[] = [];
  for (const { x, y } of galaxies) {
    const expandX = cols.filter((col) => col < x).length;
    const expandY = rows.filter((row) => row < y).length;
    newGalaxies.push({ x: x + expandX * (factor - 1), y: y + expandY * (factor - 1) });
  }

  return newGalaxies;
};

const calcDistance = (a: Coords, b: Coords): number => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const sumDistances =
  (expansionFactor: number) =>
  (galaxies: Coords[]): number => {
    const expandedGalaxies = expandUniverses(galaxies, expansionFactor);

    let sum = 0;
    for (let i = 0; i < expandedGalaxies.length - 1; i += 1) {
      for (let j = i + 1; j < expandedGalaxies.length; j += 1) {
        sum += calcDistance(expandedGalaxies[i], expandedGalaxies[j]);
      }
    }

    return sum;
  };

export const solvePart1 = sumDistances(2);

export const solvePart2 = sumDistances(1000000);
