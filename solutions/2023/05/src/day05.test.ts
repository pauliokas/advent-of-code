import { remapRange, solvePart1, solvePart2 } from './day05';
import parseInput from './day05.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';
import type { RangeMap } from './day05.input';

describe('2023-05', () => {
  describe('remapRange()', () => {
    const mappings: RangeMap[] = [
      { src: { start: 0, end: 0 }, dst: { start: 0, end: 0 } },
      { src: { start: 0, end: 5 }, dst: { start: 60, end: 65 } },
      { src: { start: 5, end: 10 }, dst: { start: 55, end: 60 } },
      { src: { start: 10, end: +Infinity }, dst: { start: 10, end: +Infinity } },
    ];

    it('case 1', () => {
      expect(remapRange({ start: 1, end: 2 }, mappings)).toEqual([{ start: 61, end: 62 }]);
    });

    it('case 2', () => {
      expect(remapRange({ start: 0, end: 1 }, mappings)).toEqual([{ start: 60, end: 61 }]);
    });

    it('case 3', () => {
      expect(remapRange({ start: 4, end: 6 }, mappings)).toEqual([
        { start: 64, end: 65 },
        { start: 55, end: 56 },
      ]);
    });

    it('case 4', () => {
      expect(remapRange({ start: 4, end: 11 }, mappings)).toEqual([
        { start: 64, end: 65 },
        { start: 55, end: 60 },
        { start: 10, end: 11 },
      ]);
    });

    it('case 5', () => {
      expect(
        remapRange({ start: 81, end: 95 }, [
          { src: { start: 0, end: 18 }, dst: { start: 0, end: 18 } },
          { src: { start: 18, end: 25 }, dst: { start: 88, end: 95 } },
          { src: { start: 25, end: 95 }, dst: { start: 18, end: 88 } },
          { src: { start: 95, end: Infinity }, dst: { start: 95, end: Infinity } },
        ]),
      ).toEqual([{ start: 74, end: 88 }]);
    });

    it('case 6', () => {
      expect(
        remapRange({ start: 46, end: 57 }, [
          { src: { start: 0, end: 56 }, dst: { start: 0, end: 56 } },
          { src: { start: 56, end: 93 }, dst: { start: 60, end: 97 } },
          { src: { start: 93, end: 97 }, dst: { start: 56, end: 60 } },
          { src: { start: 97, end: Infinity }, dst: { start: 97, end: Infinity } },
        ]),
      ).toEqual([
        { start: 46, end: 56 },
        { start: 60, end: 61 },
      ]);
    });
  });

  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(35);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(88151870);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(46);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(2008785);
    });
  });
});
