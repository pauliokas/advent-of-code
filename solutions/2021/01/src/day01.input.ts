export default (input: string): number[] =>
  input
    .trim()
    .split('\n')
    .map((line) => parseInt(line, 10));
