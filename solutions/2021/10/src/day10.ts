const closers = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
} as const;

type Opener = keyof typeof closers;
type Closer = (typeof closers)[Opener];

const syntaxErrorScores: Record<Closer, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
} as const;

const autocompleteScores: Record<Closer, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
} as const;

const parseLine = (line: string): { autocompleted?: string; corrupted?: Closer } => {
  const stack: Opener[] = [];

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (closers[char as Opener]) {
      stack.push(char as Opener);

      continue;
    }

    const opener = stack.pop()!;
    const expected = closers[opener];
    if (expected !== char) {
      return { corrupted: char as Closer };
    }
  }

  let autocompleted = '';
  while (stack.length) {
    const opener = stack.pop()!;
    autocompleted += closers[opener];
  }

  if (autocompleted) {
    return { autocompleted };
  }

  return {};
};

const calcScore = ({ corrupted, autocompleted }: { autocompleted?: string; corrupted?: Closer }): number => {
  if (corrupted) {
    return syntaxErrorScores[corrupted];
  }

  if (autocompleted) {
    return autocompleted
      .split('')
      .map((char) => autocompleteScores[char as Closer])
      .reduce((acc, score) => acc * 5 + score, 0);
  }

  return 0;
};

export const solvePart1 = (inputs: string[]): number => {
  const parsedLines = inputs.map(parseLine);
  return parsedLines
    .filter(({ corrupted }) => !!corrupted)
    .map(calcScore)
    .reduce((acc, score) => acc + score, 0);
};

export const solvePart2 = (inputs: string[]): number => {
  const parsedLines = inputs.map(parseLine);
  const scores = parsedLines
    .filter(({ autocompleted }) => !!autocompleted)
    .map(calcScore)
    .sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
};
