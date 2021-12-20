function polymerize(string) {
  let result = ''
  for (let offset = 0; offset < string.length - 1; offset++) {
    const left = string[offset]
    const right = string[offset + 1]

    result += left + rules[left + right]
  }

  result += template[template.length - 1]
  return result
}

const data = require('fs').readFileSync('input.txt', 'utf8')

const [template, rawRules] = data.split('\n\n')

const rules = rawRules.split('\n').reduce((acc, rule) => {
  const [key, value] = rule.split(' -> ')
  acc[key] = value
  return acc
}, {})

let result = ''

const steps = 40

for (let i = 0; i < steps; i++) {
    if (!result) result = template

    result = polymerize(result)
    console.log(i, result.length)
}

console.log(result.length)

let min = { letter: '', value: Number.MAX_SAFE_INTEGER }
let max = { letter: '', value: -1 }

const occurrences = result.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1
    return acc
}, {})

console.log(occurrences)

Object.entries(occurrences).forEach(([letter, value]) => {
    if (value < min.value) {
        min.letter = letter
        min.value = value
    }

    if (value > max.value) {
        max.letter = letter
        max.value = value
    }
})

console.log(min)
console.log(max)

console.log(max.value - min.value)