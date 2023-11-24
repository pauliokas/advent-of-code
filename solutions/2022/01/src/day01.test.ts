import { solvePart1, solvePart2 } from './day01';
import parseInput from './day01.input';
import input from './input.txt';

const exampleInput = [[1000, 2000, 3000], [4000], [5000, 6000], [7000, 8000, 9000], [10000]];

describe('2022-01', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(exampleInput)).toBe(24000);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(69206);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(exampleInput)).toBe(45000);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(197400);
    });
  });
});
