export type NumericShout = {
  type: 'number';
  num: number;
};

export type OperationType = '+' | '-' | '*' | '/';
export type OperationShout = {
  type: 'operation';
  op: OperationType;
  arg1: string;
  arg2: string;
};

export type Shout = NumericShout | OperationShout;

export default (input: string): Record<string, Shout> =>
  Object.fromEntries(
    input
      .trim()
      .split('\n')
      .map((line) => {
        const [name, value] = line.split(': ');
        const num = parseInt(value, 10);
        if (!Number.isNaN(num)) {
          return [name, { type: 'number', num }];
        }

        const [arg1, op, arg2] = value.split(' ');
        return [name, { type: 'operation', op: op as OperationType, arg1, arg2 }];
      }),
  );
