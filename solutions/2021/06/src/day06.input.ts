export default (input: string): number[] => {
  const lines = input.trim().split('\n');
  return lines[0].split(',').map((num) => parseInt(num, 10));
};
