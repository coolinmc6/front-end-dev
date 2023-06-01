[Home](https://github.com/coolinmc6/front-end-dev) |
[Back to JavaScript Home](https://github.com/coolinmc6/front-end-dev/tree/master/typescript)

<a id="top"></a>

# Type Challenges

Link: https://github.com/type-challenges/type-challenges

- [4 - Pick](#4---pick)
- [7 - Readonly](#7---readonly)
- [11 - Tuple to Object](#11---tuple-to-object)
- [14 - First of Array](#14---first-of-array)

## Easy

### [4 - Pick](https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md)

- The goal of the exercise is to implement the built-in `Pick<T, K>` generic without using it. It constructs
a type by picking the set of properties `K` from `T`.

```ts
// This is what I have to solve:
type MyPick<T, K> = any

// These are my given interfaces
interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

// These are the cases that I need to get to pass
type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]
```
- As just a place to start, look at the test cases. So `Expected1` is the resulting type that you're
trying to get. You are trying to get it via your custom implementation of `Pick` via `MyPick`. So when
`MyPick` is good, tests pass and the type errors go away.
- If you compare `Todo` vs. `Expected1`, `Todo` has three properties: `title`, `description`, and `completed`.
`Expected1` only has `title`. So from `Todo`, the property that I want to **pick** is just `title`. And that
test case is already done for me: `Expect<Equal<Expected1, MyPick<Todo, 'title'>>>`. To write this in a kind
of pseudo-code, it would look like: `Expected1 === MyPick(Todo, 'title')` - my first argument is the object
I want to peel properties from and then the rest of the arguments are the keys of that object that I want.
- Same thing with `Expected2` - I want to peel off properties from `Todo`, this time I want `title` and
`completed`.
- This is a good starting context - I can see that `Expected1` and `Expected2` are just interfaces that have
only *some* of the properties of `Todo`. Now I just need to write the code that solves this issue.
- To try to accomplish this, from scratch, the concepts used here is **generics** or **generic types**.
  - CM: This honestly feels way more complicated than it needs to be....
- Here is the answer and then I will try to explain it:

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```
- If I were to read this code aloud, it would sound like this:
> The type `MyPick` takes two type parameters, `T` and `K` where `T` represents an object type
> and `K` is a union of keys of `T` (in other words, `K` can have every key of `T` or only
> some, it cannot have keys that aren't present in `T`). `MyPick` uses a mapped type to create a
> new type (again, that can only be a subset of the properties in `T`). For each key `P` in `K`,
> create a new property `P` in the output type whose value is the corresponding property of `T`.
> The resulting type is `{ [P in K]: T[P] }`.
- Here is a breakdown of the code:
  - `K extends keyof T` ensures that `K` is a union of keys of `T`.
  - `[P in K]` is a mapped type that iterates over each key in `K`.
  - `T[P]` is the type of the property in `T` corresponding to the current key `P`.
- I rewrote it using longer form variable names to kind of explain what's happening:

```ts
type MyPick<BaseObject, NewType extends keyof BaseObject> = {
  [Property in NewType]: BaseObject[Property]
}
```
- Here, `BaseObject` is the object like `Todo` that I'm using as my guide. I can only use the properties
from my `BaseObject`.
- And then `NewType` is the new type that I'm creating. I use `extends keyof` which is a type of contraint
that restricts a type parameter to be a union of keys of another type. So my `NewType` can **ONLY** contain
the properties that `BaseObject` has
- And now, in my `NewType` object, for each key `Property` in `NewType`, create a new property (`Property`) in
the output type whose value is corresponding property of `BaseObject`.

- Concepts:
  - generics
  - mapped types

[[↑] Back to top](#top)

### [7 - Readonly](https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md)

- Here is the challenge:

```ts
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
```
- and here is the answer in both TS lingo and long form

```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

type MyReadonly<TargetObject> = {
  readonly [Property in keyof TargetObject]: TargetObject[Property]
}
```
- the "secret" here is the `readonly` keyword.
- All of this stuff looks like a different language but from a code perspective, if I had to implement
this, I would essentially say: "iterate through the object and make each property readonly"...I just
have no idea how to do that in TypeScript
- The answer is easy to understand but just to explain it, my `MyReadonly` type takes a generic type
`T` and then returns a new type that is a mapped type. The mapped type iterates over each key `P` in
`T` and creates a new property `P` in the output type whose value is the corresponding property of `T`.
The only thing that makes it `readonly` is the first word in the type: `readonly [P in keyof T]`.
- In the type below, I'm removing the `readonly`.

```ts
type CoolObject<T> = {
  [P in keyof T]: T[P]
}
```
- So type `CoolObject` just creates a shadow copy and adds no additional properties or modifications.
- Sticking with the `CoolObject` type, let's say that I want to make everything else editable
EXCEPT the `name` property:

```ts
type CoolObject<T> = {
  readonly [P in keyof T]: P extends 'name' ? readonly T[P] : T[P];
};
```
- And here is an opposite example where everything is `readonly` except for an object's `balance` property:

```ts
type CoolObject<T> = {
  readonly [P in keyof T]: P extends 'balance' ? T[P] : readonly T[P][];
};
```

[[↑] Back to top](#top)

### [11 - Tuple to Object](https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.md)

- Here is the challenge:

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

const result: TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```
- and here is the answer:

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

// CORRECT: working answer
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}
```
- My gut here was just this:

```ts
// WRONG
type TupleToObject<T extends readonly any[]> = {
  [P in T]: P
}
```
- but that doesn't work. It doesn't work because you're using the type `T` as a key. But you don't want 
the entire type, you just want the value from the tuple as a key. 
- So the next logical choice, IMO, is to use `[P in T[string]]: P` but that doesn't work either...

```ts
// WRONG
type TupleToObject<T extends readonly any[]> = {
  [P in T[string]]: P
}
```
- In TypeScript, `T[string]` refers to the type of the value that would be accessed by using a
string as an index on the type `T`. This is typically used when `T` is an **object type**, and 
`T[string]` represents the type of the property value associated with the string index key.
- However, in the case of tuples, the index type `T[number]` is used to **represent the union**
**of all element types in the tuple**. It extracts the individual types of the elements rather
than the specific values associated with them. **Tuples are arrays! We can't use a string**
**to access something on an array**.
- Since we want to iterate over the elements of the tuple and use each element as a property
key, the correct approach is to use `T[number]` as the index type. This allows us to access
and iterate over the union of all element types in the tuple `T` and use them as property
keys in the resulting object type.
- That's how we get to the final answer:

```ts
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}
```
- I'd like to take another crack at explaining this to myself. The `T` variable has always confused
me. It kind of makes sense but I think it's important to remember the context of the type. In this
case, we are given a tuple which is an `array`. So `T` is the array and `T[number]` is the value
at that place in the array. If it was a constant, `T[0]` would have some value like `tesla`, for
example. So keeping that in mind, let's go:
  - what am I trying to do? I'm trying to convert a tuple to an object such that `['boy', 'fish']`
  becomes `{ boy: 'boy', fish: 'fish' }`.
  - If I was making an object, I could just iterate through the array. But given that I need to
  use indexed access, I need to use `T[number]`.
  - So `P` as in "property" in my tuple `T` at position `[number]`, or, `T[number]` is equal to
  `P`.

[[↑] Back to top](#top)

### [14 - First of Array](https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md)

- Here is the challenge:
```ts
// Implement a generic `First<T>` that takes an Array `T` and returns it's first element's type.
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```

- First, I have no idea where to even start. My gut was maybe to try [Extract](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union)
but I have no idea how it actually works on an array.
- this doesn't work:

```ts
// Doesn't work
type First<T extends any[]> = Extract<T, T[0]>
```
- here is the answer:

```ts
// Answer
type First<T extends any[]> = T extends [] ? never : T[0]
```
- Without digging into the answer, let's take a step back. Let's pretend that I could assume that the
array always has at least one element. Then I could just do this:

```ts
// Returns the first element of an array IF there is at least one element
type First<T extends any[]> = T[0]

// Test Cases
type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>, // Pass
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>, // Pass
  Expect<Equal<First<[]>, never>>, // FAIL
  Expect<Equal<First<[undefined]>, undefined>>, // Pass
]
```
- The only one that fails is the empty one. So now I need to check for that. If I was using
JavaScript, I could just do `T.length === 0` but I can't.
- This is where the `extends` keyword comes in. I can use it to check for an empty array:

```ts
// Returns the first element of an array IF there is at least one element
type First<T extends any[]> = T extends [] ? never : T[0]
```
- The `extends` keyword is used to check if a type is a subtype of another type. In this case,
I'm checking if `T` is a subtype of `[]`. If it is, then return `never` (which is a type that
represents the type of values that never occur). If it's not, then return the first element
- I think that what is important is that `[]` is not just a stand-in for the word `Array`. It's
specifically checking if the type, `T`, is not just an array but an empty array.
- Consider this code:

```ts
// Doesn't work AND returns this error:
// Generic type 'Array<T>' requires 1 type argument(s).(2314)
type First<T extends any[]> = T extends Array ? never : T[0]
```
- This doesn't work because `Array` is a generic type. It requires a type argument. So I'm not
even using `Array` properly here.
- Here is another solution using `Extract` but it doesn't look like it handles empty arrays:

```ts
// Works
type First<T extends any[]> = T[Extract<keyof T, '0'>];

// It seems to pass the test case with the empty array but I don't understand why
```
- Here is another one that works that I think makes sense:

```ts
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
```
- exactly as it says, we're accessing the `length` property on the array and checking if
it's `0`. If it is, return `never`. If it's not, return the first element.


[[↑] Back to top](#top)

### [18 - Length of Tuple](https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.md)

- Here is the challenge:

```ts
// For given a tuple, you need create a generic `Length`, pick the length of the tuple
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT'
]

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

- for something like this, I again, don't know where to start - I don't understand the point of
this. I need to create a type, `Length`, that when given a tuple, returns the length of that 
tuple. That sounds like a function.
- this is the code that I need to get working:

```ts
type Length<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]
```

- here is one of the most popular answers;

```ts
// Answer
type Length<T extends readonly any[]> = T['length']
```
- I don't know if this is the proper "frame" to adopt but I am going to try to explain it in a 
way that makes sense to me. So first, I started with: `type Length<T> = any`. It doesn't
specify anything really about `T` unlike some of the previous tuple examples. So one
assumption I had about these challenges is that the left side type is "given" is wrong - I can
change what I need.
- Second, let's look at what's in the `<>`; `<T>`. First thing about this challenge is that
I am trying to figure out the length of a tuple (array) so if I wanted to tighten up the current
type for `T`, I could do this: `<T extends any[]>`. This is saying that `T` is an array of
any type.
- Once I do that, I can access the `length` property on the array (in the way I'd access a property of
an object) by doing `T['length']`. So now I have `type Length<T extends any[]> = T['length']`.
- In TypeScript, I see that this doesn't work. And this is another key item that I'm learning - 
TypeScript gives you the answer to your issue...in the challenge, it said for the one test case:
*"The type 'readonly ["tesla", "model 3", "model X", "model Y"]' is 'readonly' and cannot be assigned*
*to the mutable type 'any[]'"*. It's giving me the answer already - I have to make my generic type
a readonly array. 
- So now when I update it to `type Length<T extends readonly any[]> = T['length']`, it works.

**Early Take-aways (that may or may not be right)**
1. The left side type, in the brackets (`<>`), defines the type you are working with on
the right side. So Step 1 should be to properly define it. If you are creating a type for
an object, make sure you define it that way.
2. TypeScript will give you the answer to your issue. If your type isn't working, read what the error
is - it's telling you why it doesn't like it.
3. Access native properties of an array like `T['length']` or `T[0]`
4. Things can be "defined" in the definition. If you look at the [Tuple To Object](#11---tuple-to-object)
challenge, `[P in T[number]]: P`, I am essentially defining "P" in the definition. I am saying
the property, `P`, that is at `T[number]`, is being set to `P`.
5. All of this "knowledge" is temporary until I actually learn this shit.

[[↑] Back to top](#top)

### [43 - Exclude](https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.md)

- here is the challenge:

```ts
// Implement the built-in Exclude<T, U>
//   => Exclude from T those types that are assignable to U
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```
- and here is the setup:

```ts
type MyExclude<T, U> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]
```
- here is another where I have no idea how to do it. So when I look at the test cases, I will label
my `T` and `U` types. For Case 1: `T = 'a' | 'b' | 'c'` and `U = 'a'` and so the answer I want is
`'b' | 'c'`.
- So when starting with `type MyExclude<T, U> = any`, my gut is always like I want to find out the
type of the argument (e.g. an array, an object, whatever) and then iterate through it.
- I had no idea how to continue this one so I looked up a few answers and this is what I got:

```ts
// Answer
type MyExclude<T, U> = T extends U ? never : T
```
- It's almost like it iterates the individual types in `T` and checks if they are assignable to `U`.
I don't know. Maybe the frame of `T` being an argument isn't quite right...
- the code part makes sense and seems intuitive but I don't entirely get it. In my head, it would only
make sense if `T` was a single type not `'a' | 'b' | 'c'`.

[[↑] Back to top](#top)

