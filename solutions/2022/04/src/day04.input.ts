export type TaskRange = [number, number];
export type AssignmentPair = [TaskRange, TaskRange];

export default (input: string): AssignmentPair[] =>
  input
    .trim()
    .split('\n')
    .map(
      (line) =>
        line
          .split(',')
          .map((range) => range.split('-').map((number) => parseInt(number, 10)) as TaskRange) as AssignmentPair,
    );
