const charCode0 = '0'.charCodeAt(0);
const charCode9 = '9'.charCodeAt(0);

const digitMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

type DigitWord = keyof typeof digitMap;

const parseNumber = (regex: RegExp, line: string): number => {
  let first: number | undefined;
  let last: number | undefined;

  for (let idx = 0; idx < line.length; ) {
    const match = regex.exec(line.substring(idx));
    if (!match) break;
    const [matchedDigit] = match;

    const digit = digitMap[matchedDigit as DigitWord] ?? parseInt(matchedDigit, 10);

    if (first === undefined) first = digit;
    last = digit;

    idx += match.index + 1;
  }

  return first! * 10 + last!;
};

const parseDigits =
  (regex: RegExp) =>
  (lines: string[]): number => {
    const parsedNumbers = lines.map((line) => parseNumber(regex, line));
    return parsedNumbers.reduce((acc, num) => acc + num, 0);
  };

export const solvePart1 = parseDigits(/\d/);

export const solvePart2 = parseDigits(/\d|one|two|three|four|five|six|seven|eight|nine|ten/);
