---
title: React Compiler
description: ""
---

# React Compiler

React Compiler is an experimental optimization tool that automatically optimizes React applications by transforming your code at build time. It addresses the performance challenges that arise from React's default behavior of re-rendering components whenever props or state change, even when the actual output hasn't changed. The compiler automatically memoizes components and values using the equivalent of `useMemo`, `useCallback`, and `React.memo` without requiring developers to manually add these optimizations. This reduces the mental overhead of performance optimization while ensuring that React applications run faster by minimizing unnecessary re-renders and computations.

## Configuration

[Configuration](https://react.dev/reference/react-compiler/configuration)

## Directives

#### use no memo

[Directives](https://react.dev/reference/react-compiler/directives/use-no-memo)

- just add `"use no memo"` at the beginning of a function to prevent React Compiler optimization.
- it is generally used when debugging compiler issues - they recommend using it sparingly
