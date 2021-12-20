const data = require('fs').readFileSync('input.txt', 'utf8').split('\n')

console.log(data)

const lowPoints = []

data.forEach((row, rIndex) => {
    [...row].forEach((e, cIndex) => {
        const current = e
        const prev = data[rIndex][cIndex - 1]
        const next = data[rIndex][cIndex + 1]
        const top = data[rIndex - 1] ? data[rIndex - 1][cIndex] : null
        const bottom = data[rIndex + 1] ? data[rIndex + 1][cIndex] : null

        if (
            (!prev || parseInt(current) < parseInt(prev)) &&
            (!next || parseInt(current) < parseInt(next)) &&
            (!top || parseInt(current) < parseInt(top)) &&
            (!bottom || parseInt(current) < parseInt(bottom))
        ) {
            lowPoints.push([e])
        }
    })
})

console.log(lowPoints.reduce((a, b) => a + parseInt(b) + 1, 0))