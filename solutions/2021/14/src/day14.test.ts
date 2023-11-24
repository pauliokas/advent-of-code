import { solvePart1, solvePart2 } from './day14';
import parseInput from './day14.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-14', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(1588);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(2590);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(2188189693529);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(2875665202438);
    });
  });
});
