export default (input: string): number[][] =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split('').map((val) => parseInt(val, 10)));
