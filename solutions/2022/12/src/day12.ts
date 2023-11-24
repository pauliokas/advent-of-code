import type { Coordinates, Grid } from './day12.input.js';

const directions = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
] as const;

const pair = (a: number, b: number): number => ((a + b) * (a + b + 1)) / 2 + b;

const getNeighbours = (grid: Grid, { x, y }: Coordinates): Coordinates[] =>
  directions
    .map(({ x: dx, y: dy }) => ({ x: x + dx, y: y + dy }))
    .filter(({ x: newX, y: newY }) => newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length);

const calcPathLength = (
  grid: Grid,
  start: Coordinates,
  {
    isEnd,
    isValidDestination,
  }: { isEnd: (coords: Coordinates) => boolean; isValidDestination: (from: Coordinates, to: Coordinates) => boolean },
): number => {
  // const visited = new Set<number>();
  const visited = new Set<number>();
  const queue = [start];
  visited.add(pair(start.x, start.y));
  let steps = 0;

  while (queue.length > 0) {
    const nextQueue = [];
    for (let i = 0; i < queue.length; i += 1) {
      const { x, y } = queue[i];
      if (isEnd({ x, y })) {
        return steps;
      }

      const neighbours = getNeighbours(grid, { x, y }).filter((neighbour) => isValidDestination({ x, y }, neighbour));
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
    steps += 1;
  }

  return -1;
};

export const solvePart1 = ({ grid, start, end }: { grid: Grid; start: Coordinates; end: Coordinates }): number => {
  return calcPathLength(grid, start, {
    isEnd: ({ x, y }) => x === end.x && y === end.y,
    isValidDestination: (from, to) => grid[to.y][to.x] <= grid[from.y][from.x] + 1,
  });
};

export const solvePart2 = ({ grid, end }: { grid: Grid; start: Coordinates; end: Coordinates }): number => {
  const lowestAltitude = 'a'.charCodeAt(0);
  return calcPathLength(grid, end, {
    isEnd: ({ x, y }) => grid[y][x] === lowestAltitude,
    isValidDestination: (from, to) => grid[to.y][to.x] + 1 >= grid[from.y][from.x],
  });
};
