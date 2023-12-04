import type { ScratchCard } from './day04.input.js';

type ScratchCardResult = ScratchCard & { numbersWon: number };

const getCardResults = (scratchCards: ScratchCard[]) => {
  const scratchCardResults: ScratchCardResult[] = [];

  for (const { gameId, winningNumbers, drawnNumbers } of scratchCards) {
    const set = new Set(drawnNumbers);

    let numbersWon = 0;
    for (const num of winningNumbers) {
      if (set.has(num)) {
        numbersWon += 1;
      }
    }
    scratchCardResults.push({ gameId, winningNumbers, drawnNumbers, numbersWon });
  }

  return scratchCardResults;
};

export const solvePart1 = (scratchCards: ScratchCard[]): number => {
  const scratchCardResults = getCardResults(scratchCards);

  return scratchCardResults
    .filter(({ numbersWon }) => numbersWon > 0)
    .reduce((sum, { numbersWon }) => sum + 2 ** (numbersWon - 1), 0);
};

const incrMapValue = (map: Map<number, number>, key: number, incr: number) => {
  const val = map.get(key);
  if (val === undefined) {
    map.set(key, incr);
  } else {
    map.set(key, val + incr);
  }
};

export const solvePart2 = (scratchCards: ScratchCard[]): number => {
  const scratchCardResults = getCardResults(scratchCards);

  const cardCounts = new Map<number, number>();
  for (const { gameId, numbersWon } of scratchCardResults) {
    incrMapValue(cardCounts, gameId, 1);
    const instances = cardCounts.get(gameId)!;

    for (let i = 1; i <= numbersWon; i += 1) {
      incrMapValue(cardCounts, gameId + i, instances);
    }
  }

  return [...cardCounts.values()].reduce((sum, val) => sum + val, 0);
};
