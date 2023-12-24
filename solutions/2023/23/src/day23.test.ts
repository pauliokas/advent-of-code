import { solvePart1, solvePart2 } from './day23';
import parseInput from './day23.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-23', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(94);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(2110);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(154);
    });

    it.skip(
      'exercise',
      () => {
        expect(solvePart2(parseInput(inputTxt))).toBe(6514);
      },
      4 * 60 * 60 * 1000,
    );
  });
});
