# TypeScript Pro Essentials

## TypeScript in the Build Process

## Essential Types and Notations

Section Start: https://www.totaltypescript.com/workshops/typescript-pro-essentials/essential-types-and-notations/understanding-function-errors

The basic types in TypeScript are:

- string
- number
- boolean
- symbol
- bigint

### 4. Optional Function Parameters

- just add the `?` to make it optional

### 6. Typing Object Literals

### 8. Single Source of Truth for Type Definitions

### 10. Arrays of Objects in TypeScript

- I prefer a named type (e.g. `Ingredient`) but this is a clever way to show that it
  is an array of ingredients

```ts
type Recipe = {
  title: string;
  instructions: string;
  ingredients: {
    name: string;
    quantity: string;
  }[];
};
```

- Another way to do that is `Array<Ingredient>`

### 11. Rest Parameters in TypeScript

### 12. Tuples for Precise Array Structures in TypeScript

- I don't work with Tuples often but it is cool that you can do that. So
  instead of just passing an argument like `number[]`, for a range, we want to make
  sure we have both an `x` and `y`.
- Just using `[number, number]` works as well but assigning a name to each builds it out
  a bit more

```ts
const setRange = (range: [x: number, y: number]) => {
  const x = range[0];
  const y = range[1];

  // Do something with x and y in here

  // x and y should both be numbers!
  type tests = [
    Expect<Equal<typeof x, number>>,
    Expect<Equal<typeof y, number>>
  ];
};
```

### 13. Using Optional Tuple Members in TypeScript

These both work:

```ts
const goToLocation = (coordinates: [number, number, number?]) => {
  const latitude = coordinates[0];
  const longitude = coordinates[1];
  const elevation = coordinates[2];

  // Do something with latitude, longitude, and elevation in here

  type tests = [
    Expect<Equal<typeof latitude, number>>,
    Expect<Equal<typeof longitude, number>>,
    Expect<Equal<typeof elevation, number | undefined>>
  ];
};

// Or this with named tuple members
const goToLocation = (
  coordinates: [lat: number, long: number, ele?: number]
) => {
  const latitude = coordinates[0];
  const longitude = coordinates[1];
  const elevation = coordinates[2];

  // Do something with latitude, longitude, and elevation in here

  type tests = [
    Expect<Equal<typeof latitude, number>>,
    Expect<Equal<typeof longitude, number>>,
    Expect<Equal<typeof elevation, number | undefined>>
  ];
};
```

### 14. The Controversial `any` Type

- Setting an event to `any` may be a quick way to get things working **BUT** it
  can create situations like what you have below where you call `e.terget`. Using
  `any` essentially turns off autocomplete and prevents you from finding issues like
  this where you had a typo.

```ts
const handleFormData = (e: any) => {
  e.preventDefault();
  const data = new FormData(e.terget); // typo!
  const value = Object.fromEntries(data.entries());
  return value;
};
```

### 15. Function Types

- This is the problem - I need to provide a type for the `makeChange` function
  that fixes the TS errors.

```ts
// Problem
type User = {
  id: string;
  name: string;
};

const modifyUser = (users: User[], id: string, makeChange) => {
  return users.map((u) => {
    if (u.id === id) {
      return makeChange(u);
    }
    return u;
  });
};

const users: User[] = [
  { id: "1", name: "John" },
  { id: "2", name: "Jane" },
];

modifyUser(users, "1", (user) => {
  return { ...user, name: "Waqas" };
});

modifyUser(
  users,
  "1",
  // @ts-expect-error
  (user) => {
    return { ...user, name: 123 };
  }
);
```

```ts
// Solution #1
const modifyUser = (
  users: User[],
  id: string,
  makeChange: (user: User) => User
) => {
  return users.map((u) => {
    if (u.id === id) {
      return makeChange(u);
    }
    return u;
  });
};

// Solution #2
type MakeChangeFunction = (user: User) => User;

const modifyUser = (
  users: User[],
  id: string,
  makeChange: MakeChangeFunction
) => {
  return users.map((u) => {
    if (u.id === id) {
      return makeChange(u);
    }
    return u;
  });
};
```

- I would typically defer to solution #2 but

### 16. Typing an Event Listener

### 17. Restricting `Set` Types

```ts
// Problem
const userIds = new Set();

// TESTS

userIds.add(1);
userIds.add(2);
userIds.add(3);

// @ts-expect-error
userIds.add("123");
// @ts-expect-error
userIds.add({ name: "Max" });
```

```ts
// Solution #1
const userIds = new Set<number>();

// Solution #2
const userIds: Set<number> = new Set();
```

- both solutions type the Set so that it accepts numbers only
- Solution 1 uses the **Generic Type Parameter** syntax which means the `<number>` is on the
  constructor. It is more concise and commonly preferred
- The type is inferred from the generic parameter
- Solution 2 uses **Explicit Type Annotation** on the variable declaration
- It is more verbose but very explicit about the variable's type
- This means that when we use the constructor, `new Set()`, we don't need the
  generic parameter because TypeScript infers it from the variable annotation

### 18. Type Checking Maps

```ts
interface User {
  name: string;
  age: number;
}

// key = number, value = User
const userMap: Map<number, User> = new Map();

userMap.set(1, { name: "Max", age: 30 });
userMap.set(2, { name: "Manuel", age: 31 });
```

### 19. Debugging JSON Parsing

- the trick here is knowing that JSON.parse does not take any type arguments. So putting a
  type between the `<>` doesn't do anything.

```ts
const parsedData = JSON.parse<{
  name: string;
  age: number;
}>('{"name": "Alice", "age": 30}');
```

- but we can just give a type to parseData as such:

```ts
const parsedData: {
  name: string;
  age: number;
} = JSON.parse('{"name": "Alice", "age": 30}');
```

(this module is #30 of 221)

### 20. Typing Fetch API Responses in Async Functions

- the question: How do I type (as a `number`) the data variable?

```ts
async function fetchData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  return data;
}

const example = async () => {
  const data = await fetchData();

  type test = Expect<Equal<typeof data, number>>;
};
```

- I could just add a type when I am getting the data from the `await response.json`:

```ts
const data: number = await response.json();
```

- He recommends adding a return type which is where I can use the `Promise` type:

```ts
async function fetchData(): Promise<number> {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  return data;
}
```

- **REMEMBER THIS**: I like this

## Integrated Development Environments Superpowers

### 1. Understanding How TypeScript Works in Your IDE

- Great description of what is going on when you run TypeScript in a repo:

![TS Server](/img/ts-server.png)

### 2. Introspecting Variables and Declarations in TypeScript

- hover over stuff for info (types, errors, etc.)
- use the metadata TS gives you

### 3. Hovering Over a Function Call

- again - hover over stuff - there is a lot of great information that is provided by the IDE / TS
  to help you understand what you are doing. Not just for your functions but items like `document.getElementById()`
  for example

### 4. Adding Documentation for Hovers

- You can use JSDoc to add comments

### 5. Manually Triggering Autocomplete

- `^` + `Space` (Ctrl + Space)
- **REMEMBER THIS:** super cool

### 6. TypeScript's Approach to Errors

- worth a watch - good to understand how TS does errors

### 7. Quick Renaming in VS Code

- if you want to rename a particular variable, you can right click on it and click
  "Rename Symbol". It does it better than `CMD + D` which could grab all variables or even
  parts of variables that happen to match that particular sequence of letters

### 8. Navigating Code with "Go to Definition"

- this is the `CMD` + click on a function and it takes you there

### 9. Fast Imports in VS Code

- `CMD` + `.` to pull up suggestions like "Add All Missing Imports"

### 10. Organizing Imports in Large Files

- `Shift` + `Opt` + `O` to fix all imports

### 11. Quick Fix Refactoring

- `CMD` + `.` is again the hero here - **REMEMBER THIS**

### 12. Automatic Code Formatting with Prettier

### 13. Restarting the TypeScript Server in VS Code

- `CMD` + `Shift` + `P` to open the Command Pallette and look for "Restart TS Server"

## Unions and Narrowing

### 1. Handling Null Values in TypeScript

- This character, `|`, is the or operator in TS and creates a Union

### 2. Diving Deeper into Unions and Assignability

### 3. Restricting Function Parameters

- instead of just `direction: string` you can specify the strings that direction can be.
  So now it would be:

```ts
function move(direction: "up" | "down" | "left" | "right", distance: number) {}
```

- and obviously you can break the 4 strings into its own type called `Direction`

### 4. Literal Type Assignability

### 5. Combining Union Types in TypeScript

- use `|` to combine types as well (not just string literals)

### 6. How Big Can a Union Be?

### 7. Resolving Literal Types to Wider Types

### 8. Narrowing Unions with `typeof`

- Start here: https://www.totaltypescript.com/workshops/typescript-pro-essentials/unions-and-narrowing/narrowing-unions-with-typeof

## Objects

## Mutability

## TypeScript Classes
