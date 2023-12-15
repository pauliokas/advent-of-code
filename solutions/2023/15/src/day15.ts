type BaseInstruction = {
  label: string;
  box: number;
  // focalLength: number;
};

type AddInstruction = BaseInstruction & {
  type: 'add';
  focalLength: number;
};

type RemInstruction = BaseInstruction & { type: 'rem' };

type Instruction = AddInstruction | RemInstruction;

type Lens = {
  label: string;
  focalLength: number;
};

type Box = {
  containedLenses: Set<string>;
  lenses: Lens[];
};

const hash = (str: string): number => {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    const charCode = str.charCodeAt(i);
    h = ((h + charCode) * 17) % 256;
  }

  return h;
};

const parseInstruction = (instruction: string): Instruction => {
  const eqPosition = instruction.indexOf('=');
  if (eqPosition > 0) {
    const label = instruction.slice(0, eqPosition);
    return {
      type: 'add',
      label,
      focalLength: Number(instruction.slice(eqPosition + 1)),
      box: hash(label),
    };
  }

  const label = instruction.slice(0, -1);
  return {
    type: 'rem',
    label,
    box: hash(label),
  };
};

export const solvePart1 = (input: string[]): number => {
  return input.reduce((acc, line) => acc + hash(line), 0);
};

export const solvePart2 = (input: string[]): number => {
  const instructions = input.map(parseInstruction);
  const boxes: Box[] = new Array(256).fill(undefined).map(() => ({ containedLenses: new Set(), lenses: [] }));
  for (const instruction of instructions) {
    const box = boxes[instruction.box];
    const lensInside = box.containedLenses.has(instruction.label);
    const lensIdx = lensInside ? box.lenses.findIndex(({ label }) => label === instruction.label) : box.lenses.length;

    if (instruction.type === 'add') {
      box.containedLenses.add(instruction.label);
      box.lenses.splice(lensIdx, 1, { label: instruction.label, focalLength: instruction.focalLength });
    } else if (instruction.type === 'rem') {
      box.containedLenses.delete(instruction.label);
      box.lenses.splice(lensIdx, 1);
    } else {
      throw new Error('unknown instruction type');
    }
  }

  let res = 0;
  for (let boxIdx = 0; boxIdx < 256; boxIdx += 1) {
    const box = boxes[boxIdx];
    for (let lenseIdx = 0; lenseIdx < box.lenses.length; lenseIdx += 1) {
      const lense = box.lenses[lenseIdx];
      res += (boxIdx + 1) * (lenseIdx + 1) * lense.focalLength;
    }
  }

  return res;
};
