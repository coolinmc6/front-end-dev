[Home](https://github.com/coolinmc6/front-end-dev)
[Back to React Home](https://github.com/coolinmc6/front-end-dev/tree/master/react)

<a id="top"></a>

# Front End Masters: React Performance

Source: https://frontendmasters.com/courses/react-performance/

## Introduction

- Course repos:
  - https://github.com/stevekinney/wordman
  - https://github.com/stevekinney/packing-list
  - https://github.com/stevekinney/hottest-takes
  - https://github.com/stevekinney/project-notes
  - https://github.com/stevekinney/lots-to-do
- Caching and memoizing
- Structuring apps for performance
- New concurrency features like `useTransition()` and `useDeferredValue()`

[[↑] Back to top](#top)

## React Rendering

### Inspect Performance with Dev Tools

Source: https://frontendmasters.com/courses/react-performance/inspect-performance-with-dev-tools/

- first - are you running in production mode?
- do components include unique keys?
  - when iterating over an array
- get React Developer Tools (which I have)
- Profiler is like the Performance tab
  - hit record button and then start doing stuff in the app (e.g. add a post, click a button, etc.)
  - there's a tab in there that allows you to "Highlight updates when component render" - use that to see which
  items are re-rendering
- **Things I can do today:**
  - look at the Profiler and play with the highlight updates when components render. That sounds cool.
  That can be used to see

[[↑] Back to top](#top)

### React Rendering Cycle

Source: https://frontendmasters.com/courses/react-performance/react-rendering-cycle/

- Three main phases:
  - Render Phase: it invokes all the classes and calls all the functions and looks out the output to figure out what's different
  - Commit Phase: in the commit phase, it actually makes the changes to the DOM
  - Cleanup Phase: it cleans up any effects that were created in the render phase
- Render Phase is typically triggered by a state change or a prop change
  - if the parent re-renders, the children will re-render
  - the further you can push down the state change, the fewer children components that need to re-render


[[↑] Back to top](#top)

### React Fiber & Rendering Q&A

Source: https://frontendmasters.com/courses/react-performance/react-fiber-rendering-q-a/

- a fiber is a fancy word for a very cool data structure that React uses to keep track of component instances

[[↑] Back to top](#top)

### Find a Performance Issue Exercise

Source: https://frontendmasters.com/courses/react-performance/find-a-performance-issue-exercise/

- Repo: https://github.com/stevekinney/wordman
- branch: `initial-slowdown-exercise`

- The first issue we fixed is how the app sets its first random color. Instead of doing this:

```jsx
// Wrong way
const [correctAnswer, setCorrectAnswer] = useState(generateRandomColor());
```

- we should do this:

```jsx
// Right way
const [correctAnswer, setCorrectAnswer] = useState(() => generateRandomColor());
```

- The key take-away from this is that when we load this page, if we need to initialize
our `correctAnswer` variable, we have to get a random color. By using the first way,
we're generating a new random color every time the component renders. So whenever the
user changes their guess (or as they're typing their guess), it keeps generating
random colors. The second way is a "lazy initializer" - it runs the first time the
component is rendered and will use that value on subsequent renders.

[[↑] Back to top](#top)

### Performance Issue Q&A

Source: https://frontendmasters.com/courses/react-performance/performance-issue-q-a/

- **NOTE:** for some reason, my React Devtools isn't working - that not's good. I'll have to figure that out.

[[↑] Back to top](#top)

## Reducing Renders

### Reducing Rerenders Intro

Source: https://frontendmasters.com/courses/react-performance/reducing-rerenders/

Repo: https://github.com/stevekinney/packing-list

Playing with the Profiler, one of the first things I should do is set the "Highlight
updates when components render" checkbox.

![Highlight updates when components render](../assets/profile-checkbox.png)

**First Optimization:** After doing that, looking at the code in `application.js`, the first thing I see is the issue
mentioned before: 

```js
// Old way: generates the list every time
const [items, setItems] = useState(getInitialItems());

// New way: only generates the list the first time
const [items, setItems] = useState(() => getInitialItems());
```

**Second Optimization:** In `application.js`, we were initializing the state for the input field. As in, 
we were setting the empty string and passing the set hook down to the input component called `<NewItem />`.
We absolutely did not need to do that. So here are the changes we made (abbreviated):

```jsx
// application.js

// First: removed the state initialization
// const [newItemName, setNewItemName] = useState('');

// Second: removed the props to NewItem
<NewItem
  {/* newItemName={newItemName}
  setNewItemName={setNewItemName} */}
  addItem={add}
/>
```

And then we just added them back to the `<NewItem />` component (which is just removing the props
and add the state initialization). Now, whenever I type into the input box, the only re-render
happens around that `<NewItem />` component and not the entire list.

### Pushing State Down Exercise

Source: https://frontendmasters.com/courses/react-performance/pushing-state-down-exercise/

We fixed the color generating app. Same issue as name indicates - instead of passing the
state down, we just handle the input in the `<ColorPicker />` component.

[[↑] Back to top](#top)

### Pulling Content Up with Children

Source: https://frontendmasters.com/courses/react-performance/pulling-content-up-with-children/

Watched.

[[↑] Back to top](#top)

### Pulling Content Up Exercise

Source: https://frontendmasters.com/courses/react-performance/pulling-content-up-exercise/

This is trickier to explain but let's say we want `<ExpensiveComponent />` in the `<Game />` component.
We originally stripped it out because it was expensive. But we can use the `children` prop to
pass it in.

```jsx
// Starting point
const Application = () => {
  return (
    <main className="flex flex-col gap-8 mx-auto my-8 w-96">
      <Game />
      <ExpensiveComponent />
    </main>
  );
};

// Final solution
const Application = () => {
  return (
    <main className="flex flex-col gap-8 mx-auto my-8 w-96">
      <Game>
        <ExpensiveComponent />
      </Game>
    </main>
  );
};
```
Other frameworks call these `slots` but we just have to add the `children` prop to the `<Game />` component.

[[↑] Back to top](#top)

### Pulling Conent Up Solution

Source: https://frontendmasters.com/courses/react-performance/pulling-content-up-solution/

Connector: Start here

[[↑] Back to top](#top)

### useMemo & useCallback

Source: https://frontendmasters.com/courses/react-performance/usememo-usecallback/


[[↑] Back to top](#top)

### useReducer & dispatch




[[↑] Back to top](#top)

### Reducers Q&A



[[↑] Back to top](#top)

## Context


[[↑] Back to top](#top)

## Suspense & Transitions



[[↑] Back to top](#top)

## Wrapping Up

[[↑] Back to top](#top)