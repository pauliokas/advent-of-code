export default (input: string): number[][] =>
  input
    .trim()
    .split('\n\n')
    .map((group) => group.split('\n').map((line) => parseInt(line, 10)));
