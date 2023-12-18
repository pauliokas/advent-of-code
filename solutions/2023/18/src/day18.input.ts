export type Direction = 'U' | 'D' | 'L' | 'R';

export type InputLine = {
  direction: Direction;
  count: number;
  colour: string;
};

export default (input: string): InputLine[] =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [direction, tiles, colourStr] = line.split(' ');
      return {
        direction: direction as Direction,
        count: Number(tiles),
        colour: colourStr.slice(1, -1),
      };
    });
