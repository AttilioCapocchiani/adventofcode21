const data = require('fs').readFileSync('input.txt', 'utf-8')
    .split(':')[1]
    .trim()

console.log(data)

let [ tx1, tx2 ] = data.split(',')[0].trim().split('..')
let [ ty1, ty2 ] = data.split(',')[1].trim().split('..')

tx1 = tx1.substring(2)
ty1 = ty1.substring(2)

let maxy = -10000
let velcount = 0
for (let ivx = -1000; ivx < 1000; ++ivx) {
  outer: for (let ivy = -1000; ivy < 1000; ++ivy) {
    let thismaxy = 0
    let probex = 0
    let probey = 0
    let vx = ivx
    let vy = ivy
    for (let i = 0; i < 1000; ++i) {
      probex += vx
      probey += vy
      vx -= Math.sign(vx)
      vy -= 1
      if (probey > thismaxy) thismaxy = probey
      if (probex >= tx1 && probex <= tx2 && probey >= ty1 && probey <= ty2) {
        // inside
        ++velcount
        if (thismaxy > maxy) {
          maxy = thismaxy
        }
        continue outer
      }
    }
  }
}

console.log(maxy)
console.log(velcount)
