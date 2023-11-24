import { solvePart1, solvePart2 } from './day06';
import parseInput from './day06.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-06', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(5934);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(351188);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(26984457539);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(1595779846729);
    });
  });
});
