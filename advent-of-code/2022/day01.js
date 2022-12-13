const fs = require('fs')

// read day01-input.txt
const input = fs.readFileSync('day01-input.txt', 'utf8')

// split input into array of numbers
const numbers = input.split('\n').map(Number)

const elves = numbers.reduce((acc, curr) => {
  if (acc.length === 0) {
    return [curr]
  }
  if (curr === 0) {
    return [...acc, 0]
  }
  
  acc[acc.length - 1] = acc[acc.length - 1] + curr
  return acc
}, [])

const mostCalories = elves.reduce((acc, curr, index) => {
  if (acc.calories === null) {
    return { position: index + 1, calories: curr }
  }
  if (curr > acc.calories) {
    return { position: index + 1, calories: curr }
  }
  return acc
}, { position: null, calories: null })

const elves_descending = elves.sort((a, b) => b - a)


console.log({ 
  elves,
  elves_count: elves.length,
  zero_count: numbers.filter(n => n === 0).length,
  mostCalories,
  elves_descending,
  top_three: elves_descending.slice(0, 3).reduce((a, c) => a + c, 0),
});