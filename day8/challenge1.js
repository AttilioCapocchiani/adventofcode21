class Entry {
    constructor (str) {
        const [ input, output ] = str.split(' | ')
        this.input = input
        this.output = output
    }

    get knownPatternsCount () {
        const result = []

        for (let digit of this.output.split(' ')) {
            switch (digit.length) {
                case 2:
                case 3:
                case 4:
                case 7:
                    result.push(digit)
            }
        }

        return result.length
    }
}


const data = require('fs').readFileSync('input.txt', 'utf8').split('\n')

console.log(data.reduce((acc, curr) =>  acc + new Entry(curr).knownPatternsCount, 0))