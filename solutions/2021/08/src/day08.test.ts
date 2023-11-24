import { solvePart1, solvePart2 } from './day08';
import parseInput from './day08.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-08', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(26);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(288);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(61229);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(940724);
    });
  });
});
