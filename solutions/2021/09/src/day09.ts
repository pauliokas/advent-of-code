type Point = { x: number; y: number };

const maxValue = 9;

const getDimensions = (grid: number[][]) => ({
  width: grid[0].length,
  height: grid.length,
});

const getValue = (grid: number[][], { x, y }: Point) => {
  const { width, height } = getDimensions(grid);
  if (x < 0 || x >= width || y < 0 || y >= height) {
    return maxValue;
  }
  return grid[y][x];
};

const getNeighbours = (grid: number[][], { x, y }: Point) => {
  const { width, height } = getDimensions(grid);
  return [
    ...(x > 0 ? [{ x: x - 1, y }] : []),
    ...(y > 0 ? [{ x, y: y - 1 }] : []),
    ...(x < width - 1 ? [{ x: x + 1, y }] : []),
    ...(y < height - 1 ? [{ x, y: y + 1 }] : []),
  ];
};

const findLowPoints = (grid: number[][]): Point[] => {
  const { width, height } = getDimensions(grid);

  const lowPoints = [];
  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      const value = getValue(grid, { x, y });
      const kernel = getNeighbours(grid, { x, y }).map((point) => getValue(grid, point));

      if (kernel.every((kernelValue) => value < kernelValue)) {
        lowPoints.push({ x, y });
      }
    }
  }

  return lowPoints;
};

const findBasin = (grid: number[][], origin: Point) => {
  const visitedPoints: Point[] = [];
  const isVisited = (point: Point): boolean =>
    visitedPoints.some((visited) => visited.x === point.x && visited.y === point.y);

  const queue = [origin];
  const basin = [];
  while (queue.length) {
    const point = queue.pop()!;
    if (isVisited(point)) {
      continue;
    }

    visitedPoints.push(point);

    if (getValue(grid, point) < maxValue) {
      queue.push(...getNeighbours(grid, point));
      basin.push(point);
    }
  }

  return basin;
};

export const solvePart1 = (terrain: number[][]): number => {
  const lowPoints = findLowPoints(terrain);
  return lowPoints.map((point) => getValue(terrain, point) + 1).reduce((acc, risk) => acc + risk, 0);
};

export const solvePart2 = (terrain: number[][]): number => {
  const basins = findLowPoints(terrain).map((point) => findBasin(terrain, point));
  return basins
    .sort((b1, b2) => b2.length - b1.length)
    .slice(0, 3)
    .map(({ length }) => length)
    .reduce((acc, length) => acc * length, 1);
};
