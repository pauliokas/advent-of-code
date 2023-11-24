import { solvePart1, solvePart2 } from './day08';
import parseInput from './day08.input';
import input from './input.txt';

const exampleInput: number[][] = [
  [3, 0, 3, 7, 3],
  [2, 5, 5, 1, 2],
  [6, 5, 3, 3, 2],
  [3, 3, 5, 4, 9],
  [3, 5, 3, 9, 0],
];

describe('2022-08', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(exampleInput)).toBe(21);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(1812);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(exampleInput)).toBe(8);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(315495);
    });
  });
});
