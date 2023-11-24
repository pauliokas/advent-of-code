import { solvePart1, solvePart2 } from './day05';
import parseInput from './day05.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-05', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(5);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(6710);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(12);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(20121);
    });
  });
});
