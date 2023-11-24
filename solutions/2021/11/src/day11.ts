type Coords = { x: number; y: number };

const getDimensions = (grid: number[][]) => ({
  width: grid[0].length,
  height: grid.length,
});

const increment = (grid: number[][], { x, y }: Coords) => {
  // eslint-disable-next-line no-param-reassign
  grid[y][x] += 1;
  return grid[y][x];
};

const reset = (grid: number[][], { x, y }: Coords) => {
  if (grid[y][x] > 9) {
    // eslint-disable-next-line no-param-reassign
    grid[y][x] = 0;
  }
};

const getNeighbours = (grid: number[][], { x, y }: Coords) => {
  const { width, height } = getDimensions(grid);
  const deltas = [-1, 0, 1];
  return deltas
    .flatMap((dy) => deltas.map((dx) => ({ x: x + dx, y: y + dy })))
    .filter((point) => point.x !== x || point.y !== y)
    .filter((point) => point.x >= 0 && point.x < width)
    .filter((point) => point.y >= 0 && point.y < height);
};

const step = (grid: number[][]) => {
  const flashed: Coords[] = [];
  const isFlashed = ({ x, y }: Coords) => !!flashed.find((point) => point.x === x && point.y === y);

  const updateQueue = grid.flatMap((row, y) => row.map((col, x) => ({ x, y })));

  while (updateQueue.length) {
    const point = updateQueue.pop()!;
    const newValue = increment(grid, point);
    if (newValue > 9 && !isFlashed(point)) {
      flashed.push(point);
      updateQueue.push(...getNeighbours(grid, point));
    }
  }

  grid.flatMap((row, y) => row.map((col, x) => ({ x, y }))).forEach((point) => reset(grid, point));
};

export const solvePart1 = (grid: number[][]): number => {
  // eslint-disable-next-line no-param-reassign
  grid = grid.map((row) => row.map((val) => val));

  const steps = 100;

  let flashCount = 0;

  for (let i = 0; i < steps; i += 1) {
    step(grid);

    flashCount += grid.flatMap((row) => row.filter((val) => val === 0)).length;
  }

  return flashCount;
};

export const solvePart2 = (grid: number[][]): number => {
  // eslint-disable-next-line no-param-reassign
  grid = grid.map((row) => row.map((val) => val));

  const { width, height } = getDimensions(grid);

  let flashCount = 0;
  let stepsMade = 0;

  while (flashCount !== width * height) {
    step(grid);
    stepsMade += 1;
    flashCount = grid.flatMap((row) => row.filter((val) => val === 0)).length;
  }

  return stepsMade;
};
