import { solvePart1, solvePart2 } from './day04';
import parseInput from './day04.input';
import input from './input.txt';
import type { AssignmentPair } from './day04.input';

/* eslint-disable prettier/prettier */
const exampleInput: AssignmentPair[] = [
  [[2, 4], [6, 8]],
  [[2, 3], [4, 5]],
  [[5, 7], [7, 9]],
  [[2, 8], [3, 7]],
  [[6, 6], [4, 6]],
  [[2, 6], [4, 8]],
];
/* eslint-enable */

describe('2022-04', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(exampleInput)).toBe(2);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(532);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(exampleInput)).toBe(4);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(854);
    });
  });
});
