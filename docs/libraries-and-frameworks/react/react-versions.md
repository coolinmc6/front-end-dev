---
title: Versions
description: |
  Brief description of major features and changes from various React versions. As new 
  versions come out, add notes and links that describe the cool new features coming to React
---

# React Versions

## React 19

Links:
- https://www.youtube.com/watch?v=v07gXY6ESEo

### WDS: NEW React 19 Changes Are Amazing

Source: https://www.youtube.com/watch?v=v07gXY6ESEo

- React compiler is going to automatically apply `useMemo`, `useCallback`, and `memo`
- it's going to find more instances when you should be using them than you normally would
- Actions allow you to pass a function to DOM elements such as a form
  - instead of an `onSubmit`, you use an action
- `useOptimistic` allows you to do optimistic updates (you click a like button and it shows that
it is updated even though you haven't sent the request to the server yet)
- adding `"use client"` and `"use server"`.
- Document Metadata can be added anywhere in the component and it'll be added to the head
of the document
- you won't need `forwardRef` anymore
- you can use the `use` hook which can replace `lazy`

## React 18

- Introduced concurrent rendering features (automatic batching by default)
- New root API: `ReactDOM.createRoot()` for improved performance and concurrency
- SSR streaming support with Suspense on the server
- Added new hook: `useId` for generating stable unique IDs
- Improved strict mode behavior and hydration mismatch handling

## React 17

- No new developer-facing features; focused on a gradual upgrade path
- New JSX transform: no need to import React in every file
- Updated event delegation: listeners attach to the root instead of the document
- Improved support for future async rendering migrations

## React 16

- Complete rewrite of core architecture (Fiber) for better reconciliation
- Introduced error boundaries via `componentDidCatch`
- Added portals using `ReactDOM.createPortal` to render outside parent DOM hierarchy
- Fragment syntax support: `<>...</>`
- New Context API with `React.createContext`
- Hooks introduced in React 16.8: `useState`, `useEffect`, `useContext`, etc.

## React 15

- Legacy lifecycle methods (`componentWillMount`, `componentWillReceiveProps`, etc.)
- Stateless functional components without hooks
- React Addons separated into standalone packages (e.g., react-addons-css-transition-group)
- Performance tool `react-addons-perf` for profiling
- Official support dropped for IE8

--- 
### Versioning note: 0.14 to 15

After React 0.14, the next major release was React 15; there were no versions 1.x through 14.x.

---

## React 0.14

- React and ReactDOM split into separate packages (`react` vs `react-dom`)
- Stateless functional components became a first‑class citizen
- Enabled custom renderers (React Native, etc.) via new Reconciler API
- Removed two‑way data binding and mixin support for ES6 classes

## React 0.13

- Introduced ES6 class component support alongside `React.createClass`
- Stateless functional components simplified component definitions
- Performance improvements in reconciliation algorithm
- TransitionGroup and LinkedStateMixin provided as addons