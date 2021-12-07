const data = require("fs")
  .readFileSync("input.txt", "utf8")
  .split(",")
  .map(Number)

const max = Math.max(...data);
const min = Math.min(...data);

function calculateFuel(n, pivot) {
  const diff = Math.abs(n - pivot)
  return (diff * (diff + 1) / 2)
}

const pivotMap = {};
const result = {
  pivot: "",
  fuel: +Infinity
};

for (let pivot = min; pivot <= max; pivot++) {
  let diff = data.map(n => calculateFuel(n, pivot));

  diff.forEach(n => {
    if (!pivotMap[pivot]) {
      pivotMap[pivot] = n;
    } else {
      pivotMap[pivot] += n;
    }
  });
}

console.log(pivotMap)

Object.entries(pivotMap).forEach(([key, value]) => {
  if (value < result.fuel) {
    result.pivot = key;
    result.fuel = value;
  }
});

console.log(result);
