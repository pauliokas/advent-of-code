export default (input: string): string[][] =>
  input
    .trim()
    .split('\n\n')
    .map((pattern) => pattern.split('\n'));
