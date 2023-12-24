export type Tile = '.' | '#' | '<' | '>' | '^' | 'v';

export default (input: string): Tile[][] =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split('') as Tile[]);
