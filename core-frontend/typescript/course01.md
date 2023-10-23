
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

- Run `tsc --init` to create a tsconfig.json file
- In that directory, you can call `tsc` to compile the TypeScript file
- You can also call `tsc --watch --outDir ./output` to watch for changes in the TypeScript file and
compile it to JavaScript

## 06: Using npm init
Video: https://www.youtube.com/watch?v=NvyffQkrn98&list=PLe30vg_FG4OQjsYa-iys5HUeaoSHzz-wk&index=7

- It was essentially just about adding `npm` via `npm init` and then adding a `start` script
to run the `tsc --watch` command
- We also added a `src` directory

## 07: Generate types file
Video: https://www.youtube.com/watch?v=NvyffQkrn98&list=PLe30vg_FG4OQjsYa-iys5HUeaoSHzz-wk&index=8

## 08: Number Type

## 09: number vs Number


## 11: never vs void

- a `never` type is a type that will never reach the end of the function. Here is an example:

```ts
function raiseError(message: string): never {
  throw new Error(message);
  console.log(message);
}
```

- a `void` type is a type that will never return anything. Here is an example:

```ts
function sayHello(): void {
  console.log('Hello');
}
// OR
function sum(a: number, b: number): void {
  console.log(a + b);
}
```

## 12: enums

- JavaScript doesn't have enums buy TypeScript does.
- enums are a way to define a set of named constants
- here is an example:
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
console.log(Direction.Up); // 0
console.log(Direction[0]); // Up
console.log(Direction[2]); // Left
console.log(Direction);
/*
{
  '0': 'Up',
  '1': 'Down',
  '2': 'Left',
  '3': 'Right',
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3
}
*/

enum Month {
  January = 1, // I believe this starts the index at 1
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

// here's a string enum
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
```
- the resulting JavaScript creates an object with property values with BOTH the indices which
correspond to the value ("0" => Up, "1" => Down, etc) and the string values which correspond to the
index ("Up" => 0, "Down" => 1, etc)
- in a string enum, you can only access it by the string value: `Dirction.Up`. Doing `Direction[0]`
won't work.

## 13: Object Type
