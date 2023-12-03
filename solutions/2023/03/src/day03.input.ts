export type Coords = { x: number; y: number };

export type Part = { type: 'part'; part: string; coords: Coords };

export type PartNumber = { type: 'number'; number: number; coordsStart: Coords; coordsEnd: Coords };

const chrCode0 = '0'.charCodeAt(0);
const chrCode9 = '9'.charCodeAt(0);

export default (input: string): (Part | PartNumber)[] => {
  const parsedObjects: (Part | PartNumber)[] = [];

  const lines = input.trim().split('\n');
  for (let y = 0; y < lines.length; y += 1) {
    const line = lines[y];

    let numBuffer = '';
    let numBufferStart = 0;
    for (let x = 0; x < line.length; x += 1) {
      const char = line[x];

      if (chrCode0 <= char.charCodeAt(0) && char.charCodeAt(0) <= chrCode9) {
        if (!numBuffer) numBufferStart = x;
        numBuffer += line[x];
        continue;
      }

      if (numBuffer) {
        parsedObjects.push({
          type: 'number',
          number: Number(numBuffer),
          coordsStart: { x: numBufferStart, y },
          coordsEnd: { x: x - 1, y },
        });
        numBuffer = '';
      }

      if (char !== '.') {
        parsedObjects.push({
          type: 'part',
          part: char,
          coords: { x, y },
        });
      }
    }

    if (numBuffer) {
      parsedObjects.push({
        type: 'number',
        number: Number(numBuffer),
        coordsStart: { x: numBufferStart, y },
        coordsEnd: { x: line.length - 1, y },
      });
      numBuffer = '';
    }
  }

  return parsedObjects;
};
