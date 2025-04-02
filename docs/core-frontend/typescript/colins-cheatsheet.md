---
title: Colin's Cheatsheet
---

# Cheat Sheet Tables

## TypeScript Power Tools Cheat Sheet

| Utility | Purpose | Example |
|---------|---------|---------|
| `Partial<T>` | Make all props optional | `Partial<User>` |
| `Required<T>` | Make all props required | `Required<User>` |
| `Readonly<T>` | Make all props readonly | `Readonly<User>` |
| `Pick<T, K>` | Pick some keys | `Pick<User, id' \| 'name'>` |
| `Omit<T, K>` | Remove some keys | `Omit<User, 'password'>` |
| `NonNullable<T>` | Remove `null` & `undefined` | `NonNullable<string \| null>` |
| `Record<K, V>` | Create a key-value map | `Record<string, number>` |
| `Exclude<T, U>` | Remove types assignable to `U` | `Exclude<'a' \| 'b', 'a'> // 'b'` |
| `Extract<T, U>` | Keep only types assignable to `U` | `Extract<'a' \| 'b', 'a'> // 'a'` |
| `ReturnType<F>` | Get return type of a function | `ReturnType<typeof getUser>` |
| `Parameters<F>` | Get parameter types of a function | `Parameters<typeof getUser>` |
| `Awaited<T>` | Get resolved type of a Promise | `Awaited<Promise<User>> // User` |
| `Indexed Access` | Grab part of a type | `UserQuery['profile']` |

## Common Real-World TypeScript Combos

| Combo | Purpose | Example |
|-------|---------|---------|
| `Pick<ParentType['nested'], K>` | Extract specific keys from a nested type | `Pick<AccountQuery['user'], 'id' \| 'name'>` |
| `Omit<ParentType['nested'], K>` | Remove unwanted keys from a nested type | `Omit<AccountQuery['user'], 'password'>` |
| `Partial<ParentType['nested']>` | Make a nested type partially optional | `Partial<AccountQuery['user']>` |
| `Required<Pick<T, K>>` | Ensure a subset of props are required | `Required<Pick<User, 'email'>>` |
| `NonNullable<ParentType['nested']>` | Remove `null` and `undefined` from a nested type | `NonNullable<AccountQuery['user']>` |
| `ReturnType<typeof fn>` + `Pick<>` | Grab only the needed parts of a function's return | `Pick<ReturnType<typeof getUser>, 'id'>` |
| `Partial<Pick<T, K>>` | Optional subset for mock/test data | `Partial<Pick<User, 'id' \| 'name'>>` |
| `Omit<ReturnType<typeof fn>, K>` | Drop noisy keys from function return types | `Omit<ReturnType<typeof getUser>, 'metadata'>` |
| `Indexed Access` + `Partial<>` | Make part of a deeply nested object optional | `Partial<AccountQuery['user']['stats']>` |
| `Pick<Extract<T, U>, K>` | Combine filtering + selection | `Pick<Extract<UserRole, 'admin' \| 'moderator'>, 'permissions'>` |


## Utility Types

### Partial

### NonNullable