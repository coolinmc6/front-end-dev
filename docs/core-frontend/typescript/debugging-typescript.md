---
title: Debugging TypeScript
description: |
  Examples and run-downs of different TypeScript errors and how I solved them.
---

# Debugging TypeScript

### Handling Multiple Return Types

Here’s a simplified example of a TypeScript error you might see when a function can return *either* a string (`"Invalid token"`) or a user object (`{ id: '', email: ''}`).

#### The Problem

Suppose we have a `parseToken` function that sometimes returns an error string and sometimes returns a valid user object:

```ts
// parseToken.ts
export const parseToken = async (token: string) => {
  if (!token) {
    return 'Invalid token'
  }
  // ... (verify the JWT, etc.)
  return {
    id: '123',
    email: 'someone@example.com',
    exp: 9999999999
  } // Some object
}
```
Then in another function, `getUserFromEvent`, we call `parseToken`:

```ts
// getUserFromEvent.ts
export const getUserFromEvent = async (event) => {
  const token = getCookieToken(event) // e.g., read from cookies
  const user = await parseToken(token)

  const isAnonymous = user === 'Invalid token'
  // TypeScript error: user might be 'Invalid token' OR the user object
  // But this code treats 'user' as if it's ALWAYS the user object.
  return {
    isAnonymous,
    user
  }
}
```
TypeScript complains:

```ts
Type 'string' is not assignable to type '{ id: string; email: string; exp: number; }'.
Type 'string | { id: string; email: string; exp: number; }' is not assignable to type '{ id: string; email: string; exp: number; }'.
```

Why? Because TypeScript sees that `parseToken(token)` can return two possible types—a string (i.e., 'Invalid token') or the user object — yet `getUserFromEvent` uses user as if it were always the user object.

#### The Fix: Use a Union Return Type & Type Guard

1. Declare an explicit union return type for parseToken.
2. Use an if check (type guard) to handle the `"Invalid token"` case separately from the user object case.

```ts
// 1) Create a specific type for valid tokens
type TokenObject = {
  id: string
  email: string
  exp: number
}

// 2) Explicitly define the union of possible return values
export const parseToken = async (
  token: string | null
): Promise<TokenObject | 'Invalid token'> => {
  if (!token) {
    return 'Invalid token'
  }

  try {
    // ... verify JWT ...
    // In this example, the JWT has an id, email, and expiration value
    return { id: '123', email: 'someone@example.com', exp: 9999999999 }
  } catch {
    return 'Invalid token'
  }
}

// 3) In getUserFromEvent, use a type guard to check the return value
export const getUserFromEvent = async (event): Promise<{
  isAnonymous: boolean
  user: { id: string; email: string }
}> => {
  const token = getCookieToken(event)
  const userOrInvalid = await parseToken(token)

  if (userOrInvalid === 'Invalid token') {
    // In this branch, userOrInvalid is definitely the string "Invalid token"
    return {
      isAnonymous: true,
      user: { id: '', email: '' }
    }
  }

  // Otherwise, userOrInvalid is definitely a TokenObject
  // We can safely destructure
  const { id, email } = userOrInvalid

  return {
    isAnonymous: false,
    user: { id, email }
  }
}
```

#### Explanation

- **Union Return Type**: We explicitly declared the return type of `parseToken` as 
`Promise<TokenObject | 'Invalid token'>`. This tells TypeScript that two distinct values are possible.
- **Type Guard**: The check if `(userOrInvalid === 'Invalid token') { ... } else { ... }` narrows the type.
  - Inside the if, the compiler knows userOrInvalid must be the string 'Invalid token'.
  - Inside the else, it must be a TokenObject.
- **Destructuring**: By doing the if check, TypeScript now trusts that userOrInvalid is a real object inside the else block, so we can safely destructure id and email.

With this approach, you avoid the type error and ensure you handle both the success and failure cases properly.