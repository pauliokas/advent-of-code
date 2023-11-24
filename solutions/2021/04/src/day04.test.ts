import { solvePart1, solvePart2 } from './day04';
import parseInput from './day04.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-04', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(4512);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(4662);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(1924);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(12080);
    });
  });
});
