export type Coords = {
  x: number;
  y: number;
  z: number;
};

export type Brick = {
  name: string;
  start: Coords;
  end: Coords;
};
export default (input: string): Brick[] =>
  input
    .trim()
    .split('\n')
    .map((line) =>
      line
        .split('~')
        .map((coords) => coords.split(',').map(Number))
        .toSorted((a, b) => {
          if (a[2] !== b[2]) return a[2] - b[2];
          if (a[0] !== b[0]) return a[0] - b[0];
          if (a[1] !== b[1]) return a[1] - b[1];
          return 0;
        }),
    )
    .map(([start, end], idx) => ({
      name: `000${idx + 1}`.slice(-4),
      start: { x: start[0], y: start[1], z: start[2] },
      end: { x: end[0], y: end[1], z: end[2] },
    }));
