const isUnique = (arr: string[]) => {
  const uniqueSet = new Set();
  for (let i = 0; i < arr.length; i += 1) {
    const char = arr[i];
    if (uniqueSet.has(char)) {
      return false;
    }
    uniqueSet.add(char);
  }
  return true;
};

const findUniqueWindow =
  (windowSize: number) =>
  (input: string): number => {
    const signalWindow = ['', ...input.slice(0, windowSize - 1).split('')];
    for (let i = windowSize - 1; i < input.length; i += 1) {
      signalWindow.push(input[i]);
      signalWindow.shift();

      if (isUnique(signalWindow)) {
        return i + 1;
      }
    }

    return -1;
  };

export const solvePart1 = findUniqueWindow(4);

export const solvePart2 = findUniqueWindow(14);
