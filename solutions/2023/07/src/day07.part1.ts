import type { Game } from './day07.input.js';

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;
const cardStrength = cards.reduce(
  (acc, suite, index, arr) => ({ ...acc, [suite]: arr.length - index }),
  {} as Record<Card, number>,
);

type Card = (typeof cards)[number];

const typeStrength = {
  '5': 7,
  '41': 6,
  '32': 5,
  '311': 4,
  '221': 3,
  '2111': 2,
  '11111': 1,
} as const;

const getTypeStrength = (hand: string) => {
  const counts = new Map<string, number>();
  for (let i = 0; i < hand.length; i += 1) {
    if (!counts.has(hand[i])) counts.set(hand[i], 0);
    counts.set(hand[i], counts.get(hand[i])! + 1);
  }

  const strengths = [...counts.values()];

  const countsStr = strengths.sort((left, right) => right - left).join('');

  return typeStrength[countsStr as keyof typeof typeStrength];
};

const compareGames = (left: Game, right: Game) => {
  const leftTypeStrength = getTypeStrength(left.hand);
  const rightTypeStrength = getTypeStrength(right.hand);

  if (leftTypeStrength !== rightTypeStrength) return leftTypeStrength - rightTypeStrength;

  for (let i = 0; i < 5; i += 1) {
    const leftCard = left.hand[i] as Card;
    const rightCard = right.hand[i] as Card;

    if (leftCard === rightCard) continue;

    return cardStrength[leftCard] - cardStrength[rightCard];
  }

  return 0;
};

export const solvePart1 = (games: Game[]): number => {
  const sortedGames = games.toSorted(compareGames);
  let score = 0;
  for (let i = 0; i < sortedGames.length; i += 1) {
    score += sortedGames[i].bid * (i + 1);
  }
  return score;
};
