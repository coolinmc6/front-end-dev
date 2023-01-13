const fs = require('fs');

// read day 3 input
const input = fs.readFileSync('day03-input.txt', 'utf8');

// split input by new lines
const lines = input.split('\n');

/**
 * Iterate through the lines and do the following:
 * - split the string in half to create two strings: string1 and string2
 * - compare each string to see which character appears in each one
 * - return that character
 */
const getCharacter = (line) => {
  // split string in half as determined by its length
  const string1 = line.slice(0, line.length / 2);
  const string2 = line.slice(line.length / 2);
  const character = string1.split('').find((char) => string2.includes(char));
  return character;
}

// get the character for each line
const characters = lines.map(getCharacter).filter((n) => n);
// console.log(characters);

// Letter key: a - z are 1 to 26, A - Z are 27 to 52
const getCharacterValue = (char) => {
  const charCode = char.charCodeAt(0);
  if (charCode >= 97 && charCode <= 122) {
    return charCode - 96;
  } else if (charCode >= 65 && charCode <= 90) {
    return charCode - 64 + 26;
  }
}

const values = characters.map(getCharacterValue);

// sum of values
const total = values.reduce((a, c) => {
  return a + c;
} , 0);

// Part 1
console.log(total);


// Group the input by 3 lines
const groups = [];
let group = [];
lines.forEach((line) => {
  group.push(line);
  if (group.length === 3) {
    groups.push(group);
    group = [];
  }
});

// Find the character that appears in all 3 lines
const getCharacterPartTwo = (group) => {
  const string1 = group[0];
  const string2 = group[1];
  const string3 = group[2];
  const character = string1.split('').find((char) => string2.includes(char) && string3.includes(char));
  return character;
}

const charactersPartTwo = groups.map(getCharacterPartTwo).filter((n) => n);

const valuesPartTwo = charactersPartTwo.map(getCharacterValue);

// sum of values
const totalPartTwo = valuesPartTwo.reduce((a, c) => {
  return a + c;
} , 0);

// Part 2
console.log(totalPartTwo);