import { solvePart1, solvePart2 } from './day24';
import parseInput from './day24.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-24', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt), { start: { x: 7, y: 7 }, end: { x: 27, y: 27 } })).toBe(2);
    });

    it('exercise', () => {
      expect(
        solvePart1(parseInput(inputTxt), {
          start: { x: 200000000000000, y: 200000000000000 },
          end: { x: 400000000000000, y: 400000000000000 },
        }),
      ).toBe(16665);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(47);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(0);
    });
  });
});
