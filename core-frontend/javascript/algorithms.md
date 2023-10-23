
```js
function heapPermute(array, n) {
  n = n || array.length; // set n default to array.length
  let permutations = [];
  if (n === 1) {
    permutations.push([...array]);
  } else {
    for (let i = 1; i <= n; i++) {
      heapPermute(array, n - 1).forEach(perm => permutations.push(perm));
        let j;
        
      if (n % 2) {
        j = 1;
      } else {
        j = i;
      }
      [array[n - 1], array[j - 1]] = [array[j - 1], array[n - 1]]; // swap
    }
  }
  return permutations;
}

// example usage:
const permutations = heapPermute([1, 2, 3]);
```