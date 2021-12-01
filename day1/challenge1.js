console.log((sample = require("fs").readFileSync('input.txt', 'utf8').split("\n").map(Number)).reduce((acc, n, i) => acc + (i > 0 && n > sample[i - 1]), 0))
