const fs = require('fs');
var rawData = fs.readFileSync(__dirname + '/input.txt').toString();
var data = rawData.split(/\r?\n/)
var total = 0

data.forEach(element => {
    var samples = element.split('|')[0].trim().split(' ')
    numbers = Array(7)
    var key = Array(7)

    numbers[1] = samples.find(x => x.length === 2)
    numbers[7] = samples.find(x => x.length === 3)
    key[0] = [...numbers[7]].filter(x => ![...numbers[1]].includes(x))

    numbers[6] = findSix(samples.filter(x => x.length === 6), numbers[1])
    key[2] = [...numbers[1]].filter(x => ![...numbers[6]].includes(x));
    key[5] = [...numbers[1]].filter(x => [...numbers[6]].includes(x));

    numbers[5] = findFive(samples.filter(x => x.length === 5), key)
    numbers[2] = findTwo(samples.filter(x => x.length === 5), key)
    numbers[3] = findThree(samples.filter(x => x.length === 5), key)
    key[4] = [...numbers[2] + key[5]].filter(x => ![...numbers[3]].includes(x))
    key[1] = [...numbers[5] + key[2]].filter(x => ![...numbers[3]].includes(x))

    numbers[4] = samples.find(x => x.length === 4)
    key[6] = [...numbers[5] + key[2]].filter(x => ![...numbers[4] + key[0]].includes(x))

    numbers[8] = samples.find(x => x.length === 7)
    numbers[0] = findZero(samples.filter(x => x.length === 6), key)
    key[3] = [...numbers[8]].filter(x => ![...numbers[0]].includes(x))

    numbers[9] = findNine(samples.filter(x => x.length === 6), key)

    numbers = numbers.map(number => number.split('').sort().join(''))
    var answer = ''
    element.split('|')[1].trim().split(' ').forEach(question => {
        question = question.split('').sort().join('')
        answer += numbers.indexOf(question).toString()
        if (answer == -1)
            console.log(element)
    })
    total += parseInt(answer)
})

console.log(total)


function findSix(options, one) {
    var output
    options.forEach(option => {
        if (option.includes(one.charAt(0)) != option.includes(one.charAt(1))) output = option
    })
    return output
}

function findFive(options, key) {
    var output
    options.forEach(option => {
        if (!option.includes(key[2])) output = option
    })
    return output
}

function findTwo(options, key) {
    var output
    options.forEach(option => {
        if (!option.includes(key[5])) output = option
    })
    return output
}

function findThree(options, key) {
    var output
    options.forEach(option => {
        if (option.includes(key[5]) && option.includes(key[2])) output = option
    })
    return output
}

function findZero(options, key) {
    var output
    options.forEach(option => {
        if (option.includes(key[2]) && option.includes(key[4])) output = option
    })
    return output
}

function findNine(options, key) {
    var output
    options.forEach(option => {
        if (!option.includes(key[4])) output = option
    })
    return output
}