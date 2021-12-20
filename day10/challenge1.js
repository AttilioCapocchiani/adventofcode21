const parenthesis = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const score = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}



function checkParenthesis(str) {
  let errorScore = 0
  const stack = []
  str.split('').forEach(char => {
    if (['(', '[', '{', '<'].includes(char)) {
      stack.push(char)
    } else {
      if (parenthesis[stack.pop()] !== char) {
        errorScore += score[char]
        return
      }
    }
  })

  return errorScore
}

const data = require('fs').readFileSync('input.txt', 'utf8').split('\n')

console.log(data.reduce((acc, curr) => acc + checkParenthesis(curr), 0))
