const input: string = new TextDecoder('utf-8').decode(await Deno.readFileSync('input.txt'))

function solve(input: string): number {
  let map = input.split('\n').map(row => row.split(''))
  let step: number = 0

  while (true) {
    step++

    console.log('Now testing with %d', step)
    const nextMap = map.map(row => row.map(c => c))

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const char: string = map[i][j]

        if (char === '>') {
          const nextJ: number = (j + 1) % map[i].length;
          if (map[i][nextJ] === '.') {
            nextMap[i][nextJ] = '>';
            nextMap[i][j] = '.';
          }
        }
      }
    }

    const nextNextMap = nextMap.map((row) => row.map((c) => c));
    for (let i = 0; i < nextMap.length; i++) {
      for (let j = 0; j < nextMap[i].length; j++) {
        const char: string = nextMap[i][j];
        if (char === 'v') {
          const nextI: number = (i + 1) % nextMap.length;
          if (nextMap[nextI][j] === '.') {
            nextNextMap[nextI][j] = 'v';
            nextNextMap[i][j] = '.';
          }
        }
      }
    }

    if (
      map.map((row) => row.join('')).join('\n') ===
      nextNextMap.map((row) => row.join('')).join('\n')
    ) {
      break;
    }

    map = nextNextMap;
  }

  return step
}

solve(input)