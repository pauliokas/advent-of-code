import { getJoinedCoords, getNode } from './day10.input';
import type { Coords, Node } from './day10.input.js';

const pair = (a: number, b: number): number => ((a + b) * (a + b + 1)) / 2 + b;

const getPolygonPath = (grid: Node[][], start: Coords): { furthestPoint: number; path: Set<number> } => {
  const visited = new Set<number>();
  const queue = [start];

  visited.add(pair(start.x, start.y));

  let steps = 0;

  while (queue.length > 0) {
    const nextQueue = [];
    for (let i = 0; i < queue.length; i += 1) {
      const { x, y } = queue[i];

      const neighbours = getNode(grid, { x, y }).joined.map((direction) => getJoinedCoords(grid, { x, y }, direction));

      for (let neighbourIdx = 0; neighbourIdx < neighbours.length; neighbourIdx += 1) {
        const { x: nextX, y: nextY } = neighbours[neighbourIdx];
        const pairedCoords = pair(nextX, nextY);

        if (!visited.has(pairedCoords)) {
          visited.add(pairedCoords);
          nextQueue.push({ x: nextX, y: nextY });
        }
      }
    }

    queue.splice(0, queue.length, ...nextQueue);
    if (nextQueue.length > 0) {
      steps += 1;
    }
  }

  return { furthestPoint: steps, path: visited };
};

/**
 * go through every line from left to right and count how many times the path crosses a pipe. each odd cross means that
 * the path right now is _inside_ the polygon.
 */
const countInsideCells = (grid: Node[][], path: Set<number>): number => {
  const cellScores = grid.map((line) => line.map(() => 0));

  // divide each cell into four subcells. award 0.25 points for each subcell that is inside the polygon. count only
  // those cells that have a score of 1.
  for (let y = 0.25; y < grid.length; y += 0.5) {
    let outside = true;
    for (let x = 0.25; x < grid[0].length; x += 0.5) {
      const actualCoords = { x: Math.floor(x), y: Math.floor(y) };
      const node = getNode(grid, actualCoords);

      if (!outside) cellScores[actualCoords.y][actualCoords.x] += 0.25;

      if (!path.has(pair(actualCoords.x, actualCoords.y))) continue;

      if (x - actualCoords.x > 0.5) continue;

      if (y - actualCoords.y < 0.5 && ['J', 'L', '|'].includes(node.symbol)) outside = !outside;
      if (y - actualCoords.y > 0.5 && ['F', '7', '|'].includes(node.symbol)) outside = !outside;
    }
  }

  return cellScores.map((line) => line.filter((val) => val === 1).length).reduce((acc, num) => acc + num, 0);
};

export const solvePart1 = ({ grid, start }: { grid: Node[][]; start: Coords }): number => {
  const { furthestPoint } = getPolygonPath(grid, start);
  return furthestPoint;
};

export const solvePart2 = ({ grid, start }: { grid: Node[][]; start: Coords }): number => {
  const { path } = getPolygonPath(grid, start);
  return countInsideCells(grid, path);
};
