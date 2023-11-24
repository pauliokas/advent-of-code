import { solvePart1, solvePart2 } from './day05';
import parseInput from './day05.input';
import input from './input.txt';

const exampleInput = {
  stacks: [['Z', 'N'], ['M', 'C', 'D'], ['P']],
  moves: [
    { count: 1, from: 1, to: 0 },
    { count: 3, from: 0, to: 2 },
    { count: 2, from: 1, to: 0 },
    { count: 1, from: 0, to: 1 },
  ],
};

describe('2022-05', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(exampleInput)).toBe('CMZ');
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe('CFFHVVHNC');
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(exampleInput)).toBe('MCD');
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe('FSZWBPTBG');
    });
  });
});
