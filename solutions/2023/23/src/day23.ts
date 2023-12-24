import type { Tile } from './day23.input.js';

type Coords = { x: number; y: number };

const pair = (a: number, b: number): number => ((a + b) * (a + b + 1)) / 2 + b;

const asdf = {
  '>': { dx: +1, dy: 0 },
  '<': { dx: -1, dy: 0 },
  '^': { dx: 0, dy: -1 },
  v: { dx: 0, dy: +1 },
} as const;

function* calcPathLength2(
  grid: Tile[][],
  start: Coords,
  end: Coords,
  { slipperySlopes }: { slipperySlopes: boolean },
): Generator<Coords[]> {
  const stack: { path: Coords[]; visited: Set<number> }[] = [
    { path: [start], visited: new Set([pair(start.x, start.y)]) },
  ];

  while (stack.length) {
    const { path, visited } = stack.pop()!;

    let neighbours: Coords[] = [];
    do {
      const { x, y } = path[path.length - 1];
      neighbours = [];
      if (slipperySlopes && Object.keys(asdf).includes(grid[y][x])) {
        const slope = asdf[grid[y][x] as keyof typeof asdf];
        neighbours.push({ x: x + slope.dx, y: y + slope.dy });
      } else {
        if (!['#', undefined].includes(grid[y][x + 1])) neighbours.push({ x: x + 1, y });
        if (!['#', undefined].includes(grid[y + 1]?.[x])) neighbours.push({ x, y: y + 1 });
        if (!['#', undefined].includes(grid[y][x - 1])) neighbours.push({ x: x - 1, y });
        if (!['#', undefined].includes(grid[y - 1]?.[x])) neighbours.push({ x, y: y - 1 });
      }
      neighbours = neighbours.filter((n) => !visited.has(pair(n.x, n.y)));

      if (neighbours.length === 1) {
        const neighbour = neighbours[0];
        path.push(neighbour);
        visited.add(pair(neighbour.x, neighbour.y));
      }
    } while (neighbours.length === 1);

    if (neighbours.length === 0 && path[path.length - 1].x === end.x && path[path.length - 1].y === end.y) {
      yield path;
      // continue;
    } else if (neighbours.length > 1) {
      for (const neighbour of neighbours) {
        stack.push({
          path: [...path, neighbour],
          visited: new Set([...visited, pair(neighbour.x, neighbour.y)]),
        });
      }
    }
  }
}

export const solvePart1 = (input: Tile[][]): number => {
  const start = { x: input[0].findIndex((tile) => tile === '.'), y: 0 };
  const end = { x: input[input.length - 1].findIndex((tile) => tile === '.'), y: input.length - 1 };

  let maxLength = 0;
  for (const path of calcPathLength2(input, start, end, { slipperySlopes: true })) {
    maxLength = Math.max(maxLength, path.length - 1);
  }

  return maxLength;
};

export const solvePart2 = (input: Tile[][]): number => {
  const start = { x: input[0].findIndex((tile) => tile === '.'), y: 0 };
  const end = { x: input[input.length - 1].findIndex((tile) => tile === '.'), y: input.length - 1 };

  let maxLength = 0;
  for (const path of calcPathLength2(input, start, end, { slipperySlopes: false })) {
    maxLength = Math.max(maxLength, path.length - 1);
  }

  return maxLength;
};
