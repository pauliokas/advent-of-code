import { solvePart1, solvePart2 } from './day10';
import parseInput from './day10.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-10', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(26397);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(389589);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(288957);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(1190420163);
    });
  });
});
