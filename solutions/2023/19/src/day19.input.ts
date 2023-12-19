export type Part = {
  x: number;
  m: number;
  a: number;
  s: number;
};

export type IdentityRule = {
  type: 'identity';
  dest: 'A' | 'R' | string;
};

export type ComparisonRule = {
  type: 'comparison';
  component: keyof Part;
  sign: '<' | '>';
  target: number;
  dest: 'A' | 'R' | string;
};

export type Rule = IdentityRule | ComparisonRule;

const workflowRegex = /(?<name>.+)\{(?<rulesStr>.+)}/;
const ruleRegex = /(?:(?<component>[xmas])(?<sign>[<>])(?<target>\d+):)?(?<dest>.+)/;

const parsePart = (line: string): Part =>
  line
    .slice(1, -1)
    .split(',')
    .map((categoryStr): Partial<Part> => {
      const [category, rating] = categoryStr.split('=');
      return { [category]: Number(rating) };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), { x: 0, m: 0, a: 0, s: 0 }) as Part;

const parseWorkflow = (workflowStr: string): Record<string, Rule[]> => {
  const { name, rulesStr } = workflowRegex.exec(workflowStr)!.groups!;
  const rules: Rule[] = rulesStr.split(',').map((ruleStr) => {
    const { component, sign, target, dest } = ruleRegex.exec(ruleStr)!.groups!;
    if (component === undefined) return { type: 'identity', dest };
    return {
      type: 'comparison',
      component: component as ComparisonRule['component'],
      sign: sign as ComparisonRule['sign'],
      target: target !== undefined ? Number(target) : target,
      dest,
    };
  });
  return { [name]: rules };
};

export default (input: string): { parts: Part[]; workflows: Record<string, Rule[]> } => {
  const [workflowsStr, partsStr] = input.trim().split('\n\n');

  const workflows = workflowsStr
    .split('\n')
    .map(parseWorkflow)
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  const parts = partsStr.split('\n').map(parsePart);

  return { parts, workflows };
};
