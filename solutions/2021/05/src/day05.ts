import type { Coords } from './day05.input';

const range = (start: Coords, end: Coords): number[] => {
  const change = end >= start ? 1 : -1;

  const length = Math.max(start, end) - Math.min(start, end) + 1;
  const array = new Array(length).fill(0);

  return array.map((val, idx) => start + change * idx);
};

const expandToLine = (start: Coords, end: Coords): Coords[] => {
  let xs = range(start.x, end.x);
  let ys = range(start.y, end.y);

  if (xs.length === 1) {
    xs = new Array(ys.length).fill(xs[0]);
  }
  if (ys.length === 1) {
    ys = new Array(xs.length).fill(ys[0]);
  }

  return new Array(xs.length).fill(0).map((val, idx) => ({ x: xs[idx], y: ys[idx] }));
};

function countIntersections(relevantCoords: { start: Coords; end: Coords }[]) {
  const allPoints = relevantCoords.flatMap(({ start, end }) => expandToLine(start, end)).map(({ x, y }) => `${x},${y}`);

  const aggregatedPoints = allPoints.reduce(
    (counter, stringCoords) =>
      Object.assign(counter, {
        [stringCoords]: (counter[stringCoords] || 0) + 1,
      }),
    {} as Record<string, number>,
  );

  return Object.keys(aggregatedPoints).filter((point) => aggregatedPoints[point] > 1).length;
}

export const solvePart1 = (coords: { start: Coords; end: Coords }[]): number => {
  const relevantLines = coords.filter(({ start, end }) => start.x === end.x || start.y === end.y);
  return countIntersections(relevantLines);
};

export const solvePart2 = (coords: { start: Coords; end: Coords }[]): number => {
  const relevantLines = coords.filter(
    ({ start, end }) =>
      start.x === end.x ||
      start.y === end.y ||
      Math.max(start.x, end.x) - Math.min(start.x, end.x) === Math.max(start.y, end.y) - Math.min(start.y, end.y),
  );
  return countIntersections(relevantLines);
};
