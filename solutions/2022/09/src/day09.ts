import type { Direction, HeadMovement } from './day09.input.js';

interface Position {
  x: number;
  y: number;
}

const directionFunctions: Record<Direction, (pos: Position) => Position> = {
  R: ({ x, y }) => ({ x: x + 1, y }),
  L: ({ x, y }) => ({ x: x - 1, y }),
  U: ({ x, y }) => ({ x, y: y + 1 }),
  D: ({ x, y }) => ({ x, y: y - 1 }),
};

const isClose = (head: Position, tail: Position) => Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1;

const moveCloser = (current: number, target: number): number => {
  const difference = target - current;
  return current + Math.sign(difference) * Math.min(1, Math.abs(difference));
};

const move = (rope: Position[], dir: Direction): void => {
  /* eslint-disable no-param-reassign */
  rope[0] = directionFunctions[dir](rope[0]);

  for (let i = 1; i < rope.length; i += 1) {
    if (isClose(rope[i - 1], rope[i])) {
      break;
    }

    rope[i] = {
      x: moveCloser(rope[i].x, rope[i - 1].x),
      y: moveCloser(rope[i].y, rope[i - 1].y),
    };
  }
  /* eslint-enable no-param-reassign */
};

const getUniqueTailPositions =
  (ropeLength: number) =>
  (movements: HeadMovement[]): number => {
    const uniqueTailPositions = new Set<string>();
    const rope = new Array<Position>(ropeLength).fill({ x: 0, y: 0 });

    for (let i = 0; i < movements.length; i += 1) {
      const { direction, count } = movements[i];

      for (let j = 0; j < count; j += 1) {
        move(rope, direction);

        const { x, y } = rope[rope.length - 1];
        uniqueTailPositions.add(`${x},${y}`);
      }
    }

    return uniqueTailPositions.size;
  };

export const solvePart1 = getUniqueTailPositions(2);

export const solvePart2 = getUniqueTailPositions(10);
