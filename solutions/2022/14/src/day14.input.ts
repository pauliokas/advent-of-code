export const pair = (a: number, b: number): number => ((a + b) * (a + b + 1)) / 2 + b;

export default (input: string): { cave: Map<number, '#' | 'o'>; maxY: number } => {
  const rockFormations = input
    .trim()
    .split('\n')
    .map((line) =>
      line.split(' -> ').map((coords) => coords.split(',').map((num) => parseInt(num, 10)) as [number, number]),
    );

  let maxY = -Infinity;

  const cave = new Map<number, '#' | 'o'>();
  for (const rockFormation of rockFormations) {
    for (let verticeIdx = 0; verticeIdx < rockFormation.length - 1; verticeIdx += 1) {
      const [curX, curY] = rockFormation[verticeIdx];
      const [nextX, nextY] = rockFormation[verticeIdx + 1];

      for (let x = Math.min(curX, nextX); x <= Math.max(curX, nextX); x += 1) {
        for (let y = Math.min(curY, nextY); y <= Math.max(curY, nextY); y += 1) {
          if (y > maxY) maxY = y;
          cave.set(pair(x, y), '#');
        }
      }
    }
  }

  return { cave, maxY };
};
