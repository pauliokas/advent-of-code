import type { Monkey } from './day11.input';

const calcMonkeyBusiness = (
  monkeys: Monkey[],
  rounds: number,
  manageWorryLevel: (worryLevel: number) => number,
): number => {
  const itemInspectionCounts = new Array(monkeys.length).fill(0);

  for (let round = 0; round < rounds; round += 1) {
    for (let monkeyIdx = 0; monkeyIdx < monkeys.length; monkeyIdx += 1) {
      const monkey = monkeys[monkeyIdx];
      itemInspectionCounts[monkeyIdx] += monkey.items.length;

      while (monkey.items.length > 0) {
        const worryLevel = monkey.items.pop()!;

        const newWorryLevel = manageWorryLevel(monkey.operation(worryLevel));

        const targetMonkeyIdx =
          newWorryLevel % monkey.test.divisibleBy === 0 ? monkey.test.ifTrue : monkey.test.ifFalse;
        monkeys[targetMonkeyIdx].items.push(newWorryLevel);
      }
    }
  }

  return itemInspectionCounts
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1);
};

export const solvePart1 = (monkeys: Monkey[]): number => {
  return calcMonkeyBusiness(monkeys, 20, (worryLevel) => Math.floor(worryLevel / 3));
};

export const solvePart2 = (monkeys: Monkey[]): number => {
  const totalProduct = monkeys
    .map(({ test: { divisibleBy } }) => divisibleBy)
    .reduce((product, num) => product * num, 1);

  return calcMonkeyBusiness(monkeys, 10000, (worryLevel) => worryLevel % totalProduct);
};
