import { solvePart1, solvePart2 } from './day22';
import parseInput from './day22.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-22', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(5);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(430);
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
