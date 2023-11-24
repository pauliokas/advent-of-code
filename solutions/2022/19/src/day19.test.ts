import { solvePart1, solvePart2 } from './day19';
import parseInput from './day19.input';
import input from './input.txt';

const exampleInput = [
  [
    'Blueprint 1:',
    'Each ore robot costs 4 ore.',
    'Each clay robot costs 2 ore.',
    'Each obsidian robot costs 3 ore and 14 clay.',
    'Each geode robot costs 2 ore and 7 obsidian.',
  ],
  [
    'Blueprint 2:',
    'Each ore robot costs 2 ore.',
    'Each clay robot costs 3 ore.',
    'Each obsidian robot costs 3 ore and 8 clay.',
    'Each geode robot costs 3 ore and 12 obsidian.',
  ],
]
  .map((z) => z.join(' '))
  .join('\n');

describe('2022-19', () => {
  describe('part 1', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart1(parsedInput)).toBe(33);
    });

    it.skip('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(1480);
    }, 30000);
  });

  describe('part 2', () => {
    it.skip('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart2(parsedInput)).toBe(3472);
    }, 180000);

    it.skip('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(3168);
    }, 240000);
  });
});
