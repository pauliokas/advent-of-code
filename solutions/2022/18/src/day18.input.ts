export type Coords = { x: number; y: number; z: number };

export class Grid implements Iterable<Coords> {
  private grid: Record<string, Coords> = {};

  constructor(points: Coords[]) {
    for (const point of points) {
      this.grid[`${point.x},${point.y},${point.z}`] = point;
    }
  }

  isSet({ x, y, z }: Coords): boolean {
    return !!this.grid[`${x},${y},${z}`];
  }

  *[Symbol.iterator](): Iterator<Coords> {
    for (const point of Object.values(this.grid)) {
      yield point;
    }
  }
}

export default (input: string): Coords[] => {
  const points = input
    .trim()
    .split('\n')
    .map((line) => line.split(',').map((nums) => parseInt(nums, 10)) as [number, number, number])
    .map(([x, y, z]) => ({ x, y, z }) as Coords);

  return points;
};
