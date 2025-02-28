---
title: Advanced TypeScript Snippets
sidebar_position: 5
---

# Advanced TypeScript

## TypeScript Route Validation and Autocomplete

Source: https://dev.to/hichemtab-tech/the-day-i-truly-realized-i-was-a-junior-developer-kgp

```ts
type MergePath<T extends string | undefined, P extends string> =
  T extends ""
    ? P
    : P extends "/" | ""
      ? `${P}${T}`
      : `${P}/${T}`;

type ExtractRouteType<T extends RouteObject, P extends string> =
  T extends { path: string }
    ? { route: P, paramsKeys: ExtractPathParams<P> }
    : never;

type ExtractRoute<T extends RouteObject, P extends string> =
  (T extends { id: string, path: string }
    ? { [K in T["id"]]: ExtractRouteType<T, P> }
    : {}) & ExtractRoutes<T["children"], P>;

type ExtractRoutes<T extends RouteObject[] | undefined, P extends string = ""> =
  T extends [infer R extends RouteObject, ...infer S extends RouteObject[]]
    ? ExtractRoute<R, MergePath<R["path"], P>> & ExtractRoutes<S, P>
    : {};

type ExtractPathParams<Path extends string> =
    Path extends `${string}:${infer Param}/${infer Rest}`
    ? [Param, ...ExtractPathParams<`/${Rest}`>]
    : Path extends `${string}:${infer Param}`
    ? [Param]
    : [];

export type RouteById =
  ExtractRoutes<typeof routeObjects> extends infer U
    ? { [K in keyof U]: U[K] }
    : never;
```

### Description

This TypeScript code defines a set of utility types to extract and manipulate route information from a given set of route objects. Here's a breakdown of what each part does:

#### `MergePath`

```tsx
type MergePath<T extends string | undefined, P extends string> =
  T extends ""
    ? P
    : P extends "/" | ""
      ? `${P}${T}`
      : `${P}/${T}`;
```
- **Purpose:** Concatenates two path segments `T` and `P` into a single path.
- **Logic:**
  - If `T` is an empty string, return `P`.
  - If `P` is "/" or an empty string, concatenate `P` and `T`.
  - Otherwise, concatenate `P` and `T` with a "/" in between.

#### `ExtractRouteType`
```tsx
type ExtractRouteType<T extends RouteObject, P extends string> =
  T extends { path: string }
    ? { route: P, paramsKeys: ExtractPathParams<P> }
    : never;
```
- **Purpose:** Extracts route information from a route object `T` and a path `P`.
- **Logic:**
  - If `T` has a `path` property, return an object with `route` set to `P` and `paramsKeys` set to the extracted path parameters from `P`.
  - Otherwise, return `never`.

#### `ExtractRoute`
```tsx
type ExtractRoute<T extends RouteObject, P extends string> =
  (T extends { id: string, path: string }
    ? { [K in T["id"]]: ExtractRouteType<T, P> }
    : {}) & ExtractRoutes<T["children"], P>;
```
- **Purpose:** Extracts route information from a route object `T` and its children.
- **Logic:**
  - If `T` has `id` and `path` properties, create an object with the key as `T["id"]` and value as the result of `ExtractRouteType<T, P>`.
  - Combine this with the result of `ExtractRoutes` applied to `T["children"]` and `P`.

#### `ExtractRoutes`
```tsx
type ExtractRoutes<T extends RouteObject[] | undefined, P extends string = ""> =
  T extends [infer R extends RouteObject, ...infer S extends RouteObject[]]
    ? ExtractRoute<R, MergePath<R["path"], P>> & ExtractRoutes<S, P>
    : {};
```
- **Purpose:** Recursively extracts route information from an array of route objects `T`.
- **Logic:**
  - If `T` is a non-empty array, extract route information from the first element `R` and merge it with the result of `ExtractRoutes` applied to the rest of the array `S`.
  - If `T` is empty or undefined, return an empty object.

#### `ExtractPathParams`
```tsx
type ExtractPathParams<Path extends string> =
    Path extends `${string}:${infer Param}/${infer Rest}`
    ? [Param, ...ExtractPathParams<`/${Rest}`>]
    : Path extends `${string}:${infer Param}`
    ? [Param]
    : [];
```

##### Purpose
The `ExtractPathParams` type is a utility type that extracts the parameter names from a given URL path string. It returns an array of parameter names found in the path.

##### How It Works

**Pattern Matching with Template Literal Types:**
- The type uses TypeScript's template literal types to match and extract parts of the string.

**Conditional Types:**
- The type uses conditional types to recursively extract parameters.

**Logic:**

1. **First Condition:** `Path extends ${string}:${infer Param}/${infer Rest}`
   - This checks if the `Path` contains a parameter (denoted by `:Param`) followed by a slash (`/`).
   - If it matches, it extracts `Param` and the rest of the path (`Rest`).
   - It returns an array with `Param` and recursively calls `ExtractPathParams` on the rest of the path.

2. **Second Condition:** `Path extends ${string}:${infer Param}`
   - This checks if the `Path` contains a parameter (denoted by `:Param`) without a following slash.
   - If it matches, it extracts `Param`.
   - It returns an array with `Param`.

3. **Default Case:** `[]`
   - If neither condition matches, it returns an empty array, indicating no parameters are present.

##### Example
For the path `"/user/:id/profile/:section"`, `ExtractPathParams` would work as follows:
- First, it matches `"/user/:id/profile/:section"` with the first condition, extracting `id` and the rest of the path `"/profile/:section"`.
- Then, it recursively processes `"/profile/:section"`, extracting `section`.
- The final result is `["id", "section"]`.

This type is useful for extracting dynamic parameter names from URL paths in a type-safe manner, which can be particularly helpful in routing systems.


#### `RouteById`
```tsx
export type RouteById =
  ExtractRoutes<typeof routeObjects> extends infer U
    ? { [K in keyof U]: U[K] }
    : never;
```
- **Purpose:** Creates a type that maps route IDs to their extracted route information.
- **Logic:**
  - Apply `ExtractRoutes` to `routeObjects` and infer the result as `U`.
  - Create a type with keys from `U` and values as the corresponding values from `U`.

### Summary
This code is designed to take a nested structure of route objects and produce a type that maps route IDs to their corresponding route information, including paths and parameter keys. This can be useful for type-safe route management in a TypeScript application.