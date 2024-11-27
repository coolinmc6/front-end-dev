# Zustand

## Create a Store
here's a basic store for an example Toast feature:

```ts
type ToastProps = {
  id: string
  type: string
  props: object
}

export type ToastState = {
  toasts: Array<ToastProps>
  addToast: (toast: ToastProps) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: uid() }],
    }))
  },
  removeToast: (id: string): void => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },
}))
```


### Using the Toast Store

My code was initially this:

```tsx
const { toasts } = useToastStore();
```

but I then changed it to this:

```tsx
const toasts = useToastStore((state: ToastState) => state.toasts);
```

I don't have time to explain, here are some AI-generated notes:

### AI Explanation
The difference between these two approaches lies in how they subscribe to and extract 
state from a Zustand store in a React component, affecting performance and re-render behavior.

```ts
const toasts = useToastStore((state: ToastState) => state.toasts);
```

This approach uses a selector function `(state: ToastState) => state.toasts` to subscribe only
to the toasts slice of the store's state. The selector function allows the component to re-render
only when the specific part of the state it subscribes to (toasts in this case) changes. This is
more performant for components that only need to access a specific piece of the store, as it
prevents unnecessary re-renders when other parts of the store's state change.

```ts
const { toasts } = useToastStore();
```

This approach destructures the toasts property directly from the store's entire state object
returned by `useToastStore()`. It subscribes the component to the entire store state, meaning the
component will re-render whenever any piece of the store's state changes, not just the toasts.
While this is simpler and more straightforward, it can lead to unnecessary re-renders if the store
contains multiple state slices and other slices change frequently.

### Key Differences

**Performance and Re-rendering:** The selector approach `(useToastStore((state) => state.toasts))`
is more performant for components that don't need the entire store state because it limits
re-renders to changes in the subscribed slice of state. The destructuring approach 
`(const { toasts } = useToastStore())` can lead to unnecessary re-renders if other parts
of the state change.

**Subscription Scope:** The selector approach explicitly defines the scope of the subscription to a
specific part of the state, which can be beneficial for clarity and optimizing component updates.
The destructuring approach subscribes to the entire state, which is simpler but less optimized.

**Code Clarity and Maintenance:** Using a selector can make it clearer that the component is only
interested in a specific part of the state, potentially making the code easier to understand and
maintain, especially in larger projects with complex state management.

**Conclusion**

Selecting which approach to use depends on your specific use case:

For components that only need to access a specific part of the store and you want to optimize for
performance, use a selector function.

For components where you might need multiple pieces of the store or you prefer simplicity and the
additional re-renders are not a concern, directly destructuring from the store might be more convenient.