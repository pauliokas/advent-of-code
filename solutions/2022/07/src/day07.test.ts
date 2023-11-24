import { solvePart1, solvePart2 } from './day07';
import parseInput from './day07.input';
import input from './input.txt';
import type { Dir } from './day07.input';

const exampleInput: Dir = parseInput(
  [
    '$ cd /',
    '$ ls',
    'dir a',
    '14848514 b.txt',
    '8504156 c.dat',
    'dir d',
    '$ cd a',
    '$ ls',
    'dir e',
    '29116 f',
    '2557 g',
    '62596 h.lst',
    '$ cd e',
    '$ ls',
    '584 i',
    '$ cd ..',
    '$ cd ..',
    '$ cd d',
    '$ ls',
    '4060174 j',
    '8033020 d.log',
    '5626152 d.ext',
    '7214296 k',
  ].join('\n'),
);

describe('2022-07', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(exampleInput)).toBe(95437);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(1667443);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(exampleInput)).toBe(24933642);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(8998590);
    });
  });
});
