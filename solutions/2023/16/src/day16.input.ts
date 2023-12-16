export type Cell = '.' | '|' | '-' | '/' | '\\';
export type Grid = Cell[][];

export default (input: string): Grid =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split('') as Cell[]);
