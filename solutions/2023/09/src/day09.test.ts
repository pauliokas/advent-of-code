import { solvePart1, solvePart2 } from './day09';
import parseInput from './day09.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-09', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(114);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(1939607039);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(2);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(1041);
    });
  });
});
