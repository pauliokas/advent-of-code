const patterns = {
  0: 'abcefg',
  1: 'cf',
  2: 'acdeg',
  3: 'acdfg',
  4: 'bcdf',
  5: 'abdfg',
  6: 'abdefg',
  7: 'acf',
  8: 'abcdefg',
  9: 'abcdfg',
} as const;

const normalize = (signal: string): string => signal.split('').sort().join('');

const matchesLength = (pattern: string, digit: keyof typeof patterns) => pattern.length === patterns[digit].length;

// eslint-disable-next-line @typescript-eslint/no-shadow
const concat = (...patterns: string[]) =>
  normalize(
    patterns
      .flatMap((pattern) => pattern.split(''))
      .filter((val, idx, self) => self.indexOf(val) === idx)
      .join(''),
  );

const pop = (array: string[], predicate: (signal: string) => boolean) => {
  const valueIdx = array.findIndex(predicate);
  const value = array[valueIdx];
  array.splice(valueIdx, 1);
  return value;
};

const decodeOutputs = (signals: string[], outputs: string[]) => {
  /* eslint-disable no-param-reassign */
  signals = signals.map(normalize);
  outputs = outputs.map(normalize);
  /* eslint-enable no-param-reassign */

  const encodedPatterns: string[] = new Array(10).fill(0);
  encodedPatterns[1] = pop(signals, (signal) => matchesLength(signal, 1));
  encodedPatterns[4] = pop(signals, (signal) => matchesLength(signal, 4));
  encodedPatterns[7] = pop(signals, (signal) => matchesLength(signal, 7));
  encodedPatterns[8] = pop(signals, (signal) => matchesLength(signal, 8));
  encodedPatterns[9] = pop(
    signals,
    (signal) => matchesLength(signal, 9) && concat(encodedPatterns[4], encodedPatterns[7], signal) === signal,
  );
  encodedPatterns[0] = pop(
    signals,
    (signal) => matchesLength(signal, 0) && concat(encodedPatterns[7], signal) === signal,
  );
  encodedPatterns[6] = pop(signals, (signal) => matchesLength(signal, 6));
  encodedPatterns[3] = pop(signals, (signal) => concat(encodedPatterns[7], signal) === signal);
  encodedPatterns[5] = pop(signals, (signal) => concat(encodedPatterns[1], signal) === encodedPatterns[9]);
  encodedPatterns[2] = pop(signals, () => true);

  return outputs
    .map((output) => Object.entries(encodedPatterns).find(([, signal]) => signal === output)!)
    .map(([digit]) => parseInt(digit, 10));
};

export const solvePart1 = (input: { signals: string[]; outputs: string[] }[]): number => {
  const relevantOutputs = input
    .map(({ signals, outputs }) => decodeOutputs(signals, outputs))
    .map((outputs) => outputs.filter((output) => [1, 4, 7, 8].includes(output)));
  return relevantOutputs.reduce((acc, outputs) => acc + outputs.length, 0);
};

export const solvePart2 = (input: { signals: string[]; outputs: string[] }[]): number => {
  const outputs = input
    // eslint-disable-next-line @typescript-eslint/no-shadow
    .map(({ signals, outputs }) => decodeOutputs(signals, outputs))
    .map((digits) => digits.reduce((acc, digit, idx) => acc + digit * 10 ** (4 - idx - 1), 0));
  return outputs.reduce((acc, output) => acc + output, 0);
};
