export interface File {
  type: 'f';
  name: string;
  size: number;
}

export interface Dir {
  type: 'd';
  name: string;
  contents: Array<Dir | File>;
}

const parseCommands = (commands: { cmd: string; arg?: string; output: string[] }[]): Dir => {
  const dirStack: Dir[] = [{ type: 'd', name: '/', contents: [] }];

  for (let i = 1; i < commands.length; i += 1) {
    const { cmd, arg, output } = commands[i];

    if (cmd === 'cd') {
      if (arg === '..') {
        dirStack.pop();
        continue;
      }

      const currentDir = dirStack[dirStack.length - 1];
      const destDir = currentDir.contents.find(({ type, name }) => type === 'd' && name === arg);
      dirStack.push(destDir as Dir);
      continue;
    }

    if (cmd === 'ls') {
      const dir: Dir = dirStack[dirStack.length - 1];

      output
        .map((line): File | Dir => {
          const [sizeOrType, name] = line.split(' ');
          if (sizeOrType === 'dir') return { type: 'd', name, contents: [] };
          return { type: 'f', name, size: parseInt(sizeOrType, 10) };
        })
        .forEach((child) => {
          dir.contents.push(child);
        });
    }
  }

  return dirStack[0];
};

export default (input: string): Dir => {
  const commands = input
    .split(/\$ /)
    .slice(1)
    .map((asdf) => {
      const [cmdLine, ...output] = asdf.trim().split('\n');
      const [cmd, arg] = cmdLine.split(' ');
      return { cmd, arg, output };
    });

  return parseCommands(commands);
};
