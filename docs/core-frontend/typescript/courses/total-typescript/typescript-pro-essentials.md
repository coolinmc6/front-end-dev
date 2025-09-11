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

- scopes are very important and you can use `typeof variableName` to narrow down a type
  for a particular variable

### 9. Conditional Narrowing in TypeScript

This is what we're trying to solve:

```ts
function validateUsername(username: string | null): boolean {
  // Rewrite this function to make the error go away
  return username.length > 5;

  return false;
}
```

We can check that username is a string:

```ts
function validateUsername(username: string | null): boolean {
  if (typeof username === "string") {
    return username.length > 5;
  }

  return false;
}
```

OR that username exists:

```ts
function validateUsername(username: string | null): boolean {
  if (username) {
    return username.length > 5;
  }

  return false;
}
```

OR that whether it is NOT a string:

```ts
function validateUsername(username: string | null): boolean {
  if (typeof username !== "string") {
    return false;
  }
  return username.length > 5;
}
```

OR we can chat that username is not null (typeof object):

```ts
function validateUsername(username: string | null): boolean {
  if (typeof username === "object") {
    return false;
  }
  return username.length > 5;
}
```

(finished 54 of 221)

### 10. Narrowing with Boolean Won't Work

### 11. Gotchas When Narrowing a Map in TypeScript

```ts
type Event = {
  message: string;
};

const processUserMap = (eventMap: Map<string, Event>) => {
  if (eventMap.has("error")) {
    // TS error on the eventMap.get("error") saying Object could be null
    const message = eventMap.get("error").message;

    throw new Error(message);
  }
};
```

- TypeScript doesn't really understand the connection between `.has()` and `.get()`. To fix
  this, you can instead do something like this:

```ts
type Event = {
  message: string;
};

const processUserMap = (eventMap: Map<string, Event>) => {
  const event = eventMap.get("error");
  if (event) {
    const message = event.message;

    throw new Error(message);
  }
};
```

### 12. Narrowing by Throwing Errors

- I have before seen the idea of `throw new Error()` as almost like a "nice-to-have" but
  not necessary. This is a different way of thinking about it.
- In the example below, we **know** that the `app` element must be there. If it is not there,
  we probably can't render anything. So by throwing an error if it is null, while it MAY never happen
  in production, it does give TypeScript the ability to know that the element won't be null by the time
  it reaches the next line of code.

```ts
const appElement = document.getElementById("app");

// This satisfies TS and now we can confidently use appElement
if (!appElement) {
  throw new Error("App element not found");
}

type Test = Expect<Equal<typeof appElement, HTMLElement>>;
```

### 13. Narrowing with `in` Statements

- I like this as well. I've used this syntax a few times but not super frequently.
- Because APIResponse can be one of two different objects, we can't assume that `data`
  is there. So we look for it...

```ts
type APIResponse =
  | {
      data: {
        id: string;
      };
    }
  | {
      error: string;
    };

const handleResponse = (response: APIResponse) => {
  // How do we check if 'data' is in the response?
  if ("data" in response) {
    return response.data.id;
  } else {
    throw new Error(response.error);
  }
};
```

### 14. Introducing the Unknown Type in TypeScript

- `unknown` is the top type - represents everything in TypeScript
- it is **not** the same as `any`

### 15. Dealing with Unknown Errors in TypeScript

```ts
const somethingDangerous = () => {
  if (Math.random() > 0.5) {
    throw new Error("Something went wrong");
  }

  return "all good";
};

// Okay Solution #1
try {
  somethingDangerous();
} catch (error) {
  // Need to check that it is an object
  // BUT because null is also an object I have to check it exists
  if (typeof error === 'object' && error && 'message' in error) {
    console.error(error.message);
  }
}
// Good solution
try {
  somethingDangerous();
} catch (error) {
  if (error instanceOf Error) {
    console.error(error.message);
  } else {
    throw error
  }
}
```

### 16. Narrowing Unknown in a Large Conditional Statement

**Exercise**

```ts
const parseValue = (value: unknown) => {
  if (true) {
    return value.data.id;
  }

  throw new Error("Parsing error!");
};
```

**Solution**

- The solution is not at all what I thought it would be. He recommends using a library like
  Zod but while it seems counterintuitive, the answer to solving this (at least for this exercise)
  was to just keep checking.
- To narrow it down so that I could actually return `value.data.id` and have it be a string, I had to
  check the following:
  - value was an object
  - value was not null
  - value had a `data` property
  - value.data was of type object
  - value.data was also not null
  - value.data had an `id` property
  - value.data.id was a string

```ts
export const parseValue = (value: unknown): string => {
  if (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    typeof value.data === "object" &&
    value.data !== null &&
    "id" in value.data &&
    typeof value.data.id === "string"
  ) {
    return value.data.id;
  }
  throw new Error("Parsing error!");
};
```

### 17. Introducing the `never` Type in TypeScript

A way to read this chart is that anything can be assigned to `unknown` but `unknown` cannot
be assigned to types below it (.e.g string, object, number, etc). Whereas `never` can be
assigned to anything.

![Never Type](/img/never-type.png)

As a quick diversion, here are some notes.

- `unknown` is the top type in TypeScript. So what does it mean that anything can be assigned
  to `unknown` but `unknown` cannot be assigned to anything without a type check?

```ts
let x: unknown = "hello"; // ok
let y: string = x; // ❌ Error: Type 'unknown' is not assignable to type 'string'
if (typeof x === "string") {
  y = x; // ✅ Works after type check
}
```

- `never` is the bottom type in TypeScript. So what does it mean that `never` can be assigned
  to any type but there are no types that can be assigned to `never`?

```ts
let n: never;
let s: string = n; // ✅ fine
let x: string = "hi";
n = x; // ❌ Error: Type 'string' is not assignable to type 'never'
```

- one place that this is useful is in an exhaustive check in a switch statement:

```ts
type Shape = { kind: "circle" } | { kind: "square" };

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return 1;
    case "square":
      return 2;
    default:
      const _exhaustive: never = shape; // if new kind added, error here
      return _exhaustive;
  }
}
```

💡 **Rule of thumb**:

- Use unknown when you accept anything but want safety before use.
- Use never for impossible situations, especially in exhaustive type checks.

### 18. Solving the Never Type in TypeScript

- a `never` array can occur if you create an empty array and then later try to add
  things to it.

```ts
const shoppingCart = {
  items: [],
};

shoppingCart.items.push("Apple"); // TS will throw an error
```

to fix this, you just create a shoppingCart type

### 19. Narrowing Return Types with TypeScript

### 20. Narrowing in Different Scopes

- This code is giving an error because TypeScript doesn't know if `searchParams.name` is
  actually there at the time you call it. Something else could have happened. You are going from
  the scope of the function to within the condition to within the filter.

```ts
const findUsersByName = (
  searchParams: { name?: string },
  users: {
    id: string;
    name: string;
  }[]
) => {
  if (searchParams.name) {
    return users.filter((user) => user.name.includes(searchParams.name)); // ERROR here
  }

  return users;
};
```

To fix it, you just need to this:

```ts
const findUsersByName = (
  searchParams: { name?: string },
  users: {
    id: string;
    name: string;
  }[]
) => {
  const name = searchParams.name;
  if (name) {
    return users.filter((user) => user.name.includes(name));
  }

  return users;
};
```

Now it can be confident that name, if it exists, is a string in the filter scope

### 21. Reusable Type Guards

### 22. Handling Separate But Related Types

Typescript doesn't like, for example, the `shape.radius` in the circle condition or
the default return. Let's figure it out:

```ts
// Problem
type Shape = {
  kind: string;
  radius?: number;
  sideLength?: number;
};

function calculateArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius * shape.radius;
  } else {
    return shape.sideLength * shape.sideLength;
  }
}
```

To solve this, you need **discriminated unions**. You can do this:

```ts
type Square = {
  kind: "square";
  sideLength: number;
};

type Circle = {
  kind: "circle";
  radius: number;
};

type Shape = Square | Circle;
```

In the scenario above, you need some property that is common in both types
and TypeScript can use that to narrow down which type you are using.

### 23. Destructuring a Discriminated Union in TypeScript

Building off of the last section, the question becomes: how do we structure
a discriminated union?

```ts
type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;

// Problem: radius and sidelength do not exist on Shape
function calculateArea({ kind, radius, sideLength }: Shape) {
  if (kind === "circle") {
    return Math.PI * radius * radius;
  } else {
    return sideLength * sideLength;
  }
}
```

To solve this, you essentially stop trying to destructure at the top level.

```ts
function calculateArea(shape: Shape) {
  if (shape.kind === "circle") {
    const { radius } = shape
    return Math.PI * radius * radius;
  } else {
    const { sideLength } = shape
    return sideLength * sideLength;
  }
```

### 24. Narrowing a Discriminated Union with a Switch

### 25. The Switch (true) Pattern in TypeScript

### 26. Refining Types with Discriminated Union of Tuples

### 27. Discriminated Booleans

### 28. Adding Defaults to a Discriminated Union

### 29. Should You Provide Function Return Types?

- if you have a complicated function and want it to tell you when you have, for example,
  not handled all the cases in your function, then using a return type can be useful.
- for simpler functions, relying on the inferred type is often more than good enough

## Objects

### 1. Extending Objects in TypeScript

- You can use `&` to extend objects (add additional properties) to types

### 2. Extend an Object Using Interfaces in TypeScript

We're going to do largely the same thing as before but with interfaces. Starting
with the code from the last exercise:

```ts
interface BaseEntity {
  id: string;
  createdAt: Date;
}

interface User extends BaseEntity {
  name: string;
  email: string;
}

interface Product extends BaseEntity {
  name: string;
  price: number;
}
```

another cool way to do it would be:

```ts
interface WithId {
  id: string;
}

interface WithCreatedAd {
  createdAt: Date;
}

interface User extends WithId, WithCreatedAt {
  name: string;
  email: string;
}
```

### 3. Extending Incompatible Properties

- an interesting situation with using **interface extends** over object intersection
  is that when you use interfaces, the errors are better when creating a new type or
  interface. It can tell you _why_ your new type or intersection doesn't work.

### 4. Comparing Intersection Interface Extends in TypeScript

- TypeScript prefers `interface extends` because it can cache the interface whereas with
  intersections, TypeScript has to compute it on the fly

### 5. Allow Dynamic Keys in TypeScript Types

### 6. Allow Any String Key While Supporting Default Properties

### 7. Supporting Different Types of Keys in TypeScript

`PropertyKey` is a useful type for an object as it is a global type of string, number, or symbol
and represents all the types that a key for an object could be. Super niche but interesting to know.

### 8. Restricting Object Keys in TypeScript

```ts
type Configurations = {
  [Env in Environments]: {
    apiBaseUrl: string;
    timeout: number;
  };
};
```

### 9. An Issue with Duplicate Interfaces

### 10. Working with Partial Data from a Type

This is how you slim down a type:

```ts
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const fetchUser = async (): Promise<Pick<User, "name" | "email">> => {
  const response = await fetch("/api/user");
  const user = await response.json();
  return user;
};

const example = async () => {
  const user = await fetchUser();

  type test = Expect<Equal<typeof user, { name: string; email: string }>>;
};
```

### 11. Exclude a Property from an Interface

This is just the opposite of `Pick` and it's called `Omit`:

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const addProduct = (productInfo: Omit<Product, "id">) => {
  // Do something with the productInfo
};

addProduct({
  name: "Book",
  price: 12.99,
  description: "A book about Dragons",
});

addProduct({
  // @ts-expect-error
  id: 1,
  name: "Book",
  price: 12.99,
  description: "A book about Dragons",
});
```

### 12. A Quirk of Omit in TypeScript

- You can `Omit` properties that don't exist on the type. That is not possible with `Pick`.
- This functionality was most popular and there is a way to make it a strict version of `Omit`

### 13. Understanding Distributive Omit and Pick in TypeScript

- `Omit` is not distributive which means that it doesn't iterate through the various
  types that it could be.
- Here is a suggested type: `DistributiveOmit`:

```ts
type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;
```

### 14. Excluding Fields from a TypeScript Type

The type we want to fix our problem is `Partial`. Now, our function works as we want -
the user passes in the id of the product they want to fix and then they can update
any of the properties they want.

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const updateProduct = (
  id: number,
  productInfo: Partial<Omit<Product, "id">>
) => {
  // Do something with the productInfo
};

// Should be able to update individual pieces of information
updateProduct(1, {
  name: "Book",
});

updateProduct(1, {
  price: 12.99,
});

updateProduct(1, {
  description: "A book about Dragons",
});

// Should be able to update more than one piece of info at once
updateProduct(1, {
  name: "Book",
  price: 12.99,
});

updateProduct(1, {
  name: "Book",
  description: "A book about Dragons",
});
```

### 15. Making Type Properties Required in TypeScript

Here we want the type `Required`

### 16. Specifying a Type with Shared Properties in TypeScript

- I'm getting an error on the `entity.name` but not the `entity.imageId`.

```ts
type User = {
  id: string;
  name: string;
  age: number;
  imageId: string;
};

type Organisation = {
  id: string;
  name: string;
  address: string;
  imageId: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  imageId: string;
};

const getAvatarImage = (entity: unknown) => {
  {
    // Should not be able to access properties that are
    // not common to both types

    // @ts-expect-error
    entity.age;

    // @ts-expect-error
    entity.address;

    // @ts-expect-error
    entity.price;
  }

  return {
    url: `https://via.placeholder.com/${entity.imageId}`,
    alt: `${entity.name} Avatar`,
  };
};
```

To fix, we just create a union of all three which will then allow us to use any
of the common properties across all three:

```ts
const getAvatarImage = (entity: User | Organisation | Product) => {};
```

## Mutability

### 1. Fixing a Type Assignment Inference Error

I don't use `let` but in the example, it was something like: `let type = 'button'` where `button` was a type that
a Button could be. The issue is that because it is `let`, the `type` variable could be changed to any string so
TypeScript doesn't like it.

### 2. Object Property

### 3. Creating Read-only Properties

```ts
// adding "readonly" before the property name makes it readonly
type User = {
  readonly id: number;
  name: string;
  age: number;
};

const updateUser = (user: User) => {
  user.name = "Jane Doe";
  user.age = 30;

  // @ts-expect-error Should not be able to modify readonly
  user.id = 1;
};
```

### 4. Using a Type Helper to Create Read-only Properties

```ts
type SearchParams = {
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: "asc" | "desc";
};

const handleSearchParams = (search: Readonly<SearchParams>) => {
  // this will not work - TypeScript will throw an error
  search.q = "test";
};
```

### 5. Deeply Apply Read-only Properties to an Object in TypeScript

- this is the `as const` pattern that solves some of the earlier issues of making certain
  object properties as immutable, readonly

### 6. Comparing Object.freeze with as const

- `Object.freeze` only works on the top-level properties and won't work the way we want like
  `as const` can

### 7. Prevent Array Mutation in TypeScript

- The goal is to make this array readOnly as in I can't add anymore names or edit the array

```ts
function printNames(names: string[]) {
  for (const name of names) {
    console.log(name);
  }

  // @ts-expect-error
  names.push("John");

  // @ts-expect-error
  names[0] = "Billy";
}

// Solution #1
function printNames(names: readonly string[]) {
  // CODE
}

// Solution #2
function printNames(names: ReadonlyArray<string>) {
  // CODE
}
```

### 8. Distinguishing Assignability Between Read-Only and Mutable Arrays

- readonly arrays are not assignable to mutable arrays

### 9. Fixing Unsafe Tuples

```ts
// BAD tuple
type Coordinate = [number, number];

// GOOD tuple
type Coordinate = readonly [number, number];
```

### 10. Use the ts-reset Library to Improve Readonly Array Handling in TypeScript

a library from `total-typescript`

### 11. Improve Type Inference for an Async Function

In the example, it was a fetch function that returned an array with either an error and nothing for data
OR the error value as undefined and then data.

```ts
// with an error
[new Error("something went wrong")][
  // no error
  (undefined, data)
];
```

Simply add `as const` after each allowed TypeScript to infer the types from the function

### 12. Infer Strings as Their Literal Types in Objects with as const

- Adding `as const` is awesome

## TypeScript Classes

### 1. Classes in TypeScript

Start here: https://www.totaltypescript.com/workshops/typescript-pro-essentials/typescript-classes/classes-in-typescript
