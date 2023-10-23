

## Performance - BULK NOTES

Here are some things to keep in mind regarding React performance:

- Use Production Build - Make sure to use the production build of React in production. It is optimized
for performance.
- Avoid Reconciliation - Try to avoid unnecessary re-renders that cause React to re-reconcile the DOM. 
Use shouldComponentUpdate, PureComponents, or immutable data structures.
- Virtualize Long Lists - Use react-window or similar libraries to render long lists virtually to
avoid over-rendering.
- Code Splitting - Split code into smaller chunks with React.lazy and Suspense to improve initial load time.
- Avoid Inline Functions - Avoid passing inline functions as props as it leads to re-renders.
Instead, use callbacks or memoization.
- Avoid Inline Objects - Pass objects into components as reference instead of inline objects
to avoid unnecessary re-renders.
- Use React.memo - Wrap functional components in React.memo to shallowly compare props and
avoid re-renders.
- Use UseMemo - Wrap expensive functions in useMemo to avoid repeat calls on each render.
- Use UseCallback - Wrap functions in useCallback to memoize them between re-renders.
- Optimize Images - Use image optimization tools and lazy loading for images to improve
load time.
- Monitor Performance - Use profiling tools like React DevTools Profiler to find and fix bottlenecks.
- Avoid Anti-Patterns - Avoid common anti-patterns like props in initial state, improper keys, redundant checks, etc.


### React Anti-Patterns

Links:
- https://www.perssondennis.com/articles/react-anti-patterns-and-best-practices-dos-and-donts
- https://yosua-halim.medium.com/10-react-anti-patterns-you-should-know-300256bfb007


## Suspense
