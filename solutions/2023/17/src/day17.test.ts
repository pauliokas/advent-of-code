import { solvePart1, solvePart2 } from './day17';
import parseInput from './day17.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-17', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(102);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(0);
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
