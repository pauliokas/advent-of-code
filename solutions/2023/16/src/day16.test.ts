import { solvePart1, solvePart2 } from './day16';
import parseInput from './day16.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-16', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(46);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(7046);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(51);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(7313);
    });
  });
});
