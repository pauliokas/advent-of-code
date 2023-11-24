export type Coords = { x: number; y: number };

const coordsRegex =
  /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;

const calcDistance = (a: Coords, b: Coords): number => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

export default (input: string): { sensor: Coords; beacon: Coords; radius: number }[] => {
  return input
    .trim()
    .split('\n')
    .map((line) => coordsRegex.exec(line)!)
    .map(([, ...groups]) => groups.map((group) => parseInt(group, 10))!)
    .map(([sensorX, sensorY, beaconX, beaconY]) => ({
      sensor: { x: sensorX, y: sensorY },
      beacon: { x: beaconX, y: beaconY },
      radius: calcDistance({ x: sensorX, y: sensorY }, { x: beaconX, y: beaconY }),
    }));
};
