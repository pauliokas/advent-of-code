import type { Blueprint, Material } from './day19.input';

type State = {
  robots: Record<Material, number>;
  materials: Record<Material, number>;
  ignored: Set<Material>;
  timeLeft: number;
};

const canBuild = (materials: Record<Material, number>, recipe: Partial<Record<Material, number>>): boolean => {
  for (const mat in recipe) {
    if (materials[mat as Material] < -recipe[mat as Material]!) return false;
  }
  return true;
};

const changeObj = (
  obj: Record<Material, number>,
  ...changes: Partial<Record<Material, number>>[]
): Record<Material, number> => {
  const newObj = { ...obj };
  for (const change of changes) {
    // eslint-disable-next-line guard-for-in
    for (const key in change) {
      newObj[key as Material] = newObj[key as Material] + change[key as Material]!;
    }
  }
  return newObj;
};

function* nextStates(
  { recipes, limits }: Blueprint,
  { robots, materials, timeLeft, ignored }: State,
): Generator<State> {
  if (timeLeft === 1) {
    yield {
      robots,
      materials: changeObj(materials, robots),
      timeLeft: 0,
      ignored: new Set(),
    };
    return;
  }

  const buildable: Material[] = (['ore', 'clay', 'obsidian', 'geode'] as Material[]).filter(
    (mat) => robots[mat] < limits[mat] && !ignored.has(mat) && canBuild(materials, recipes[mat]),
  );

  if (buildable.includes('geode')) {
    yield {
      robots: changeObj(robots, { geode: +1 }),
      materials: changeObj(materials, recipes.geode, robots),
      timeLeft: timeLeft - 1,
      ignored: new Set(),
    };
    return;
  }

  yield {
    robots,
    materials: changeObj(materials, robots),
    timeLeft: timeLeft - 1,
    ignored: new Set(buildable),
  };

  for (const mat of buildable) {
    yield {
      robots: changeObj(robots, { [mat]: +1 }),
      materials: changeObj(materials, recipes[mat], robots),
      timeLeft: timeLeft - 1,
      ignored: new Set(),
    };
  }
}

const arithmeticSum = (n: number, a1: number, d: number): number => a1 * n + ((n * (n - 1)) / 2) * d;

const optimizeForGeodes = (blueprint: Blueprint, timeLeft: number): number => {
  let maxGeodes = 0;
  const queue: State[] = [
    {
      robots: { ore: 1, clay: 0, obsidian: 0, geode: 0 },
      materials: { ore: 0, clay: 0, obsidian: 0, geode: 0 },
      timeLeft,
      ignored: new Set(),
    },
  ];

  while (queue.length) {
    const state = queue.pop()!;
    if (state.timeLeft === 0) {
      if (state.materials.geode > maxGeodes) {
        maxGeodes = state.materials.geode;
      }
      continue;
    }
    if (arithmeticSum(state.timeLeft + 1, state.materials.geode, 1) <= maxGeodes) {
      continue;
    }
    const turns = nextStates(blueprint, state);
    queue.push(...turns);
  }

  return maxGeodes;
};

export const solvePart1 = (blueprints: Blueprint[]): number =>
  blueprints.reduce((acc, blueprint) => acc + blueprint.blueprintId * optimizeForGeodes(blueprint, 24), 0);

export const solvePart2 = (blueprints: Blueprint[]): number =>
  blueprints.slice(0, 3).reduce((acc, blueprint) => acc * optimizeForGeodes(blueprint, 32), 1);
