import type { Coords, Grid } from './day18.input.js';

const getNeighbours = ({ x, y, z }: Coords): Coords[] =>
  [-1, +1].flatMap((d) => [
    { x: x + d, y, z },
    { x, y: y + d, z },
    { x, y, z: z + d },
  ]);

const hash = ({ x, y, z }: Coords) => `${x},${y},${z}`;

export const solvePart1 = (grid: Coords[]): number => {
  const pointHashes = new Set(grid.map(hash));

  let exposedSides = 0;

  for (const point of grid) {
    const neighbours = getNeighbours(point)
      .filter(({ x, y, z }) => x >= 0 && y >= 0 && z >= 0)
      .filter((neighbor) => pointHashes.has(hash(neighbor)));
    exposedSides += 6 - neighbours.length;
  }

  return exposedSides;
};

export const solvePart2 = (grid: Coords[]): number => {
  const boundingBox = { x: -1, y: -1, z: -1 };
  for (const point of grid) {
    boundingBox.x = Math.max(boundingBox.x, point.x + 1);
    boundingBox.y = Math.max(boundingBox.y, point.y + 1);
    boundingBox.z = Math.max(boundingBox.z, point.z + 1);
  }

  const dropletHashes = new Set(grid.map(hash));

  let exposedSides = 0;

  const queue: Coords[] = [{ x: -1, y: -1, z: -1 }];
  const visited = new Set<string>();

  while (queue.length) {
    const point = queue.shift()!;
    if (visited.has(hash(point))) continue;
    visited.add(hash(point));

    if (dropletHashes.has(hash(point))) exposedSides += 1;

    const neighbours = getNeighbours(point);

    for (const neighbour of neighbours) {
      if (neighbour.x < -1 || neighbour.y < -1 || neighbour.z < -1) continue;
      if (neighbour.x > boundingBox.x || neighbour.y > boundingBox.y || neighbour.z > boundingBox.z) continue;
      if (visited.has(hash(neighbour))) continue;
      if (dropletHashes.has(hash(neighbour))) continue;

      queue.push(neighbour);
    }
  }

  return exposedSides;
};
