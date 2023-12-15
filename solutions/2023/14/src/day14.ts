import type { InputSymbol } from './day14.input.js';

const rotate = (panel: InputSymbol[][]): InputSymbol[][] => {
  const rotated: InputSymbol[][] = [];

  for (let x = 0; x < panel[0].length; x += 1) {
    const newLine: InputSymbol[] = [];
    for (let y = panel.length - 1; y >= 0; y -= 1) {
      newLine.push(panel[y][x]);
    }
    rotated.push(newLine);
  }

  return rotated;
};

const tilt = (panel: InputSymbol[][]) => {
  for (let y = 0; y < panel.length; y += 1) {
    for (let x = 0; x < panel[y].length; x += 1) {
      if (panel[y][x] !== 'O') continue;

      for (let newY = y; newY >= 0; newY -= 1) {
        if ((newY === 0 && panel[newY][x] === '.') || (newY > 0 && panel[newY - 1][x] !== '.')) {
          /* eslint-disable no-param-reassign */
          panel[y][x] = '.';
          panel[newY][x] = 'O';
          /* eslint-enable no-param-reassign */
          break;
        }
      }
    }
  }
};

function calcScore(panel: InputSymbol[][]): number {
  let res = 0;
  for (let y = 0; y < panel.length; y += 1) {
    for (let x = 0; x < panel[y].length; x += 1) {
      if (panel[y][x] !== 'O') continue;

      res += panel.length - y;
    }
  }
  return res;
}

export const solvePart1 = (panel: InputSymbol[][]): number => {
  tilt(panel);
  return calcScore(panel);
};

export const solvePart2 = (input: InputSymbol[][]): number => {
  const cycles = 1_000_000_000;

  const cache: string[] = [];
  let cacheStart = 0;

  let panel = input;

  for (let i = 0; i < cycles; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      tilt(panel);
      panel = rotate(panel);
    }

    const panelStr = panel.map((line) => line.join('')).join('\n');
    cacheStart = cache.indexOf(panelStr);
    if (cacheStart >= 0) break;
    cache.push(panelStr);
  }

  const lastIterationIdx = cacheStart + ((cycles - cache.length - 1) % (cache.length - cacheStart));
  panel = cache[lastIterationIdx].split('\n').map((line) => line.split('')) as InputSymbol[][];

  return calcScore(panel);
};
