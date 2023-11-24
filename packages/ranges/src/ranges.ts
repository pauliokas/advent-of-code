export type Range = [number, number];

export const sortRanges = (ranges: Range[]): Range[] => {
  ranges.sort(([a], [b]) => a - b);
  return ranges;
};

export const mergeRanges = (ranges: Range[]): Range[] => {
  const result: Range[] = [];
  result.push(ranges[0]);
  for (let i = 1; i < ranges.length; i += 1) {
    const [a, b] = result[result.length - 1];
    const [c, d] = ranges[i];
    if (a <= c + 1 && c - 1 <= b) {
      result[result.length - 1] = [a, Math.max(b, d)];
    } else {
      result.push(ranges[i]);
    }
  }

  return result;
};

export const excludeRange = (ranges: Range[], [start, end]: Range): Range[] => {
  const result: Range[] = [];
  for (const range of ranges) {
    const [a, b] = range;

    const startInRange = a <= start && start <= b;
    const endInRange = a <= end && end <= b;

    if (!startInRange && !endInRange) {
      result.push(range);
      continue;
    }

    if (startInRange) {
      result.push([a, start - 1]);
    }
    if (endInRange) {
      result.push([end + 1, b]);
    }
  }

  return result;
};
