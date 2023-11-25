import type { Map, Moves } from './day22.input.js';

type Coords = { x: number; y: number };

type Node = {
  wall: true;
  x: number;
  y: number;
  '>': Node;
  v: Node;
  '<': Node;
  '^': Node;
};

const rotate = ({ x, y }: Coords, rotation: 'R' | 'L') => {
  const angle = Math.atan2(-y, x) + (rotation === 'R' ? -1 : +1) * (Math.PI / 2);
  return { x: Math.round(Math.cos(angle)), y: Math.round(Math.sin(angle)) * -1 };
};

const move = (map: Map, coords: Coords, { x: dx, y: dy }: Coords): Coords => {
  const width = map[0].length;
  const height = map.length;

  const isInBounds = (newCoords: { x: number; y: number }) =>
    newCoords.x >= 0 && newCoords.x < width && newCoords.y >= 0 && newCoords.y < height;

  const newCoords = { x: coords.x + dx, y: coords.y + dy };

  if (!isInBounds(newCoords) || map[newCoords.y][newCoords.x] === undefined) {
    newCoords.x = dx !== 0 ? width - 1 - ((dx + 1) / 2) * (width - 1) : newCoords.x;
    newCoords.y = dy !== 0 ? height - 1 - ((dy + 1) / 2) * (height - 1) : newCoords.y;
    while (map[newCoords.y][newCoords.x] === undefined) {
      newCoords.x += dx;
      newCoords.y += dy;
    }
  }

  if (map[newCoords.y][newCoords.x] === '#') return coords;

  return newCoords;
};

export const solvePart1 = ({ map, moves }: { map: Map; moves: Moves }): number => {
  let pos = { x: map[0].findIndex((cell) => cell === '.'), y: 0 };
  let dir = { x: +1, y: 0 };

  for (const m of moves) {
    if (typeof m === 'string') {
      dir = rotate(dir, m);
      continue;
    }

    for (let i = 0; i < m; i += 1) {
      const newPos = move(map, pos, dir);
      if (newPos === pos) break;
      pos = newPos;
    }
  }

  return 1000 * (pos.y + 1) + 4 * (pos.x + 1) + dir.y * (dir.y - 1) - (dir.x - 1);
};

const aa = [
  [0, 0, 1, 0],
  [1, 1, 1, 0],
  [0, 0, 1, 1],
];

const bb = [
  [0, 1, 1],
  [0, 1, 0],
  [1, 1, 0],
  [1, 0, 0],
];

/*
  0
123
  45
*/

const faceConfig = {
  0: { top: 4, bottom: 3, left: 2, right: 5 },
  1: { top: 0, bottom: 0, left: 0, right: 0 },
  2: { top: 0, bottom: 0, left: 0, right: 0 },
  3: { top: 0, bottom: 0, left: 0, right: 0 },
  4: { top: 0, bottom: 0, left: 0, right: 0 },
  5: { top: 0, bottom: 0, left: 0, right: 0 },
};

export const solvePart2 = ({ map, moves }: { map: Map; moves: Moves }): number => {
  const cellCount = map.reduce((acc, row) => acc + row.reduce((a, cell) => a + (cell === undefined ? 0 : 1), 0), 0);
  const faceSize = Math.sqrt(cellCount / 6);
  const faceCorners: Coords[] = [];
  for (let y = 0; y < map.length; y += faceSize) {
    for (let x = 0; x < map[y].length; x += faceSize) {
      if (map[y][x] === undefined) continue;
      faceCorners.push({ x, y });
    }
  }
  return 42; //
};
