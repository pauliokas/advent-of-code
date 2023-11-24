import { solvePart1, solvePart2 } from './day07';
import parseInput from './day07.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-07', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(37);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(328262);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(168);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(90040997);
    });
  });
});
