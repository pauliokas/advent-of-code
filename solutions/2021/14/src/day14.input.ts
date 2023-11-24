export default (input: string): { template: string[]; rules: Record<string, string> } => {
  const lines = input.trim().split('\n');

  return {
    template: lines[0].split(''),
    rules: lines
      .slice(2)
      .map((line) => line.split(' -> '))
      .reduce((obj, [recipe, output]) => Object.assign(obj, { [recipe]: output }), {}),
  };
};
