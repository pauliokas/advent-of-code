import type { Coords, Velocity } from './day24.input.js';

/*
  x = 19, y = 13, dx = -2, dy =  1, k = -0.5
  x = 18, y = 19, dx = -1, dy = -1, k =    1

  19, 13, 30 @ -2,  1, -2
  18, 19, 22 @ -1, -1, -2


  z = ax + by + r

  L1: -x0*a + -y0*b + -z0 = r
  L2: -x1*a + -y1*b + -z1 = r
  L3: -x2*a + -y2*b + -z2 = r

  L1 - L2: a(x1-x0) + b(y1-y0) + z1-z0 = 0; a = (z1-z0 - b(y1-y0)) / (x1-x0)
  L2 - L3: a(x2-x1) + b(y2-y1) + z2-z1 = 0; a = (z2-z1 - b(y2-y1)) / (x2-x1)

  (z1-z0 - b(y1-y0)) / (x1-x0) = (z2-z1 - b(y2-y1)) / (x2-x1)
  z1-z0 - b(y1-y0) = (z2-z1 - b(y2-y1))(x1-x0) / (x2-x1)
  z1-z0 - b(y1-y0) = z2(x1-x0)/(x2-x1)-z1(x1-x0)/(x2-x1) - b(y2-y1)(x1-x0)/(x2-x1)


  x = f(r) = 19 + -2r
  y = f(r) = 13 +   r
  z = f(r) = 30 + -2r

  f(r) = 19 - 2r + 13 + r + 30 - 2r = 62 - 3r
 */

const nextPoint = ({ x, y, z }: Coords, { dx, dy, dz }: Velocity): Coords => ({ x: x + dx, y: y + dy, z: z + dz });

export const solvePart1 = (
  input: { coords: Coords; velocity: Velocity }[],
  { start, end }: { start: Pick<Coords, 'x' | 'y'>; end: Pick<Coords, 'x' | 'y'> },
): number => {
  // y = k * x + b
  const functionDefs = input.map(({ coords, velocity }) => {
    const { x: x0, y: y0 } = coords;
    const { x: x1, y: y1 } = nextPoint(coords, velocity);

    const k = (y1 - y0) / (x1 - x0);
    const b = y0 - k * x0;

    console.log({ k, b });

    return { coords, velocity, k, b };
  });

  let collisions = 0;
  for (let i = 0; i < input.length - 1; i += 1) {
    for (let j = i + 1; j < input.length; j += 1) {
      const { coords: coords1, velocity: velocity1, k: k1, b: b1 } = functionDefs[i];
      const { coords: coords2, velocity: velocity2, k: k2, b: b2 } = functionDefs[j];

      if (k1 === k2) continue;

      const x = (b2 - b1) / (k1 - k2);
      const y = k1 * x + b1;

      if ((x - coords1.x) / velocity1.dx < 0 || (y - coords1.y) / velocity1.dy < 0) continue;
      if ((x - coords2.x) / velocity2.dx < 0 || (y - coords2.y) / velocity2.dy < 0) continue;

      if (start.x <= x && x <= end.x && start.y <= y && y <= end.y) collisions += 1;
    }
  }

  return collisions;
};

const nextPpint = ({ x, y, z }: Coords, { dx, dy, dz }: Velocity): Coords => ({ x: x + dx, y: y + dy, z: z + dz });

export const solvePart2 = (input: { coords: Coords; velocity: Velocity }[]): number => {
  // z = a * x + b * y + r
  const functionDefs = input.map(({ coords, velocity }) => {
    const { x: x0, y: y0, z: z0 } = coords;
    const { x: x1, y: y1, z: z1 } = nextPoint(coords, velocity);
    const { x: x2, y: y2, z: z2 } = nextPoint({ x: x1, y: y1, z: z1 }, velocity);

    console.log([
      { x0, y0, z0 },
      { x1, y1, z1 },
      { x2, y2, z2 },
    ]);

    const zzz = x2 * (y0 - y1) + x0 * (y1 - y2) + x1 * (y2 - y0);

    console.log(x2 * (y0 - y1), x0 * (y1 - y2), x1 * (y2 - y0));

    const a = (y2 * (z1 - z0) + y1 * (z0 - z2) + y0 * (z2 - z1)) / zzz;
    const b = (x2 * (z0 - z1) + x0 * (z1 - z2) + x1 * (z2 - z0)) / zzz;
    const r = (x2 * (y0 * z1 - y1 * z0) + x1 * (y2 * z0 - y0 * z2) + x0 * (y1 * z2 - y2 * z1)) / zzz;

    console.log(coords, velocity, { a, b, r, zzz });

    return { coords, velocity, a, b, r };
  });
  throw new Error('Not implemented');
};
