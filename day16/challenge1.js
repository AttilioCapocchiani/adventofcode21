const LITERAL = 4

const packetLengthMap = {
  '0': 15,
  '1': 11
}

class Packet {
  version = 0
  type = 0
  lengthType = ''
  subPackets = []
  bits = []

  /**
   *
   * @param {string} binary
   */
  constructor(binary, pad) {
    if (pad && !binary.length % 4 === 0) {
      binary = binary.padStart(binary.length + (4 - binary.length % 4), '0')
    }
    console.log(binary)
    console.log(binary.length)
    console.log('Version %s -> %d', binary.substring(0, 3), parseInt(binary.substring(0, 3), 2))
    console.log('Type %s -> %d', binary.substring(3, 6), parseInt(binary.substring(3, 6), 2))
    this.version = parseInt(binary.substring(0, 3), 2)
    this.type = parseInt(binary.substring(3, 6), 2)

    if (this.type === LITERAL) {
      let stop = false
      let offset = 6
      while (!stop) {
          this.bits.push(binary.substring(offset, offset + 5))
          if (binary.charAt(offset) === '0' || offset === binary.length - 1) {
            stop = true
          } else {
            offset += 5
          }
      }
    } else {
        this.lengthType = binary.charAt(6)
        const length = parseInt(binary.substring(7, 7 + packetLengthMap[this.lengthType]), 2)

        let consumedBytes = 0
        while (consumedBytes < length) {
          console.log('%d / %d', consumedBytes, length)
          const newPacket = new Packet(binary.substring(7 + consumedBytes + packetLengthMap[this.lengthType]))
          this.subPackets.push(newPacket)
          consumedBytes += newPacket.length
        }
    }
  }

  get length () {
    return 3 + 3 + (this.type === LITERAL ? this.bits.length * 4 : 1 + this.subPackets.reduce((acc, curr) => acc + curr.length, 0))
  }
}

const data = require('fs').readFileSync('sample.txt', 'utf8')

const packet = new Packet(parseInt(data, 16).toString(2), true)

console.log(packet)
