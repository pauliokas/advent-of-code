export type Coords = { x: number; y: number; z: number };
export type Velocity = { dx: number; dy: number; dz: number };

export default (input: string): { coords: Coords; velocity: Velocity }[] =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [[x, y, z], [dx, dy, dz]] = line.split('@').map((part) =>
        part
          .trim()
          .split(',')
          .map((n) => Number(n.trim())),
      );
      return {
        coords: { x, y, z },
        velocity: { dx, dy, dz },
      };
    });
