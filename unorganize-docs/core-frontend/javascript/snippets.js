/*
// https://www.hackerrank.com/challenges/minimum-swaps-2/problem
You are given an unordered array consisting of consecutive integers  [1, 2, 3, ..., n] 
without any duplicates. You are allowed to swap any two elements. Find the minimum number
of swaps required to sort the array in ascending order.
*/
// minimum swaps to sort an array in ascending order
function minimumSwaps(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== i + 1) {
      let temp = arr[i];
      arr[i] = arr[temp - 1];
      arr[temp - 1] = temp;
      count++;
      i--;
    }
  }
  return count;
}

// New Year Chaos
// https://www.hackerrank.com/challenges/new-year-chaos/problem
// minimum number of bribes required to get the array in ascending order
function minimumBribes(arr) {
  let count = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] - (i + 1) > 2) {
      return "Too chaotic";
    }
    for (let j = Math.max(0, arr[i] - 2); j < i; j++) {
      if (arr[j] > arr[i]) {
        count++;
      }
    }
  }
  return count;
}

function arrayManipulation(n, queries) {
  let arr = new Array(n).fill(0);
  for (let i = 0; i < queries.length; i++) {
    let [start, end, value] = queries[i];
    arr[start - 1] += value;
    if (end < n) {
      arr[end] -= value;
    }
  }
  let max = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (sum > max) {
      max = sum;
    }
  }
  return max;
}

