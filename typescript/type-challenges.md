[Home](https://github.com/coolinmc6/front-end-dev)
[Back to JavaScript Home](https://github.com/coolinmc6/front-end-dev/tree/master/typescript)

<a id="top"></a>

# Type Challenges

Link: https://github.com/type-challenges/type-challenges

- [4 - Pick](#4---pick)
- [7 - Readonly](#7---readonly)
- [11 - Tuple to Object](#11---tuple-to-object)

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



