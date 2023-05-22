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

- this is an explicit return type - we know that `a` and `b` are numbers
and we are also explicitly stating that we are returning a number.
- so if in our function we aren't returning a number, it gives an error

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

[[↑] Back to top](#top)
### Typing Functions Q&A and Objects
https://frontendmasters.com/courses/typescript-v3/typing-functions-q-a-and-objects/

```ts
let car: {
  make: string
  model: string
  year: number
}
```

[[↑] Back to top](#top)
### Optional Properties

```ts
function printCar(car: {
  make: string
  model: string
  year: number
  chargeVoltage?: number
}) {
  str = `${car.make} ${car.model} (${car.year})`);

  if (typeof car.chargeVoltage !== 'undefined') {
    str +=`// ${car.chargeVoltage}v`);
  }
}
```

[[↑] Back to top](#top)
### Index Signatures and Object Q&A

```ts
const phones: {
  [k: string]: {
    country: string
    area: string
    number: string
  }
} = {}
```

[[↑] Back to top](#top)
### Arrays and Tuples

```ts
type fileExtensions = string[];

type carList = car[];
```

- a tuple is an array with a fixed number of elements whose types are known, but need not be the same.
- tuples are useful when you want to represent a value as a pair or a triple, etc.
- Here is a TypeScript tuple:

```ts
let tuple: [string, number, boolean] = ['hello', 42, true];

let myCar: [string, string, number] = ['Ford', 'F150', 2015];
```


[[↑] Back to top](#top)
### Structural vs Nominal Types
https://frontendmasters.com/courses/typescript-v3/structural-vs-nominal-types/
- Structural types are based on the structure of the type. For example, if you have two objects that have the same properties, they are considered the same type.
- The difference between static typing and dynamic typing is that static typing is checked at compile time and dynamic typing is checked at runtime.
- Nominal types are based on the name of the type. For example, if you have two objects that have the same properties, they are not considered the same type unless they have the same name.
- nominal wouldn't really work for JavaScript
- Here is a good example of structural typing:

```ts
class Car {
  make: string
  model: string;
  year: number
  isElectric: boolean
}

class Truck {
  make: string
  model: string;
  year: number
  towingCapacity: number
}

const vehicle = {
  make: 'Honda',
  model: 'Accord',
  year: 2017
}

function printCar(car: {
  make: string
  model: string
  year: number
}) {
  console.log(`${car.make} ${car.model} (${car.year})`);
}

printCar(new Car()); // Fine
printCar(new Truck()); // Fine
printCar(vehicle); // Fine
```
- they're all different objects but structurally, they're passing the
`printCar` function's type check.

[[↑] Back to top](#top)
### Union Types
https://frontendmasters.com/courses/typescript-v3/union-types/
- Union types are the "or" as in they can be this type or that type (or where
those types overlap).
  - so a coin flip outcome is a union type of heads or tails. Heads and tails never overlap but they are both outcomes of a coin flip.
- Intersection types are the "and" as in they must be this type and that type
(so they are only the overlap)
- type guards are epxressions, which when used with control flow statement, allow us to have a 
more specific type of a particular value


[[↑] Back to top](#top)
### Intersection Types
https://frontendmasters.com/courses/typescript-v3/intersection-types/
- Intersection types are the "and" as in they must be this type and that type
(so they are only the overlap)
- intersection types are far less common than union types
- here is an example of an intersection type:

```ts
type HasPhoneNumber = {
  name: string
  phone: number
}

type HasEmail = {
  name: string
  email: string
}

// we can use the & operator to create an intersection type
// this is a type that has all the properties of HasPhoneNumber
// and all the properties of HasEmail
type HasNameAndPhoneNumber = HasPhoneNumber & HasEmail;
```


[[↑] Back to top](#top)
### Type Aliases
https://frontendmasters.com/courses/typescript-v3/type-aliases/
- a type alias is a name for any type. It's like a variable, but for types.
- here is an example of a type alias:

```ts
type NumVal = 1 | 2 | 3 | 4 | 5 | 6;

let diceRoll: NumVal = 1;
```
- aliases allow us to define a more meaningful name for a type
- we can declare the particulars of a type in a single place and then use that

[[↑] Back to top](#top)
### Interfaces
https://frontendmasters.com/courses/typescript-v3/interfaces/
- interfaces is a way of defining an object type. An "object type" can be thought of as, 
"an instance of a class would look like this"

[[↑] Back to top](#top)
### JSON Types Exercise
https://frontendmasters.com/courses/typescript-v3/json-types-exercise/


[[↑] Back to top](#top)
## Functions

### Functions and Function Overloads
https://frontendmasters.com/courses/typescript-v3/functions-function-overloads/

- function overloads are a way of defining a function signature that can be called in different ways
- here is an example of a function overload:

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  return a + b;
}
```


[[↑] Back to top](#top)
### this Types and Best Practices
https://frontendmasters.com/courses/typescript-v3/this-types-best-practices/


[[↑] Back to top](#top)
### Classes and Access Modifier
https://frontendmasters.com/courses/typescript-v3/classes-access-modifier-keywords/
- access modifiers are keywords that set the accessibility of properties and methods in a class
- the three access modifiers are `public`, `private`, and `protected`
- `public` is the default access modifier
- `private` means that the property or method can only be accessed from within the class
- `protected` means that the property or method can only be accessed from within the class or from a subclass
- here is an example of a class with access modifiers:

```ts
class Car {
  public make: string
  private model: string
  protected year: number

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}
```
- these modifiers disappear after compilation - they aren't there in the JavaScript and
shouldn't be used for security purposes

[[↑] Back to top](#top)
## Types and Values

### Top Types: any and unknown
https://frontendmasters.com/courses/typescript-v3/top-types-any-unknown/ - START HERE

[[↑] Back to top](#top)
### Bottom Types: never


[[↑] Back to top](#top)
### Type Guards and Narrowing
https://frontendmasters.com/courses/typescript-v3/type-guards-narrowing/
- a type guard is an expression that performs a runtime check that guarantees the type in some scope
- here is an example of a type guard:

```ts
function isString(a: unknown): a is string {
  return typeof a === 'string';
}
```
- a more complex example of a type guard:


[[↑] Back to top](#top)
### Nullish Values

## Generics


[[↑] Back to top](#top)
### Generics


[[↑] Back to top](#top)
### Dictionary map, filter, and reduce