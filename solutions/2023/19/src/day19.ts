import type { Part, Rule } from './day19.input.js';

type Range = { start: number; end: number };

export const solvePart1 = ({ parts, workflows }: { parts: Part[]; workflows: Record<string, Rule[]> }): number => {
  const acceptedParts: Part[] = [];
  for (const part of parts) {
    let workflow = 'in';
    while (workflow !== 'A' && workflow !== 'R') {
      const rules = workflows[workflow];
      for (const rule of rules) {
        let res = null;
        if (rule.type === 'identity') res = rule.dest;
        else if (rule.sign === '<' && part[rule.component] < rule.target) res = rule.dest;
        else if (rule.sign === '>' && part[rule.component] > rule.target) res = rule.dest;

        if (res === null) continue;

        workflow = res;
        break;
      }
    }

    if (workflow === 'A') acceptedParts.push(part);
  }

  return acceptedParts.reduce((acc, { x, m, a, s }) => acc + x + m + a + s, 0);
};

type PartRange = Record<keyof Part, Range>;

export const solvePart2 = ({ workflows }: { parts: Part[]; workflows: Record<string, Rule[]> }): number => {
  const initialRanges: PartRange = {
    x: { start: 1, end: 4000 },
    m: { start: 1, end: 4000 },
    a: { start: 1, end: 4000 },
    s: { start: 1, end: 4000 },
  };

  const res: PartRange[] = [];
  const queue: { part: PartRange; workflow: Rule['dest']; ruleIdx: number }[] = [
    { part: initialRanges, workflow: 'in', ruleIdx: 0 },
  ];
  while (queue.length) {
    const { part, workflow, ruleIdx } = queue.shift()!;

    if (workflow === 'R') continue;
    if (workflow === 'A') {
      res.push(part);
      continue;
    }

    const rule = workflows[workflow][ruleIdx];
    if (rule.type === 'identity') {
      queue.push({ part, workflow: rule.dest, ruleIdx: 0 });
      continue;
    }

    const { component, sign, target } = rule;

    if (part[component].start <= target && target <= part[component].end) {
      let conditionSatisfied: Range | undefined;
      let conditionFailed: Range | undefined;

      if (sign === '<') {
        conditionSatisfied = { start: part[component].start, end: target - 1 };
        conditionFailed = { start: target, end: part[component].end };
      }

      if (sign === '>') {
        conditionFailed = { start: part[component].start, end: target };
        conditionSatisfied = { start: target + 1, end: part[component].end };
      }

      if (conditionSatisfied) {
        queue.push({ part: { ...part, [component]: conditionSatisfied }, workflow: rule.dest, ruleIdx: 0 });
      }
      if (conditionFailed) {
        queue.push({ part: { ...part, [component]: conditionFailed }, workflow, ruleIdx: ruleIdx + 1 });
      }
    }

    if (part[component].end < target && sign === '<') queue.push({ part, workflow: rule.dest, ruleIdx: 0 });
    if (target < part[component].start && sign === '>') queue.push({ part, workflow: rule.dest, ruleIdx: 0 });
  }

  return res
    .map((part) =>
      Object.values(part)
        .map(({ start, end }) => end - start + 1)
        .reduce((a, b) => a * b, 1),
    )
    .reduce((a, b) => a + b, 0);
};
