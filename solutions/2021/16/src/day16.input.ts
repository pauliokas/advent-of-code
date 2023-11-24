import { Readable } from 'stream';

export default (input: string): Readable => {
  const [packet] = input.trim().split('\n');

  let alreadyRead = 0;
  return new Readable({
    encoding: 'utf8',
    read(size: number) {
      const startIdx = Math.floor(alreadyRead / 4);
      const endIdx = Math.min(packet.length, Math.ceil((alreadyRead + size) / 4));

      for (let i = startIdx; i < endIdx; i += 1) {
        const bin = `000${parseInt(packet[i], 16).toString(2)}`.slice(-4);
        const cont = this.push(bin.substring(i === startIdx ? alreadyRead % 4 : 0, size - i * 4));

        alreadyRead += 4 - (size % 4);

        if (!cont) {
          return;
        }
      }
    },
  });
};
