const parseBoard = (lines: string[]): number[] =>
  lines
    .filter((line) => !!line)
    .flatMap((line) =>
      line
        .trim()
        .split(/\s+/)
        .map((num) => parseInt(num, 10)),
    );

export default (input: string): { rounds: number[]; boards: number[][] } => {
  const lines = input.trim().split('\n');

  const rounds = lines[0].split(',').map((num) => parseInt(num, 10));
  const boardCount = (lines.length - 1) / 5;

  const boards = [];
  for (let i = 0; i < boardCount; i += 1) {
    boards.push(parseBoard(lines.slice(2 + 6 * i, 2 + 6 * (i + 1))));
  }

  return {
    rounds,
    boards,
  };
};
