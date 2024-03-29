// let name = 'Colin';
// console.log(name);

/**
 * this code just says that both a and b are numbers (this is easy) but the
 * ": number" after the parens is what is to be returned
 * 
 * doing `node index.js` will fail because we need a TypeScript compiler
 */
function sum(a: number, b:number): number {
  return a + b;
}

console.log(sum(1, 3));

enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction)