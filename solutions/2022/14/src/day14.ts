import { pair } from './day14.input';

const columnOptions = [0, -1, +1] as const;

const fillWithSand = (cave: Map<number, '#' | 'o'>, { maxY, hasFloor }: { maxY: number; hasFloor: boolean }): void => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let x = 500;
    let y = 0;
    while (y <= maxY) {
      const dx = columnOptions.find((opt) => !cave.has(pair(x + opt, y + 1)));
      if (dx === undefined) break;
      x += dx;
      y += 1;
    }

    if ((!hasFloor && y >= maxY) || (hasFloor && y > maxY + 1)) break;

    cave.set(pair(x, y), 'o');
    if (y === 0) break;
  }
};

export const solvePart1 = ({ cave, maxY }: { cave: Map<number, '#' | 'o'>; maxY: number }): number => {
  fillWithSand(cave, { maxY, hasFloor: false });
  return [...cave.values()].filter((x) => x === 'o').length;
};

export const solvePart2 = ({ cave, maxY }: { cave: Map<number, '#' | 'o'>; maxY: number }): number => {
  fillWithSand(cave, { maxY, hasFloor: true });
  return [...cave.values()].filter((x) => x === 'o').length;
};
