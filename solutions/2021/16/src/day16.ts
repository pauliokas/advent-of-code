import { Readable } from 'stream';

type PacketSum = { version: number; typeId: 0; operands: Packet[] };
type PacketProduct = { version: number; typeId: 1; operands: Packet[] };
type PacketMin = { version: number; typeId: 2; operands: Packet[] };
type PacketMax = { version: number; typeId: 3; operands: Packet[] };
type PacketLiteral = { version: number; typeId: 4; literal: number };
type PacketGt = { version: number; typeId: 5; operands: [Packet, Packet] };
type PacketLt = { version: number; typeId: 6; operands: [Packet, Packet] };
type PacketEq = { version: number; typeId: 7; operands: [Packet, Packet] };
type PacketMulti = PacketSum | PacketProduct | PacketMin | PacketMax;
type PacketBinary = PacketGt | PacketLt | PacketEq;
type Packet = PacketBinary | PacketMulti | PacketLiteral;
type TypeId = Packet['typeId'];

const parsePacket = (stream: Readable): Packet | null => {
  const versionStr: string = stream.read(3);
  if (!versionStr) {
    return null;
  }

  const version = parseInt(versionStr, 2);
  const typeId = parseInt(stream.read(3), 2) as TypeId;

  let packet: Packet | undefined;

  if (typeId === 4) {
    let endMarker = '1';
    let literalBin = '';
    while (endMarker === '1') {
      endMarker = stream.read(1);
      literalBin += stream.read(4);
    }
    packet = {
      version,
      typeId,
      literal: parseInt(literalBin, 2),
    };
  } else {
    const lengthTypeId = stream.read(1);

    packet = {
      version,
      typeId,
      operands: [] as any,
    };
    if (lengthTypeId === '0') {
      const bitsLength = parseInt(stream.read(15), 2);

      const innerStream = new Readable({ encoding: 'utf-8' });
      innerStream.push(stream.read(bitsLength));
      innerStream.push(null);

      while (true) {
        const operand = parsePacket(innerStream);
        if (!operand) {
          break;
        }
        (packet as PacketBinary).operands.push(operand);
      }
    } else {
      const subpacketCount = parseInt(stream.read(11), 2);
      while ((packet as PacketBinary).operands.length < subpacketCount) {
        (packet as PacketMulti).operands.push(parsePacket(stream)!);
      }
    }
  }

  return packet!;
};

const evalPacket = (packet: Packet): number => {
  if (packet.typeId === 4) {
    return packet.literal;
  }

  const operands = packet.operands.map(evalPacket);
  switch (packet.typeId) {
    case 0:
      return operands.reduce((sum, val) => sum + val, 0);
    case 1:
      return operands.reduce((product, val) => product * val, 1);
    case 2:
      return Math.min(...operands);
    case 3:
      return Math.max(...operands);
    case 5:
      return operands[0] > operands[1] ? 1 : 0;
    case 6:
      return operands[0] < operands[1] ? 1 : 0;
    case 7:
      return operands[0] === operands[1] ? 1 : 0;
    default:
      throw new Error(`unknown typeId: ${(packet as any).typeId}`);
  }
};

export const solvePart1 = (input: Readable): number => {
  const packet = parsePacket(input);

  const packets = [packet];
  let versionSum = 0;
  while (packets.length) {
    const currentPacket = packets.shift();
    versionSum += currentPacket!.version;
    packets.push(...((currentPacket as any).operands || []));
  }
  return versionSum;
};

export const solvePart2 = (input: Readable): number => {
  const packet = parsePacket(input);
  return evalPacket(packet!);
};
