import { solvePart1, solvePart2 } from './day06';
import parseInput from './day06.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-06', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(288);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(1108800);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(71503);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(36919753);
    });
  });
});
