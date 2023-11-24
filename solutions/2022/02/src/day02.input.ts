export type Pair = ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'];

export default (input: string): Pair[] =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(' ') as Pair);
