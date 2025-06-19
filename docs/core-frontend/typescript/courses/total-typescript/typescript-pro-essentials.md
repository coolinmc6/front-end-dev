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

Start here: https://www.totaltypescript.com/workshops/typescript-pro-essentials/essential-types-and-notations/type-checking-maps

## Integrated Development Environments Superpowers
