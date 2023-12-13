import { solvePart1, solvePart2 } from './day13';
import parseInput from './day13.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-13', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(405);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(37718);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(0);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(0);
    });
  });
});
