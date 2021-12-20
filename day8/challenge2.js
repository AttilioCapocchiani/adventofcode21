class Entry {
    constructor (str) {
        const [ input, output ] = str.split(' | ')
        this.input = input.trim().split(' ')
        this.output = output.trim()
    }

    get decoded () {
        const map = {}
        const keys = {}

        map['1'] = this.input.find(( { length } ) => length === 2)
        map['7'] = this.input.find(( { length } ) => length === 3)
        keys['0'] = [...map['7']].filter(e => ![...map['1']].includes(e))

        map['6'] = this.findSix(map['1'])
        keys['2'] = [...map['1']].filter(x => ![...map['6']].includes(x))
        keys['5'] = [...map['1']].filter(x => [...map['6']].includes(x))

        map['5'] = this.findFive(map['2'])
        map['2'] = this.findTwo(map['2'])
        map['3'] = this.findThree(map['6'])


        return map
    }

    findTwo (fivePattern) {

    }

    findFive (twoPattern) {
        let output
        this.input.filter(({ length }) => length === 5).forEach(option => {
            if (option.includes(twoPattern)) {
                output = option
            }
        }

        return output
    }

    findSix (onePattern) {
        let output = ''
        this.input
            .filter(({ length }) => length === 6)
            .forEach(option => {
                if (option.includes(onePattern.charAt(0)) != option.includes(onePattern.charAt(1))) output = option;
            }
        )  ;
        return output;
    }
}


const data = require('fs').readFileSync('input.txt', 'utf8').split('\n')

console.log(
    data
        .map(s => new Entry(s))
        .map(e => e.decoded)
)