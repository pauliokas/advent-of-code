export type ScratchCard = {
  gameId: number;
  winningNumbers: number[];
  drawnNumbers: number[];
};

export default (input: string): ScratchCard[] => {
  const lines = input.trim().split('\n');

  const scratchCards: ScratchCard[] = [];
  for (const line of lines) {
    const [gameTitle, numbersStr] = line.split(':');

    const [, gameIdStr] = gameTitle.split(/\s+/);
    const gameId = Number(gameIdStr);

    const [winningNumbersStr, drawnNumbersStr] = numbersStr.split('|');
    const winningNumbers = winningNumbersStr.trim().split(/\s+/).map(Number);
    const drawnNumbers = drawnNumbersStr.trim().split(/\s+/).map(Number);

    scratchCards.push({ gameId, winningNumbers, drawnNumbers });
  }

  return scratchCards;
};
