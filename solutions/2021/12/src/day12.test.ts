import { solvePart1, solvePart2 } from './day12';
import parseInput from './day12.input';
import inputTxt from './input.txt';

const inputs = [
  {
    start: ['A', 'b'],
    A: ['c', 'b', 'end'],
    b: ['A', 'd', 'end'],
    c: ['A'],
    d: ['b'],
    end: [],
  },
  {
    dc: ['end', 'HN', 'LN', 'kj'],
    end: [],
    HN: ['dc', 'end', 'kj'],
    start: ['HN', 'kj', 'dc'],
    kj: ['sa', 'HN', 'dc'],
    LN: ['dc'],
    sa: ['kj'],
  },
  {
    fs: ['end', 'he', 'DX', 'pj'],
    end: [],
    he: ['DX', 'fs', 'pj', 'RW', 'WI', 'zg'],
    DX: ['he', 'pj', 'fs'],
    start: ['DX', 'pj', 'RW'],
    pj: ['DX', 'zg', 'he', 'RW', 'fs'],
    zg: ['end', 'sl', 'pj', 'RW', 'he'],
    sl: ['zg'],
    RW: ['he', 'pj', 'zg'],
    WI: ['he'],
  },
];

describe('2021-12', () => {
  describe('part 1', () => {
    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(3738);
    });

    [10, 19, 226].forEach((pathCount, idx) =>
      it(`example ${idx + 1}`, () => {
        expect(solvePart1(inputs[idx])).toBe(pathCount);
      }),
    );
  });

  describe('part 2', () => {
    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(120506);
    });

    [36, 103, 3509].forEach((pathCount, idx) =>
      it(`example ${idx + 1}`, () => {
        expect(solvePart2(inputs[idx])).toBe(pathCount);
      }),
    );
  });
});
