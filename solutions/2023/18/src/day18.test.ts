import { solvePart1, solvePart2 } from './day18';
import parseInput from './day18.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-18', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(62);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(33491);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(952408144115);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(87716969654406);
    });
  });
});
