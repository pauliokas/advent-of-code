type Coords = { x: number; y: number };

const getDimensions = (grid: number[][]) => ({
  width: grid[0].length,
  height: grid.length,
});

const getValue = <T>(grid: T[][], { x, y }: Coords): T => grid[y][x];

const setValue = <T>(grid: T[][], { x, y }: Coords, value: T) => {
  // eslint-disable-next-line no-param-reassign
  grid[y][x] = value;
};

const getNeighbours = (grid: number[][], { x, y }: Coords) => {
  const { width, height } = getDimensions(grid);
  const deltas = [
    { dx: -1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
  ];
  return deltas
    .map(({ dx, dy }) => ({ x: x + dx, y: y + dy }))
    .filter((point) => point.x >= 0 && point.x < width && point.y >= 0 && point.y < height);
};

/* eslint-disable no-underscore-dangle */
class Queue<T> {
  private _length: number;

  private _priorities: { priority: number; list: T[] }[];

  private _hashes: Record<string, { value: T; priority: number }[]>;

  private _equalsFn: (v1: T, v2: T) => boolean;

  private _hashFn: (v: T) => number;

  constructor({ equalsFn, hashFn }: { equalsFn: (v1: T, v2: T) => boolean; hashFn: (v: T) => number }) {
    this._length = 0;
    this._priorities = [];
    this._hashes = {};
    this._equalsFn = equalsFn;
    this._hashFn = hashFn as any;
  }

  enqueue(value: T, priority: number) {
    const hash = this._hashFn(value);
    const sameHashList = this._hashes[hash] || [];
    const hashIdx = sameHashList.findIndex(({ value: v }) => this._equalsFn(value, v));
    let sameItem: { value: T; priority: number } | undefined;
    if (hashIdx >= 0) {
      sameItem = sameHashList[hashIdx];
    }
    if (sameItem && sameItem.priority === priority) {
      return;
    }

    if (!sameItem) {
      sameHashList.push({ value, priority });
      this._length += 1;
    } else {
      const priorityList = this._priorities.find(({ priority: p }) => p === sameItem!.priority)!.list;
      const priorityIdx = priorityList.findIndex((v) => this._equalsFn(v, value));
      priorityList.splice(priorityIdx, 1);
      Object.assign(sameItem, { priority });
    }

    this._hashes[hash] = sameHashList;

    const prioritiesIdx = Math.max(
      0,
      this._priorities.findIndex(({ priority: p }) => p > priority),
    );
    if (this._priorities.length <= prioritiesIdx || this._priorities[prioritiesIdx].priority !== priority) {
      this._priorities.splice(prioritiesIdx, 0, { priority, list: [] });
    }
    this._priorities[prioritiesIdx].list.push(value);
  }

  dequeue() {
    if (this._length === 0) {
      return undefined;
    }

    const [{ list: priorityList }] = this._priorities;

    const value = priorityList.shift()!;
    if (!priorityList.length) {
      this._priorities.shift();
    }

    const hash = this._hashFn(value);
    const hashList = this._hashes[hash];
    const hashIdx = hashList.findIndex(({ value: v }) => this._equalsFn(value, v));
    hashList.splice(hashIdx, 1);
    if (!hashList.length) {
      delete this._hashes[hash];
    }

    this._length -= 1;

    return value;
  }

  contains(value: T) {
    const hash = this._hashFn(value);
    const vals = this._hashes[hash] || [];
    return !!vals.find(({ value: v }) => this._equalsFn(v, value));
  }

  get length() {
    return this._length;
  }
}
/* eslint-enable */

const findPath = (grid: number[][], start: Coords, end: Coords) => {
  const { width, height } = getDimensions(grid);
  const dist: number[][] = grid.map((row) => row.map(() => Infinity));
  const prev: (Coords | undefined)[][] = grid.map((row) => row.map(() => undefined));
  const queue = new Queue<Coords>({
    equalsFn: (val1, val2) => val1.x === val2.x && val1.y === val2.y,
    hashFn: ({ x, y }) => (x + y) % Math.floor((width + height) / 2),
  });
  grid.flatMap((row, y) => row.map((val, x) => queue.enqueue({ x, y }, Infinity)));

  setValue(dist, { x: 0, y: 0 }, 0);
  queue.enqueue({ x: 0, y: 0 }, 0);

  while (queue.length) {
    const minPoint = queue.dequeue()!;

    const neighbours = getNeighbours(grid, minPoint).filter((point) => queue.contains(point));

    for (let i = 0; i < neighbours.length; i += 1) {
      const neighbour = neighbours[i];
      const newDistance = getValue(dist, minPoint) + getValue(grid, neighbour);
      const oldValue = getValue(dist, neighbour);
      if (newDistance < oldValue) {
        setValue(dist, neighbour, newDistance);
        setValue(prev, neighbour, minPoint);
        queue.enqueue(neighbour, newDistance);
      }
    }
  }

  const path = [end];
  while (path[0].x !== start.x || path[0].y !== start.y) {
    path.unshift(getValue(prev, path[0])!);
  }
  return path;
};

export const solvePart1 = (grid: number[][]): number => {
  const { width, height } = getDimensions(grid);
  const path = findPath(grid, { x: 0, y: 0 }, { x: width - 1, y: height - 1 });
  return path
    .slice(1)
    .map((point) => getValue(grid, point))
    .reduce((acc, value) => acc + value, 0);
};

export const solvePart2 = (grid: number[][]): number => {
  const { width, height } = getDimensions(grid);

  const largeGrid = new Array(height * 5).fill(0).map(() => new Array(width * 5).fill(0));
  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      for (let dx = 0; dx < 5; dx += 1) {
        for (let dy = 0; dy < 5; dy += 1) {
          largeGrid[dy * height + y][dx * width + x] = ((getValue(grid, { x, y }) - 1 + dx + dy) % 9) + 1;
        }
      }
    }
  }

  const path = findPath(largeGrid, { x: 0, y: 0 }, { x: 5 * width - 1, y: 5 * height - 1 });
  return path
    .slice(1)
    .map((point) => getValue(largeGrid, point))
    .reduce((acc, value) => acc + value, 0);
};
