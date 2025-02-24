---
title: React Versions
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

## React 17

## React 16

## React 15