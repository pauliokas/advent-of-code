export type Direction = 'L' | 'R';

export type Map = {
  steps: Direction[];
  directions: Record<string, { L: string; R: string }>;
};

export default (input: string): Map => {
  const [steps, directionsStr] = input.trim().split('\n\n');

  const parseRegex = /^(?<start>.+) = \((?<left>.+), (?<right>.+)\)$/;
  directionsStr.split('\n').reduce((directions, line) => {
    const { start, left, right } = parseRegex.exec(line)!.groups!;
    return { ...directions, [start]: { left, right } };
  }, {});

  return {
    steps: steps.split('') as Direction[],
    directions: directionsStr.split('\n').reduce((directions, line) => {
      const { start, left, right } = parseRegex.exec(line)!.groups!;
      return { ...directions, [start]: { L: left, R: right } };
    }, {}),
  };
};
