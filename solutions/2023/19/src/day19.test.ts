import { solvePart1, solvePart2 } from './day19';
import parseInput from './day19.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-19', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(19114);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(263678);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(167409079868000);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(125455345557345);
    });
  });
});
