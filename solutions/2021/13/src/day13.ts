import type { Direction, Dot, Fold } from './day13.input';

const fold = (dots: Dot[], { direction, line }: Fold): Dot | Partial<Record<Direction, number>> => {
  return dots
    .map((coords) => {
      if (coords[direction] <= line) {
        return coords;
      }

      return { ...coords, [direction]: line - (coords[direction] - line) };
    })
    .filter(({ x, y }, idx, self) => idx === self.findIndex((coords) => x === coords.x && y === coords.y));
};

const printDots = (dots: Dot[]): string => {
  const width = Math.max(...dots.map(({ x }) => x)) + 1;
  const height = Math.max(...dots.map(({ y }) => y)) + 1;

  const lines: string[] = [];
  for (let y = 0; y < height; y += 1) {
    let line = '';
    for (let x = 0; x < width; x += 1) {
      const point = dots.find((coords) => x === coords.x && y === coords.y);
      if (point) {
        line += '||';
      } else {
        line += '  ';
      }
    }
    lines.push(line);
  }

  return lines.join('\n');
};

export const solvePart1 = ({ dots, folds }: { dots: Dot[]; folds: Fold[] }): number => {
  // eslint-disable-next-line no-param-reassign
  dots = fold(dots, folds[0]);
  return dots.length;
};

export const solvePart2 = ({ dots, folds }: { dots: Dot[]; folds: Fold[] }): string => {
  for (let i = 0; i < folds.length; i += 1) {
    // eslint-disable-next-line no-param-reassign
    dots = fold(dots, folds[i]);
  }

  return printDots(dots);
};
