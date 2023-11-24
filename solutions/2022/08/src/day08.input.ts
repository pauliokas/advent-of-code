export default (input: string): number[][] => {
  return input
    .trim()
    .split('\n')
    .map((line) => line.split('').map((digit) => parseInt(digit, 10)));
};
