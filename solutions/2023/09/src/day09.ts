const guessNext = (sequence: number[]): number => {
  const reducedToZeroes = [[...sequence]];
  let allZeroes = false;
  while (!allZeroes) {
    allZeroes = true;
    const diffs: number[] = [];
    const currentSequence = reducedToZeroes[reducedToZeroes.length - 1];
    for (let i = 0; i < currentSequence.length - 1; i += 1) {
      const cur = currentSequence[i];
      const next = currentSequence[i + 1];
      const diff = next - cur;
      diffs.push(diff);
      allZeroes = allZeroes && diff === 0;
    }
    reducedToZeroes.push(diffs);
  }

  reducedToZeroes[reducedToZeroes.length - 1].push(0);
  for (let i = reducedToZeroes.length - 1; i > 0; i -= 1) {
    const a = reducedToZeroes[i];
    const b = reducedToZeroes[i - 1];

    const nextInSequence = a[a.length - 1] + b[b.length - 1];
    reducedToZeroes[i - 1].push(nextInSequence);
  }

  return reducedToZeroes[0][reducedToZeroes[0].length - 1];
};

export const solvePart1 = (sequences: number[][]): number =>
  sequences.map((sequence) => guessNext(sequence)).reduce((sum, num) => sum + num, 0);

export const solvePart2 = (sequences: number[][]): number =>
  sequences.map((sequence) => guessNext(sequence.reverse())).reduce((sum, num) => sum + num, 0);
