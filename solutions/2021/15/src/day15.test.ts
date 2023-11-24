import { solvePart1, solvePart2 } from './day15';
import parseInput from './day15.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-15', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(40);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(410);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(315);
    });

    it.skip('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(2809);
    }, 60000);
  });
});
