type Move = 'rock' | 'paper' | 'scissors';

const captures = {
  rock: 'scissors',
  scissors: 'paper',
  paper: 'rock',
} as const;

const opponentMove = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
} as const;

const selfMove = {
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
} as const;

const scores = {
  rock: 1,
  paper: 2,
  scissors: 3,
} as const;

const getScore = (opponent: Move, self: Move) => {
  const moveScore = scores[self];

  if (captures[opponent] === self) {
    return moveScore;
  }
  if (captures[self] === opponent) {
    return moveScore + 6;
  }
  return moveScore + 3;
};

export const solvePart1 = (input: ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'][]): number => {
  return input
    .map(([opponent, self]) => getScore(opponentMove[opponent], selfMove[self]))
    .reduce((curr, score) => curr + score, 0);
};

export const solvePart2 = (input: ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'][]): number => {
  return input
    .map(([opponent, self]): [Move, Move] => {
      const move = opponentMove[opponent];
      if (self === 'X') return [move, captures[move]];
      if (self === 'Z') {
        return [move, Object.entries(captures).find(([, captured]) => captured === move)![0]] as [Move, Move];
      }
      return [move, move];
    })
    .map(([opponent, self]) => getScore(opponent, self))
    .reduce((curr, score) => curr + score, 0);
};
