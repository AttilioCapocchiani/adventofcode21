import * as fs from 'fs';

function isNumber(test: string): Boolean {
  return /^-?\d+$/.test(test);
}

enum Operator { ADD = 'ADD', MUL = 'MUL', INP = 'INP', DIV = 'DIV', MOD = 'MOD', EQL = 'EQL' }

interface Instruction {
  operator: Operator;

  args: Array<any>;
}

interface State {
  w: Number,
  x: Number,
  y: Number,
  z: Number
}

const operatorsMapping = {
  'inp': Operator.INP,
  'add': Operator.ADD,
  'mul': Operator.MUL,
  'mod': Operator.MOD,
  'div': Operator.DIV,
  'eql': Operator.EQL
}

const data: any = fs.readFileSync('input.txt', 'utf8')

function parse(code: string): Array<Instruction> {
  const instructions: Array<Instruction> = []
  const lines: Array<string> = code.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const [operator, ...args] = lines[i].split(' ')
    instructions.push({
      operator: operatorsMapping[operator],
      args
    })
  }

  return instructions
}

function execute(instruction: Instruction, state: State, model: string) {
  const [a, b] = instruction.args
  // console.log('State before %s, Model before %s', state, model)
  // console.log('Instruction %s', instruction)
  switch (instruction.operator) {
    case Operator.INP:
      state[instruction.args[0]] = parseInt(model.charAt(0))
      model = model.substr(1)
      break
    case Operator.ADD:

      if (isNumber(b)) {
        state[a] = parseInt(state[a] + parseInt(b))
      } else {
        state[a] = parseInt(state[a] + state[b])
      }
      break
    case Operator.MUL:
      if (isNumber(b)) {
        state[a] = parseInt(state[a] * parseInt(b))
      } else {
        state[a] = parseInt(state[a] * state[b])
      }

      break
    case Operator.DIV:
      if (isNumber(b)) {
        state[a] = parseInt(state[a] / parseInt(b))
      } else {
        state[a] = parseInt(state[a] / state[b])
      }
      break
    case Operator.MOD:
      if (isNumber(b)) {
        state[a] = parseInt(state[a] % parseInt(b))
      } else {
        state[a] = parseInt(state[a] % state[b])
      }
      break
    case Operator.EQL:
      if (isNumber(b)) {
        state[a] = state[a] === parseInt(b) ? 1 : 0
      } else {
        state[a] = state[a] === state[b] ? 1 : 0
      }
      break
  }

  // console.log('State after %s, Model after %s', state, model)

  return { state, model }
}

function isValid(state: State) {
  console.log('z = %s', state.z)
  return state.z === 0
}

const instructions: Array<Instruction> = parse(data)
let state: State;
for (let i = 0; i < 99999999999999; i++) {
  console.log('Trying %s', i)
  if (i.toString().indexOf('0') !== -1) {
    continue
  }
  let model = i.toString()
  state = { x: 0, y: 0, z: 0, w: 0 }

  instructions.forEach((instruction: Instruction) => {
    const res = execute(instruction, state, model)
    state = res.state
    model = res.model
  })

  if (isValid(state)) {
    console.log('Valid state %s', state)
    break
  }
}


// const instructions: Array<Instruction> = parse(data);

// instructions.forEach((instruction: Instruction) => {
//   const res = execute(instruction, state, currentModel)
//   state = res.state
//   currentModel = res.model
// })

// console.log(isValid(state))