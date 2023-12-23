import type { Brick } from './day22.input.js';

const unique = <T>(val: T, idx: number, arr: T[]): boolean => arr.indexOf(val) === idx;

const intersects = (a: Brick, b: Brick): boolean => {
  if (a.start.x > b.end.x || a.end.x < b.start.x) return false;
  if (a.start.y > b.end.y || a.end.y < b.start.y) return false;
  if (a.start.z > b.end.z || a.end.z < b.start.z) return false;
  return true;
};

export const solvePart1 = (input: Brick[]): number => {
  // console.log(input);

  const settledBricks: Record<number, Brick[]> = {};
  for (const brick of input) {
    for (let h = brick.start.z; h <= brick.end.z; h += 1) {
      settledBricks[h] = settledBricks[h] ?? [];
      settledBricks[h].push(brick);
    }
  }

  const supportedByMap: Record<string, string[]> = input.reduce((acc, { name }) => ({ ...acc, [name]: [] }), {});
  const supportMap: Record<string, string[]> = input.reduce((acc, { name }) => ({ ...acc, [name]: [] }), {});

  // console.log(settledBricks);

  const altitudes = Object.keys(settledBricks)
    .map(Number)
    .toSorted((a, b) => a - b);

  for (const altitude of altitudes) {
    for (const brick of settledBricks[altitude]) {
      if (brick.start.z !== altitude) continue;

      let newBrick = structuredClone(brick);
      for (let i = altitude - 1; i > 0; i -= 1) {
        const candidate = {
          ...brick,
          start: { ...brick.start, z: i },
          end: { ...brick.end, z: brick.end.z - (altitude - i) },
        };

        const supports = settledBricks[i]?.filter((b) => intersects(candidate, b)).map((b) => b.name);
        if (supports?.length) {
          supportedByMap[brick.name].push(...supports);
          supports.forEach((support) => {
            // supportMap[support] = supportMap[support] ?? [];
            supportMap[support].push(brick.name);
          });
          break;
        }

        newBrick = candidate;
      }

      for (let i = brick.start.z; i <= brick.end.z; i += 1) {
        settledBricks[i].splice(settledBricks[i].indexOf(brick), 1);
      }

      for (let i = newBrick.start.z; i <= newBrick.end.z; i += 1) {
        settledBricks[i] = settledBricks[i] ?? [];
        settledBricks[i].push(newBrick);
      }
    }
  }

  // const supportMap: Record<string, string[]> = {};
  // for (const brick of input) {
  //   if (!supportedByMap[brick.name]) supportedByMap[brick.name] = [];
  //   supportMap[brick.name] = supportMap[brick.name] ?? [];
  //   for (const support of supportedByMap[brick.name]) {
  //     supportMap[support] = supportMap[support] ?? [];
  //     supportMap[support].push(brick.name);
  //   }
  // }

  console.log(supportedByMap);
  console.log(supportMap);
  // console.log(input.filter(({ name }) => !supportedByMap[name]).map(({ name }) => name));

  const safeToDisintegrate: string[] = [];
  for (const [brick, supportedByList] of Object.entries(supportedByMap)) {
    if (supportedByList.length <= 1) continue;
    for (const supportedBy of supportedByList) {
      if (Object.values(supportedByMap).some((list) => list.length === 1 && list[0] === supportedBy)) continue;
      safeToDisintegrate.push(supportedBy);
    }
  }
  for (const [brick, supportList] of Object.entries(supportMap)) {
    if (supportList.length > 0) continue;
    safeToDisintegrate.push(brick);
  }
  // safeToDisintegrate.push(
  //   ...Object.entries(supportMap)
  //     .filter(([, list]) => !list.length)
  //     .map(([name]) => name),
  // );

  console.log(safeToDisintegrate);

  return safeToDisintegrate.filter(unique).length;
};

export const solvePart2 = (input: string[]): number => {
  throw new Error('Not implemented');
};
