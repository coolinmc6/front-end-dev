[Home](https://github.com/coolinmc6/front-end-dev)
[Back to JavaScript Home](https://github.com/coolinmc6/front-end-dev/tree/master/typescript)

<a id="top"></a>

# Type Challenges

Link: https://github.com/type-challenges/type-challenges

- [4 - Pick](#4---pick)

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

[[↑] Back to top](#top)