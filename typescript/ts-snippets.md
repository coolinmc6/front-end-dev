# TypeScript Snippets

- [Zustand](#zustand-typescript-snippets)

## General TypeScript

### as const

- In TypeScript, `as const` is a type assertion that tells the compiler to infer a "literal" type for an expression.
- When applied to an object or an array, as const makes all the properties or elements read-only and immutable, so that they cannot be changed or reassigned. This can be useful for ensuring that certain values remain constant throughout the program.

```js
// Object Example
const person = {
  name: 'Alice',
  age: 30,
  address: {
    city: 'London',
    country: 'UK',
  },
} as const;

person.name = 'Bob'; // Error: Cannot assign to 'name' because it is a read-only property.
person.address.city = 'Paris'; // Error: Cannot assign to 'city' because it is a read-only property.

// Array Example
const fruits = ['apple', 'banana', 'orange'] as const;

fruits[0] = 'pear'; // Error: Index signature in type 'readonly ["apple", "banana", "orange"]' only permits reading.
```
- with both the `person` object and the `fruits` array, we can ensure that neither of them can be changed or reassigned
at runtime
- this also means that we can't add additional properties to the object nor can we add or remove items from the fruits array


## Zustand-TypeScript Snippets

```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PREFIX } from '@/constants/stores'

export type MetaDataState = {
  useLoggedIn: boolean
}

type MetaDataActions = {
  getKey: (key: string) => unknown
  setKey: (key: string, value: unknown) => void
}

export const useMetaDataStore = create<MetaDataState & MetaDataActions>()(
  persist(
    (set, get) => ({
      useLoggedIn: false,

      getKey: (key: string) => get()[key as keyof MetaDataState],
      setKey: (key: string, value: unknown) => set({ [key]: value }),
    }),
    {
      name: `${PREFIX}__METADATA__`,
    }
  )
)

export const getMetaDataKey = (key: string) =>
  useMetaDataStore.getState().getKey(key)

export const setMetaDataKey = (key: string, value: unknown) =>
  useMetaDataStore.getState().setKey(key, value)
```
- I like the combination of the two types - I think it's a cool way to separate the state
from the actions.
- `getKey: (key: string) => get()[key as keyof MetaDataState],` this code was tricky because
it was yelling at me so I had to add the `as keyof MetaDataState` to get it to work. Here's the original
error:

  > Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'MetaDataState & MetaDataActions'. No index signature with a parameter of type 'string' was found on type 'MetaDataState & MetaDataActions'
- This is also a really good basic implementation of Zustand with `create` and `persist` middleware.