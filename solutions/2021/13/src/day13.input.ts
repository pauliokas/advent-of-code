export type Dot = { x: number; y: number };
export type Direction = keyof Dot;
export type Fold = { direction: Direction; line: number };

export default (input: string): { dots: Dot[]; folds: Fold[] } => {
  const lines = input.trim().split('\n');

  const dots: Dot[] = [];
  const folds: Fold[] = [];

  lines
    .filter((line) => !!line)
    .forEach((str) => {
      if (str.startsWith('fold along ')) {
        const [direction, line] = str.substring('fold along '.length).split('=');
        folds.push({ direction: direction as Direction, line: parseInt(line, 10) });
      } else {
        const [x, y] = str.split(',').map((num) => parseInt(num, 10));
        dots.push({ x, y });
      }
    });

  return { dots, folds };
};
