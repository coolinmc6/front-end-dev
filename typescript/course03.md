[Home][home] | [topic directory][topic-directory]

[home]: https://github.com/coolinmc6/front-end-dev
[topic-directory]: https://github.com/coolinmc6/front-end-dev/tree/master/typescript

<a id="top"></a>

# Course Name

- [TypeScript Fundamentals, v3](https://frontendmasters.com/courses/typescript-v3/)
- [Course Materials](https://github.com/mike-north/ts-fundamentals-v3)
- [Course Website](https://www.typescript-training.com/course/fundamentals-v3)
- [Official TypeScript Website](https://www.typescriptlang.org/)

## Introduction & Setup

https://frontendmasters.com/courses/typescript-v3/introduction/

- What is TypeScript?
  - "a typed syntactic supser-set of JavaScript"
  - A superset of JavaScript
  - Adds types to JavaScript
  - Adds features to JavaScript
  - Compiles to JavaScript
- Why developers want types?
  - it allows you, as a code author, leave more of your intent "on the page"
  - allows the developer to communicate more clearly with the compiler
  - it has the potential to move some kinds of errors from runtime to compile time
  - in-editor autocomplete

### Variables & Values

https://frontendmasters.com/courses/typescript-v3/variables-values/

- TypeScript can infer types. For example:

```ts
let age = 6;
```
- TypeScript will infer that `age` is a number.
- If you hover over `age` in VS Code, you'll see that it's a `number`.
- if you ever try to assign a value to `age` that is not a number, you'll get an error.
- `6` is a **literal type**
- `any` is a type that can be anything. It's the default type for variables. But it's often
much too broad. If you have, for example, a variable that doesn't have a value yet but you want to
assign it a value later, you can tell TypeScript what it **will be** using type annotations:

```ts
let startTime = new Date()
let endTime: Date;
```
- while we don't know the value of `endTime` yet, we DO know that it will be a `Date` object.

[[↑] Back to top](#top)

## Type Categories

### Typing Functions
https://frontendmasters.com/courses/typescript-v3/typing-functions/

