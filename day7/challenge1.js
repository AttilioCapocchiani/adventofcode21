const data = require('fs').readFileSync('input.txt', 'utf8').split(',').map(Number)

const max = Math.max(...data)
const min = Math.min(...data)

function getDiff(n, pivot) {
    return Math.abs(n - pivot)
}

const pivotMap = {}
const result = {
    pivot: '',
    fuel: +Infinity
}

for (let pivot = min; pivot <= max; pivot++) {
    let diff = data.map(n => getDiff(n, pivot))

    diff.forEach(n => {
        if (!pivotMap[pivot]) {
            pivotMap[pivot] = n
        } else {
            pivotMap[pivot] += n
        }
    })
}

Object.entries(pivotMap).forEach(([key, value]) => {
    if (value < result.fuel) {
        result.pivot = key
        result.fuel = value
    }
})

console.log(result)
