export type InputSymbol = '.' | 'O' | '#';

export default (input: string): InputSymbol[][] =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split('') as InputSymbol[]);
