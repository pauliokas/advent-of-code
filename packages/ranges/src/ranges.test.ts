import { mergeRanges, sortRanges, excludeRange } from './ranges';
import type { Range } from './ranges';

describe('ranges', () => {
  describe('sortRanges', () => {
    it('sorts ranges', () => {
      const ranges: Range[] = [
        [1, 2],
        [2, 3],
        [0, 1],
      ];

      expect(sortRanges(ranges)).toEqual([
        [0, 1],
        [1, 2],
        [2, 3],
      ]);
    });
  });

  describe('mergeRanges', () => {
    it('merges overlapping ranges', () => {
      const ranges: Range[] = [
        [0, 1],
        [2, 3],
        [3, 4],
      ];

      expect(mergeRanges(ranges)).toEqual([[0, 4]]);
    });
  });

  describe('excludeRange', () => {
    it('excludes a range from a list of ranges', () => {
      const ranges: Range[] = [
        [0, 5],
        [7, 9],
      ];

      expect(excludeRange(ranges, [1, 3])).toEqual([
        [0, 0],
        [4, 5],
        [7, 9],
      ]);
    });
  });
});
