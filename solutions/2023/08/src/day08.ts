import type { Map } from './day08.input.js';

const getLengthToEnd = ({ steps, directions }: Map, start: string, isEnd: (v: string) => boolean): number => {
  let currentVertex = start;
  let stepsTaken = 0;
  let directionIdx = 0;
  while (!isEnd(currentVertex)) {
    const nextStep = steps[directionIdx];
    directionIdx = (directionIdx + 1) % steps.length;

    currentVertex = directions[currentVertex][nextStep];
    stepsTaken += 1;
  }

  return stepsTaken;
};

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

export const solvePart1 = (map: Map): number => {
  return getLengthToEnd(map, 'AAA', (v) => v === 'ZZZ');
};

export const solvePart2 = ({ steps, directions }: Map): number => {
  const currentVertexes = Object.keys(directions).filter((vertex) => vertex.endsWith('A'));
  const lengths = currentVertexes.map((vertex) =>
    getLengthToEnd({ steps, directions }, vertex, (v) => v.endsWith('Z')),
  );
  return lengths.reduce((res, val) => lcm(res, val), 1);
};
