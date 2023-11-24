const extractMask = (input: string[]) => {
  const wordLength = input[0].length;

  const countsOfOnes = new Array(wordLength).fill(0);

  for (let i = 0; i < input.length; i += 1) {
    const word = input[i];
    for (let j = 0; j < wordLength; j += 1) {
      if (word[j] === '1') {
        countsOfOnes[j] += 1;
      }
    }
  }

  const treshold = input.length / 2;

  const mask = countsOfOnes.map((count) => (count >= treshold ? '1' : '0')).join('');

  return mask;
};

const invertMask = (mask: string) =>
  mask
    .split('')
    .map((bit: string) => (bit === '0' ? '1' : '0'))
    .join('');

export const solvePart1 = (input: string[]): number => {
  const mask = extractMask(input);

  const gamma = parseInt(mask, 2);
  const epsilon = parseInt(invertMask(mask), 2);

  return gamma * epsilon;
};

const filterByMask = (numbers: string[], { invert }: { invert: boolean }): string => {
  let idx = 0;
  while (numbers.length > 1) {
    let mask = extractMask(numbers);
    if (invert) {
      mask = invertMask(mask);
    }

    // eslint-disable-next-line no-param-reassign
    numbers = numbers.filter((number) => number[idx] === mask[idx]);
    idx += 1;
  }

  return numbers[0];
};

export const solvePart2 = (input: string[]): number => {
  const oxygen = parseInt(filterByMask(input, { invert: false }), 2);
  const co2 = parseInt(filterByMask(input, { invert: true }), 2);

  return oxygen * co2;
};
