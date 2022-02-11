
Bifumes TypeScript Course: [TypeScript Beginner Course](https://www.youtube.com/watch?v=wiKENmTNMz8&list=PLe30vg_FG4OQjsYa-iys5HUeaoSHzz-wk&index=1)

# Lectures

## 00: Please Learn TypeScript
- Why TypeScript?
  - TypeScript is a superset of Javascript. You can't run TypeScript code in a browser.
  - TypeScript forces static typing in JavaScript which is dynamic typing
  - Most effective with large teams with a number of collaborators
- Benefits of TypeScript:
  - interfaces, enums, which are not available in JavaScript

## 01: Why We Need TypeScript

- one of the key takeaways is that the type of the variable is important. If you look at the
`sum` function below, without the type annotation, any variable can be passed in
and the resulting value could be nonsense.
  - `sum('1', 3) = '13'`
  - `sum(1, false) = '1false'`

```ts
let name = 'Colin';
console.log(typeof name); // string
name = 1;
console.log(typeof name); // number

/**
 * this code just says that both a and b are numbers (this is easy) but the
 * ": number" after the parens is what is to be returned
 * 
 * doing `node index.js` will fail because we need a TypeScript compiler
 */
function sum(a: number, b:number): number {
  return a + b;
}
```

## 02: TypeScript Compiler

- Here we installed ts-node: `npm install -g ts-node`
- `ts-node index.ts` can read it but the browser still can't. So we need to convert the TypeScript
file into a JavaScript file.
- Here we installed typescript: `npm install -g typescript`
- the command is `tsc index.ts` and it will create a JavaScript file called `index.js`
- `tsc index.ts --outDir ./output` will put that file in the output directory
- Q: when you look at the output JavaScript file, as of right now, there doesn't appear to be any
extra stuff added (like with Babel) - in fact just the TypeScript stuff is removed...so how are types
enforced?

## 03: Define Types
Video: https://www.youtube.com/watch?v=OVOJBKk4nIo&list=PLe30vg_FG4OQjsYa-iys5HUeaoSHzz-wk&index=4

- Primitive Types:
  - number
  - string
  - boolean
  - null
  - undefined
  - symbol
- Object Types:
  - object
  - array
  - function

## 04: Type Inference

## 05: tsconfig Explained
Video: https://www.youtube.com/watch?v=If8JzyG2EGc&list=PLe30vg_FG4OQjsYa-iys5HUeaoSHzz-wk&index=6

