export type Direction = 'R' | 'L' | 'U' | 'D';

export interface HeadMovement {
  direction: Direction;
  count: number;
}

export default (input: string): HeadMovement[] => {
  return input
    .trim()
    .split('\n')
    .map((line) => line.split(' ') as [Direction, string])
    .map(([direction, count]) => ({ direction, count: parseInt(count, 10) }));
};
