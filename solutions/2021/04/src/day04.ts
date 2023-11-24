const checkBoard = (board: number[], rounds: number[]) => {
  const bingo = (line: number[]) => line.every((num) => rounds.includes(num));

  for (let col = 0; col < 5; col += 1) {
    const line = [0, 1, 2, 3, 4].map((row) => board[row * 5 + col]);
    if (bingo(line)) {
      return true;
    }
  }

  for (let row = 0; row < 5; row += 1) {
    const line = [0, 1, 2, 3, 4].map((col) => board[row * 5 + col]);
    if (bingo(line)) {
      return true;
    }
  }

  return false;
};

function calculateScore(board: number[], rounds: number[]) {
  const score = board.filter((num) => !rounds.includes(num)).reduce((acc, num) => acc + num, 0);

  return score * rounds[rounds.length - 1];
}

const getWinnerBoardIndices = (boards: number[][], rounds: number[]) =>
  boards.map((board, idx) => (checkBoard(board, rounds) ? idx : undefined)).filter((idx) => idx !== undefined);

export const solvePart1 = ({ rounds, boards }: { rounds: number[]; boards: number[][] }): number => {
  let passedRounds;
  let winnerIndices;
  for (let i = 5; i <= rounds.length; i += 1) {
    passedRounds = rounds.slice(0, i);
    winnerIndices = getWinnerBoardIndices(boards, passedRounds);
    if (winnerIndices.length) {
      break;
    }
  }

  return calculateScore(boards[winnerIndices![0]!], passedRounds!);
};

export const solvePart2 = ({ rounds, boards }: { rounds: number[]; boards: number[][] }): number => {
  let passedRounds;
  let previousWinnerIndices;
  let lastWinnerIndex;
  for (let i = rounds.length; i >= 5; i -= 1) {
    passedRounds = rounds.slice(0, i);
    const winnerIndices = getWinnerBoardIndices(boards, passedRounds);

    if (previousWinnerIndices === undefined) {
      previousWinnerIndices = winnerIndices;
    }

    if (previousWinnerIndices.length !== winnerIndices.length) {
      passedRounds = rounds.slice(0, i + 1);
      lastWinnerIndex = previousWinnerIndices.find((idx) => !winnerIndices.includes(idx));
      break;
    }

    previousWinnerIndices = winnerIndices;
  }

  return calculateScore(boards[lastWinnerIndex!], passedRounds!);
};
