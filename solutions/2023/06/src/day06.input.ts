export default (input: string): [string, string] => {
  const [timeLine, distanceLine] = input.trim().split('\n');
  return [timeLine.replace(/.+:\s+/, ''), distanceLine.replace(/.+:\s+/, '')];
};
