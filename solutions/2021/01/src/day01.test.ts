import { solvePart1, solvePart2 } from './day01';
import parseInput from './day01.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-01', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(7);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(1342);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(5);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(1378);
    });
  });
});
