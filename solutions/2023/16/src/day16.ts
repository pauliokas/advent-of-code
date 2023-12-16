import type { Cell, Grid } from './day16.input.js';

type Direction = { dx: -1 | 0 | 1; dy: -1 | 0 | 1 };

const pair = (x: number, y: number): number => ((x + y) * (x + y + 1)) / 2 + y;

const getDirections = ({ dx, dy }: Direction, cell: Cell): [Direction] | [Direction, Direction] => {
  switch (cell) {
    case '.':
      return [{ dx, dy }];
    case '-':
      if (dx !== 0) return [{ dx, dy }];
      return [
        { dx: -1, dy: 0 },
        { dx: +1, dy: 0 },
      ];
    case '|':
      if (dy !== 0) return [{ dx, dy }];
      return [
        { dx: 0, dy: -1 },
        { dx: 0, dy: +1 },
      ];
    case '/':
      if (dx === +1) return [{ dx: 0, dy: -1 }];
      if (dx === -1) return [{ dx: 0, dy: +1 }];
      if (dy === +1) return [{ dx: -1, dy: 0 }];
      if (dy === -1) return [{ dx: +1, dy: 0 }];
      throw new Error(`Unknown direction (${dx}; ${dy}) into ${cell}`);
    case '\\':
      if (dx === +1) return [{ dx: 0, dy: +1 }];
      if (dx === -1) return [{ dx: 0, dy: -1 }];
      if (dy === +1) return [{ dx: +1, dy: 0 }];
      if (dy === -1) return [{ dx: -1, dy: 0 }];
      throw new Error(`Unknown direction (${dx}; ${dy}) into ${cell}`);
    default:
      throw new Error(`Unknown cell ${cell}`);
  }
};

type Coords = { x: number; y: number };
type Head = { coords: Coords; direction: Direction };

function getEnergizedTiles(input: Cell[][], startDirection: Direction, startCoords: Coords) {
  const energized = new Set<number>();
  const cache = new Set<string>();
  const heads: Head[] = [{ coords: startCoords, direction: startDirection }];

  while (heads.length) {
    const newHeads: Head[] = [];

    for (const { coords, direction } of heads) {
      const newX = coords.x + direction.dx;
      const newY = coords.y + direction.dy;

      if (input[newY]?.[newX] === undefined) continue;

      const cacheKey = `[${newX};${newY}][${direction.dx};${direction.dy}]`;
      if (cache.has(cacheKey)) continue;
      cache.add(cacheKey);

      energized.add(pair(newX, newY));
      for (const newDirection of getDirections(direction, input[newY][newX])) {
        newHeads.push({ coords: { x: newX, y: newY }, direction: newDirection });
      }
    }

    heads.splice(0, heads.length, ...newHeads);
  }

  return energized.size;
}

export const solvePart1 = (input: Grid): number => {
  return getEnergizedTiles(input, { dx: 1, dy: 0 }, { x: -1, y: 0 });
};

export const solvePart2 = (input: Grid): number => {
  let maxEnergized = 0;

  for (let y = 0; y < input.length; y += 1) {
    maxEnergized = Math.max(
      maxEnergized,
      getEnergizedTiles(input, { dx: +1, dy: 0 }, { x: -1, y }),
      getEnergizedTiles(input, { dx: -1, dy: 0 }, { x: input[y].length, y }),
    );
  }

  for (let x = 0; x < input[0].length; x += 1) {
    maxEnergized = Math.max(
      maxEnergized,
      getEnergizedTiles(input, { dx: 0, dy: +1 }, { x, y: -1 }),
      getEnergizedTiles(input, { dx: 0, dy: -1 }, { x, y: input.length }),
    );
  }

  return maxEnergized;
};
