const fs = require('fs');

// read day 2 input
const input = fs.readFileSync('day02-input.txt', 'utf8');

// split input by new lines
const lines = input.split('\n');

// Part 1: First letter is opponent, second is me
const getManualPoints = (line) => {
  const key = {
    'A X': 1 + 3, // Rock vs Rock
    'A Y': 2 + 6, // Rock vs Paper
    'A Z': 3 + 0, // Rock vs Scissors
    'B X': 1 + 0, // Paper vs Rock
    'B Y': 2 + 3, // Paper vs Paper
    'B Z': 3 + 6, // Paper vs Scissors
    'C X': 1 + 6, // Scissors vs Rock
    'C Y': 2 + 0, // Scissors vs Paper
    'C Z': 3 + 3, // Scissors vs Scissors
  }

  return Number(key[line]);
}

// Part 2: First letter is opponent, second is result
// Y = draw, X = loss, Z = win
const getManualPointsPartTwo = (line) => {
  const key = {
    'A X': 3 + 0, // Loss: Scissors
    'A Y': 1 + 3, // Draw: Rock
    'A Z': 2 + 6, // Win: Paper
    'B X': 1 + 0, // Loss: Rock
    'B Y': 2 + 3, // Draw: Paper
    'B Z': 3 + 6, // Win: Scissors
    'C X': 2 + 0, // Loss: Paper
    'C Y': 3 + 3, // Draw: Scissors
    'C Z': 1 + 6, // Win: Rock
  }

  return Number(key[line]);
}

const scoresByLineManual = lines.map(getManualPoints).filter(n => n === n);
const totalManual = scoresByLineManual.reduce((a, c) => {
  return a + c;
}, 0);

const scoresByLineManual2 = lines.map(getManualPointsPartTwo).filter(n => n === n);
const totalManual2 = scoresByLineManual2.reduce((a, c) => {
  return a + c;
}, 0);

console.log({
  scoresByLineManual,
  totalManual,
  scoresByLineManual2,
  totalManual2,
})

/**
 * This problem was way more complicated than it should've been. I should have created two
 * functions that parsed each line properly.
 */