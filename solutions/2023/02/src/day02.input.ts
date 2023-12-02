export type Game = {
  gameIdx: number;
  rounds: Round[];
};

export type Round = {
  red: number;
  green: number;
  blue: number;
};

export type Colour = keyof Round;

export default (input: string): Game[] =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [gameStr, setsStr] = line.split(': ');

      const [, gameIdxStr] = gameStr.split(' ');

      const rounds = setsStr.split('; ').map((setStr) => setStr.split(', '));

      const mappedRounds = rounds.map((round) =>
        round
          .map((zzz): Partial<Round> => {
            const [colourCountStr, colour] = zzz.split(' ');
            return { [colour as Colour]: parseInt(colourCountStr, 10) };
          })
          .reduce((mergedRound: Round, singleColour) => Object.assign(mergedRound, singleColour), {
            red: 0,
            green: 0,
            blue: 0,
          } as Round),
      );

      return {
        gameIdx: parseInt(gameIdxStr, 10),
        rounds: mappedRounds,
      };
    });
