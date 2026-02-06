# Understanding Function Stability and useCallback in React

## Table of Contents

1. [The Basics: How JavaScript Functions Work](#the-basics)
2. [When You DON'T Need useCallback](#when-you-dont-need-usecallback)
3. [When You DO Need useCallback](#when-you-do-need-usecallback)
4. [Complex Example: The Dependency Chain Problem](#complex-example)
5. [Decision Rules](#decision-rules)
6. [Common Patterns](#common-patterns)
7. [Performance Considerations](#performance-considerations)

---

## The Basics: How JavaScript Functions Work {#the-basics}

In JavaScript, every time you define a function, you create a new reference in memory. Even if two functions have identical code, they are not equal:

```javascript
const func1 = () => console.log("hello");
const func2 = () => console.log("hello");

console.log(func1 === func2); // false - different references!
```

In React, components re-render frequently. Each render is a complete execution of your component function, which means:

**Every function defined inside your component is recreated on every render.**

```jsx
function MyComponent() {
  // This function is recreated every single time MyComponent renders
  const handleClick = () => {
    console.log("clicked");
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

This is usually fine! But it becomes a problem in specific scenarios.

---

## When You DON'T Need useCallback {#when-you-dont-need-usecallback}

### Rule: If a function is only used for immediate execution, don't use useCallback

### Example 1: Simple Event Handlers

```jsx
function SimpleButton() {
  const [count, setCount] = useState(0);

  // ❌ DON'T DO THIS - useCallback is unnecessary here
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  // ✅ DO THIS - just define it inline
  const handleClick = () => {
    setCount((c) => c + 1);
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

**Why?** The `<button>` doesn't care if `handleClick` is a new reference. It just calls whatever function you give it. There's no optimization benefit here, and `useCallback` actually makes the code slightly slower (it has to run comparison logic).

### Example 2: Functions Used Only in Event Handlers or JSX

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // ✅ These are fine without useCallback
  const fetchUser = async () => {
    const response = await fetch(`/api/users/${userId}`);
    setUser(await response.json());
  };

  const handleRefresh = () => {
    fetchUser();
  };

  const handleLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, [userId]); // ⚠️ ESLint will warn: fetchUser should be in dependencies!

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

**Problem Alert!** This code triggers an ESLint warning. The rule `react-hooks/exhaustive-deps` warns that `fetchUser` should be in the `useEffect` dependency array. But if we add it, the effect will run on every render because `fetchUser` is recreated every time!

This brings us to...

---

## When You DO Need useCallback {#when-you-do-need-usecallback}

### Rule: Use useCallback when a function is used in a dependency array or passed to an optimized child

### Example 3: Functions in useEffect Dependencies

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // ✅ NOW we need useCallback because fetchUser is in a dependency array
  const fetchUser = useCallback(async () => {
    const response = await fetch(`/api/users/${userId}`);
    setUser(await response.json());
  }, [userId]); // Only recreate if userId changes

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Now this is stable and only triggers when userId changes

  return <div>{user?.name}</div>;
}
```

**Why?** The `useEffect` depends on `fetchUser`. Without `useCallback`, `fetchUser` gets a new reference every render, triggering the effect unnecessarily. With `useCallback`, `fetchUser` only gets a new reference when `userId` changes.

### Example 4: Functions Passed to Memoized Children

```jsx
const ExpensiveChildComponent = React.memo(({ onAction, data }) => {
  console.log("Child rendered!");
  // Expensive rendering logic here
  return <div onClick={onAction}>{data}</div>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("initial");

  // ❌ WITHOUT useCallback - child re-renders every time parent renders
  const handleAction = () => {
    console.log("action triggered");
  };

  // ✅ WITH useCallback - child only re-renders when data changes
  const handleAction = useCallback(() => {
    console.log("action triggered");
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChildComponent onAction={handleAction} data={data} />
    </div>
  );
}
```

**Why?** `React.memo` prevents re-renders if props haven't changed. But if `handleAction` is a new reference every time, React thinks the props changed, defeating the optimization.

---

## Complex Example: The Dependency Chain Problem {#complex-example}

This is where things get interesting and where subtle bugs can appear. Let's build up complexity gradually.

### Step 1: A Custom Hook That Returns a Function

```jsx
function useTimer() {
  const [seconds, setSeconds] = useState(0);

  const reset = () => {
    setSeconds(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { seconds, reset };
}
```

This looks innocent enough. Let's use it:

```jsx
function TimerDisplay() {
  const { seconds, reset } = useTimer();

  useEffect(() => {
    if (seconds >= 10) {
      reset();
    }
  }, [seconds, reset]); // ESLint wants 'reset' in dependencies

  return <div>{seconds}</div>;
}
```

**Problem:** This creates an infinite loop! Here's why:

1. `TimerDisplay` renders
2. `useTimer` creates a new `reset` function
3. `useEffect` sees `reset` changed, runs the effect
4. If `seconds >= 10`, calls `reset()`
5. `setSeconds(0)` triggers a re-render
6. Go back to step 1 - `reset` is a new function again!

**Solution:** Stabilize `reset` in the hook:

```jsx
function useTimer() {
  const [seconds, setSeconds] = useState(0);

  // ✅ Stable reference - only created once
  const reset = useCallback(() => {
    setSeconds(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { seconds, reset };
}
```

### Step 2: Hooks That Depend on Other Hooks (The Chain Reaction)

Let's build something more complex - a form with validation and submission:

```jsx
// Hook 1: Manages timeout behavior
function useFormTimeout() {
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef(null);

  // ❌ UNSTABLE - recreated every render
  const clearTimeouts = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // ❌ UNSTABLE - depends on unstable clearTimeouts
  const clearWarningState = () => {
    clearTimeouts();
    setShowWarning(false);
  };

  const startTimeout = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setShowWarning(true);
    }, 5000);
  }, []);

  return { showWarning, startTimeout, clearWarningState };
}

// Hook 2: Manages form state
function useFormState({ clearWarningState, onSuccess }) {
  const [formState, setFormState] = useState("idle");

  // ❌ UNSTABLE - clearWarningState and onSuccess might be unstable
  const submitForm = (data) => {
    clearWarningState();
    setFormState("submitting");

    api
      .submit(data)
      .then(() => {
        setFormState("success");
        onSuccess();
      })
      .catch(() => {
        setFormState("error");
      });
  };

  return { formState, submitForm };
}

// Main component
function FormComponent({ onComplete }) {
  const { showWarning, startTimeout, clearWarningState } = useFormTimeout();

  // ❌ UNSTABLE - inline arrow function
  const handleSuccess = () => {
    console.log("Form submitted!");
    onComplete();
  };

  const { formState, submitForm } = useFormState({
    clearWarningState,
    onSuccess: handleSuccess,
  });

  // 🐛 BUG: This will fire constantly!
  useEffect(() => {
    if (formState === "submitting") {
      startTimeout();
    }
  }, [formState, startTimeout, clearWarningState, submitForm]);

  return <div>Form here</div>;
}
```

**The Problem:** This creates a cascade of instability:

1. `clearTimeouts` is unstable (recreated every render)
2. `clearWarningState` depends on `clearTimeouts`, so it's unstable too
3. `submitForm` depends on `clearWarningState`, so it's unstable
4. `handleSuccess` is an inline arrow function, so it's unstable
5. The `useEffect` has these as dependencies, so it fires constantly!

**The Solution:** Stabilize from the bottom up:

```jsx
// Hook 1: Stabilized timeout behavior
function useFormTimeout() {
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef(null);

  // ✅ STABLE - no dependencies
  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // ✅ STABLE - only depends on stable clearTimeouts
  const clearWarningState = useCallback(() => {
    clearTimeouts();
    setShowWarning(false);
  }, [clearTimeouts]);

  const startTimeout = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setShowWarning(true);
    }, 5000);
  }, []);

  return { showWarning, startTimeout, clearWarningState };
}

// Hook 2: Stabilized form state
function useFormState({ clearWarningState, onSuccess }) {
  const [formState, setFormState] = useState("idle");

  // ✅ STABLE - dependencies are now stable
  const submitForm = useCallback(
    (data) => {
      clearWarningState();
      setFormState("submitting");

      api
        .submit(data)
        .then(() => {
          setFormState("success");
          onSuccess();
        })
        .catch(() => {
          setFormState("error");
        });
    },
    [clearWarningState, onSuccess],
  );

  return { formState, submitForm };
}

// Main component
function FormComponent({ onComplete }) {
  const { showWarning, startTimeout, clearWarningState } = useFormTimeout();

  // ✅ STABLE - wrapped in useCallback
  const handleSuccess = useCallback(() => {
    console.log("Form submitted!");
    onComplete();
  }, [onComplete]);

  const { formState, submitForm } = useFormState({
    clearWarningState,
    onSuccess: handleSuccess,
  });

  // ✅ Now this only fires when formState actually changes
  useEffect(() => {
    if (formState === "submitting") {
      startTimeout();
    }
  }, [formState, startTimeout]);

  return <div>Form here</div>;
}
```

### Step 3: Tracking What Changed (Debugging Technique)

Sometimes it's hard to tell which dependency is causing problems. Here's a debugging pattern:

```jsx
function useFormState({ clearWarningState, onSuccess }) {
  const [formState, setFormState] = useState("idle");

  // Debug: Track what's changing
  const prevDepsRef = useRef({ clearWarningState, onSuccess });

  useEffect(() => {
    const prev = prevDepsRef.current;

    if (prev.clearWarningState !== clearWarningState) {
      console.log("clearWarningState changed!");
    }
    if (prev.onSuccess !== onSuccess) {
      console.log("onSuccess changed!");
    }

    prevDepsRef.current = { clearWarningState, onSuccess };
  }); // This runs on EVERY render - that's intentional for debugging

  const submitForm = useCallback(
    (data) => {
      clearWarningState();
      setFormState("submitting");

      api.submit(data).then(() => {
        setFormState("success");
        onSuccess();
      });
    },
    [clearWarningState, onSuccess],
  );

  return { formState, submitForm };
}
```

This will log which dependencies are actually changing, helping you identify the source of instability.

---

## Decision Rules {#decision-rules}

Here's a comprehensive decision tree for when to use `useCallback`:

### ✅ USE useCallback when:

1. **The function is used in a dependency array**

   ```jsx
   const myFunc = useCallback(() => {
     /* ... */
   }, [deps]);
   useEffect(() => {
     myFunc();
   }, [myFunc]); // myFunc is a dependency
   ```

2. **The function is passed to a memoized component**

   ```jsx
   const MyMemoComponent = React.memo(({ onAction }) => {
     /* ... */
   });
   const handleAction = useCallback(() => {
     /* ... */
   }, [deps]);
   return <MyMemoComponent onAction={handleAction} />;
   ```

3. **The function is returned from a custom hook AND might be used in dependencies**

   ```jsx
   function useMyHook() {
     const doSomething = useCallback(() => {
       /* ... */
     }, [deps]);
     return { doSomething }; // Consumers might use this in useEffect
   }
   ```

4. **The function is passed as a prop to another component that uses it in dependencies**

   ```jsx
   // Parent
   const handleEvent = useCallback(() => {
     /* ... */
   }, [deps]);
   return <Child onEvent={handleEvent} />;

   // Child
   function Child({ onEvent }) {
     useEffect(() => {
       onEvent();
     }, [onEvent]); // Child uses it in dependencies
   }
   ```

5. **The function is part of a dependency chain** (multiple hooks passing functions to each other)
   ```jsx
   // If Hook A returns a function that Hook B uses in its useCallback,
   // Hook A's function should be wrapped in useCallback
   ```

### ❌ DON'T USE useCallback when:

1. **The function is only used in JSX event handlers**

   ```jsx
   const handleClick = () => {
     /* ... */
   }; // No useCallback needed
   return <button onClick={handleClick}>Click</button>;
   ```

2. **The function is only called directly in your component body**

   ```jsx
   const calculateValue = () => {
     /* ... */
   }; // No useCallback needed
   const result = calculateValue();
   ```

3. **The function is defined inside a useEffect/useCallback** (it's already scoped)

   ```jsx
   useEffect(() => {
     const helperFunc = () => {
       /* ... */
     }; // No useCallback needed
     helperFunc();
   }, [deps]);
   ```

4. **You're prematurely optimizing** without measuring performance issues
   - Start without `useCallback`
   - Add it only when you have a specific reason (dependency array, memoization, etc.)

### 🤔 CONSIDER useCallback when:

1. **The function has expensive computation**

   ```jsx
   // If creating the function itself is expensive (rare), useCallback helps
   const expensiveFunc = useCallback(() => {
     // Lots of computation just to create this function
   }, [deps]);
   ```

2. **You're building a library/shared component** where you don't control usage
   ```jsx
   // Consumers might use your functions in various ways, so stabilize them
   ```

---

## Common Patterns {#common-patterns}

### Pattern 1: setState Functions Are Always Stable

```jsx
function MyComponent() {
  const [state, setState] = useState(0);

  // ❌ UNNECESSARY - setState is always stable
  const updateState = useCallback(() => {
    setState(1);
  }, [setState]);

  // ✅ BETTER - setState doesn't need to be in dependencies
  const updateState = useCallback(() => {
    setState(1);
  }, []);

  useEffect(() => {
    updateState();
  }, [updateState]);
}
```

**Rule:** `setState` functions from `useState` are guaranteed to be stable. Never include them in dependency arrays or as dependencies of `useCallback`.

### Pattern 2: Using Functional Updates to Avoid Dependencies

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // ❌ Must recreate when count changes
  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  // ✅ No dependency on count needed
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);
}
```

**Rule:** Use functional updates `setState(prev => newValue)` to avoid depending on state values.

### Pattern 3: useRef for Values You Don't Want as Dependencies

```jsx
function useWebSocket(url) {
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  // ✅ onMessage doesn't need to be a dependency because we use ref
  const onMessage = useCallback((data) => {
    setMessages((msgs) => [...msgs, data]);
  }, []);

  useEffect(() => {
    wsRef.current = new WebSocket(url);
    wsRef.current.onmessage = (e) => onMessage(e.data);

    return () => wsRef.current?.close();
  }, [url, onMessage]);
}
```

**Rule:** Use `useRef` to store values that change but shouldn't trigger re-renders or be dependencies.

### Pattern 4: Event Handlers with Props

```jsx
// ❌ PROBLEM: onClick recreated every time name changes
function Greeting({ name, onGreet }) {
  const handleClick = () => {
    onGreet(name);
  };

  return <button onClick={handleClick}>Greet {name}</button>;
}

// ✅ SOLUTION 1: Don't extract the handler if it's simple
function Greeting({ name, onGreet }) {
  return <button onClick={() => onGreet(name)}>Greet {name}</button>;
}

// ✅ SOLUTION 2: If handler is complex, use useCallback
function Greeting({ name, onGreet }) {
  const handleClick = useCallback(() => {
    console.log("Greeting...");
    onGreet(name);
  }, [name, onGreet]);

  return <button onClick={handleClick}>Greet {name}</button>;
}
```

**Rule:** For simple inline handlers, don't extract them. For complex handlers that use props, use `useCallback` with those props as dependencies.

### Pattern 5: Avoiding Props in Dependencies

```jsx
// ❌ UNSTABLE: handleSubmit changes when onSuccess changes
function useFormLogic({ onSuccess, onError }) {
  const handleSubmit = useCallback(
    async (data) => {
      try {
        await api.submit(data);
        onSuccess();
      } catch (err) {
        onError(err);
      }
    },
    [onSuccess, onError],
  );

  return { handleSubmit };
}

// ✅ STABLE: Store props in refs to avoid dependency issues
function useFormLogic({ onSuccess, onError }) {
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  });

  const handleSubmit = useCallback(async (data) => {
    try {
      await api.submit(data);
      onSuccessRef.current();
    } catch (err) {
      onErrorRef.current(err);
    }
  }, []);

  return { handleSubmit };
}
```

**⚠️ WARNING:** Only use the ref pattern when you WANT stale closure behavior. If you need the LATEST prop value on every call, keep it as a dependency! This pattern can hide bugs where callbacks change but your handler still uses the old version.

**Rule:** If prop functions are unstable and you can't control them, store them in refs to keep your functions stable. Use this pattern carefully - it creates intentional stale closures.

---

## Performance Considerations {#performance-considerations}

### The Cost of useCallback

`useCallback` is NOT free. It has costs:

1. **Memory cost:** Stores the function and dependencies array
2. **Comparison cost:** Compares old vs new dependencies on every render
3. **Code complexity cost:** Makes code harder to read

```jsx
// This has MORE overhead than just defining the function
const handleClick = useCallback(() => {
  setCount((c) => c + 1);
}, []);

// This is actually faster (but might cause other issues)
const handleClick = () => {
  setCount((c) => c + 1);
};
```

### When Performance Matters

Performance issues usually come from:

1. **Too many re-renders:** Components rendering unnecessarily
2. **Expensive renders:** Components that do a lot of work when rendering
3. **Large component trees:** Thousands of components updating at once

**useCallback helps with #1 only when combined with:**

- `React.memo` or `useMemo` on child components
- Dependency arrays in `useEffect` or other hooks

### Measuring Performance

Don't guess - measure!

```jsx
function MyComponent() {
  const [count, setCount] = useState(0);

  // Add profiling
  useEffect(() => {
    console.log("Component rendered");
  });

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

Use React DevTools Profiler to see:

- How often components render
- How long renders take
- What caused each render

---

## Summary: The Golden Rules

1. **Don't use `useCallback` by default** - start simple and add it when needed

2. **Always use `useCallback` for functions in dependency arrays** - this prevents infinite loops and unnecessary effects

3. **Use `useCallback` for props to memoized components** - this makes `React.memo` actually work

4. **Stabilize functions returned from hooks** - consumers might use them as dependencies

5. **Think about dependency chains** - instability cascades through hooks

6. **setState functions are always stable** - never include them as dependencies

7. **Use functional updates** - reduces need for `useCallback` by removing state from dependencies

8. **Debug with refs** - track which dependencies are changing

9. **Don't prematurely optimize** - add `useCallback` when you have a specific reason

10. **Measure, don't guess** - use profiling tools to verify performance issues

---

## Real-World Example: Modal Management

Let's tie it all together with a complete example:

```jsx
// ❌ BEFORE: Buggy code with instability
function useModalFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const { addModal, removeModal } = useModalActions();

  const cleanup = () => {
    setIsOpen(false);
  };

  const openModal = (data) => {
    cleanup();
    setIsOpen(true);

    addModal({
      type: "payment",
      onClose: () => cleanup(),
    });
  };

  return { openModal };
}

function PaymentForm({ onBack }) {
  const { openModal } = useModalFlow();

  const handleSuccess = () => {
    console.log("Payment complete");
    onBack();
  };

  const handleSubmit = (data) => {
    openModal({
      ...data,
      onSuccess: handleSuccess,
    });
  };

  useEffect(() => {
    // 🐛 BUG: This fires constantly!
    if (someCondition) {
      openModal(defaultData);
    }
  }, [openModal]);

  return <form onSubmit={handleSubmit}>...</form>;
}
```

```jsx
// ✅ AFTER: Stable code
function useModalFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const { addModal, removeModal } = useModalActions();
  const modalDataRef = useRef(null);

  // Stable - no dependencies
  const cleanup = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Stable - cleanup is stable, setState is stable
  const openModal = useCallback(
    (data) => {
      // Prevent duplicate modals for same data
      if (modalDataRef.current === data) {
        return;
      }

      cleanup();
      setIsOpen(true);
      modalDataRef.current = data;

      addModal({
        type: "payment",
        onClose: () => cleanup(),
      });
    },
    [cleanup, addModal],
  );

  // Reset ref when modal closes
  useEffect(() => {
    if (!isOpen) {
      modalDataRef.current = null;
    }
  }, [isOpen]);

  return { openModal };
}

function PaymentForm({ onBack }) {
  const { openModal } = useModalFlow();

  // Stable - onBack should be stable from parent
  const handleSuccess = useCallback(() => {
    console.log("Payment complete");
    onBack();
  }, [onBack]);

  const handleSubmit = useCallback(
    (data) => {
      openModal({
        ...data,
        onSuccess: handleSuccess,
      });
    },
    [openModal, handleSuccess],
  );

  // ✅ Now this only fires when intended
  useEffect(() => {
    if (someCondition) {
      openModal(defaultData);
    }
  }, [openModal, someCondition]);

  return <form onSubmit={handleSubmit}>...</form>;
}
```

This example demonstrates:

- Stabilizing functions in custom hooks
- Using refs to prevent duplicate operations
- Proper dependency management across multiple hooks
- The complete chain from component → hook → hook

---

## Conclusion

Function stability and `useCallback` are tools for managing React's reactive dependency system. The key is understanding:

- **When functions need stable references** (dependency arrays, memoization)
- **How instability cascades** through dependency chains
- **The tradeoffs** between simplicity and optimization

Start simple. Add `useCallback` when you have a specific reason. Master these patterns and you'll write React code that's both performant and maintainable.
