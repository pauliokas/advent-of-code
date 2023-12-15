import { solvePart1, solvePart2 } from './day14';
import parseInput from './day14.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-14', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(136);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(109654);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(64);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(94876);
    });
  });
});
