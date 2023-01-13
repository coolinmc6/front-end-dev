const fs = require('fs');

// read day 4 input
const input = fs.readFileSync('day04-input.txt', 'utf8');

// split input by new lines
const lines = input.split('\n').filter((n) => n);

// Function checks whether range1 is within range2
const isWithinRange = (range1, range2) => {
  const [min1, max1] = range1;
  const [min2, max2] = range2;
  return min1 >= min2 && max1 <= max2;
}

// Function checks whether range1 overlaps range2
const isOverlapping = (range1, range2) => {
  const [min1, max1] = range1;
  const [min2, max2] = range2;
  return min1 <= max2 && max1 >= min2;
}

// Get the numbers in two separate arrays and check if they are within each other
const numbers = lines.map((line) => {
  const [range1, range2] = line.split(',')
  const nums1 = range1.split('-').map(Number);
  const nums2 = range2.split('-').map(Number);
  return [nums1, nums2]
})

const rangeContains = numbers.map((array) => {
  const [nums1, nums2] = array;
  return isWithinRange(nums1, nums2) || isWithinRange(nums2, nums1);
}).filter((n) => n);

const rangeOverlaps = numbers.map((array) => {
  const [nums1, nums2] = array;
  return isOverlapping(nums1, nums2) || isOverlapping(nums2, nums1);
}).filter((n) => n);

console.log(rangeContains.length);
console.log(rangeOverlaps.length);
