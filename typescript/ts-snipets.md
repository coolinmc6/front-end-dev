# TypeScript Snippets

- [Zustand](#zustand-typescript-snippets)

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