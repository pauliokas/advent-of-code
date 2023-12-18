import type { InputLine, Direction } from './day18.input.js';

type DigInstruction = {
  direction: Direction;
  count: number;
};

type Coords = {
  x: number;
  y: number;
};

type CoordsChange = {
  dx: number;
  dy: number;
};

const directionChanges: Record<Direction, CoordsChange> = {
  R: { dx: 1, dy: 0 },
  L: { dx: -1, dy: 0 },
  U: { dx: 0, dy: -1 },
  D: { dx: 0, dy: 1 },
};

const pairUp = <T>(arr: T[]): [T, T][] => {
  const res: [T, T][] = [];
  let prev = arr[arr.length - 1];
  for (let i = 0; i < arr.length; i += 1) {
    const cur = arr[i];
    res.push([prev, cur]);
    prev = cur;
  }
  return res;
};

const calcTrenchVolume = (instructions: DigInstruction[]): number => {
  let current = { x: 0, y: 0 };
  const corners: Coords[] = [];
  for (const { direction, count } of instructions) {
    const { dx, dy } = directionChanges[direction];
    const next = { x: current.x + dx * count, y: current.y + dy * count };

    corners.push(next);
    current = next;
  }

  const pairs = pairUp(corners);

  // https://en.wikipedia.org/wiki/Shoelace_formula
  const area = Math.abs(pairs.reduce((a, [prev, cur]) => a + (prev.y + cur.y) * (prev.x - cur.x), 0)) / 2;
  const perimeter = pairs.reduce((p, [prev, cur]) => p + Math.abs(cur.x - prev.x) + Math.abs(cur.y - prev.y), 0);

  return area + perimeter / 2 + 1;
};

export const solvePart1 = (input: InputLine[]): number => {
  return calcTrenchVolume(input);
};

export const solvePart2 = (input: InputLine[]): number => {
  return calcTrenchVolume(
    input.map(({ colour }) => {
      const count = parseInt(colour.slice(1, -1), 16);
      const direction = { '0': 'R', '1': 'D', '2': 'L', '3': 'U' }[colour.slice(-1)] as Direction;
      return { direction, count };
    }),
  );
};
