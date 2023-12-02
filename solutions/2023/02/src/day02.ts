import type { Colour, Game, Round } from './day02.input.js';

const colours: Colour[] = ['red', 'green', 'blue'];

export const solvePart1 = (input: Game[]): number => {
  const max: Round = { red: 12, green: 13, blue: 14 };

  const possibleGames: number[] = [];

  outerLoop: for (const { gameIdx, rounds } of input) {
    for (const round of rounds) {
      if (round.red > max.red || round.green > max.green || round.blue > max.blue) {
        continue outerLoop;
      }
    }

    possibleGames.push(gameIdx);
  }

  return possibleGames.reduce((acc, num) => acc + num, 0);
};

export const solvePart2 = (input: Game[]): number => {
  const gamePowers: number[] = [];

  for (const { rounds } of input) {
    const maxDraws: Round = { red: 0, green: 0, blue: 0 };
    for (const round of rounds) {
      for (const colour of colours) {
        maxDraws[colour] = Math.max(maxDraws[colour], round[colour]);
      }
    }

    gamePowers.push(colours.reduce((acc, colour) => acc * maxDraws[colour], 1));
  }

  return gamePowers.reduce((acc, num) => acc + num, 0);
};
