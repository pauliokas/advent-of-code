export type TestParameters = {
  divisibleBy: number;
  ifTrue: number;
  ifFalse: number;
};

export interface Monkey {
  items: number[];
  operation: (old: number) => number;
  test: TestParameters;
}

const operations = {
  '+': (arg1: number, arg2: number) => arg1 + arg2,
  '*': (arg1: number, arg2: number) => arg1 * arg2,
} as const;

const startingItemsRegex = /Starting items: (.*)$/;
const operationRegex = /Operation: new = (.+?) (.+?) (.+?)$/;
const testRegex = /Test: divisible by (\d+)$/;
const ifTrueRegex = /If true: throw to monkey (\d+)$/;
const ifFalseRegex = /If false: throw to monkey (\d+)$/;

const parseOperation = (str: string): ((num: number) => number) => {
  const [arg1, op, arg2] = operationRegex.exec(str)!.slice(1);
  const operation = operations[op as keyof typeof operations];

  if (arg1 === 'old' && arg2 === 'old') {
    return (old) => operation(old, old);
  }

  if (arg1 === 'old') {
    const arg2Num = parseInt(arg2, 10);
    return (old) => operation(old, arg2Num);
  }

  throw new Error(`Couldn't parse operation: ${str}`);
};

const parseTest = (testStr: string, ifTrueStr: string, ifFalseStr: string): TestParameters => {
  const divisibleBy = parseInt(testRegex.exec(testStr)![1], 10);
  const ifTrue = parseInt(ifTrueRegex.exec(ifTrueStr)![1], 10);
  const ifFalse = parseInt(ifFalseRegex.exec(ifFalseStr)![1], 10);

  return {
    divisibleBy,
    ifTrue,
    ifFalse,
  };
};

export default (input: string): Monkey[] => {
  return input
    .trim()
    .split('\n\n')
    .map((monkeyInput) => monkeyInput.split('\n'))
    .map(([, startingItems, operation, test, ifTrue, ifFalse]): Monkey => {
      return {
        items: startingItemsRegex
          .exec(startingItems)![1]
          .split(', ')
          .map((item) => parseInt(item, 10)),
        operation: parseOperation(operation),
        test: parseTest(test, ifTrue, ifFalse),
      };
    });
};
