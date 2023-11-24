import { solvePart1, solvePart2 } from './day03';
import parseInput from './day03.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-03', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(198);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(3687446);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(230);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(4406844);
    });
  });
});
