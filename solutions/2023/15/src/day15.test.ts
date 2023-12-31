import { solvePart1, solvePart2 } from './day15';
import parseInput from './day15.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-15', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(1320);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(517015);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(145);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(0);
    });
  });
});
