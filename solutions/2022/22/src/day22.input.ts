export type Map = (' ' | '.' | '#')[][];
export type Moves = (number | 'R' | 'L')[];

export default (input: string): { map: Map; moves: Moves } => {
  const [map, moves] = input.split('\n\n');

  const lines = map.split('\n');

  const grid: Map = [];
  for (const line of lines) {
    grid.push(line.split('') as Map[number]);
  }

  const parsedMoves: Moves = [];
  let num = 0;
  for (let i = 0; i < moves.trim().length; i += 1) {
    const chr = moves[i];

    const digit = parseInt(chr, 10);
    if (!Number.isNaN(digit)) {
      num = num * 10 + digit;
    } else {
      if (num > 0) parsedMoves.push(num);
      parsedMoves.push(chr as 'R' | 'L');
      num = 0;
    }
  }
  if (num > 0) parsedMoves.push(num);

  return { map: grid, moves: parsedMoves };
};
