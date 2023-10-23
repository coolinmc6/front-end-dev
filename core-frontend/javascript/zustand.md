[Home](https://github.com/coolinmc6/front-end-dev)
[Back to JavaScript Home](https://github.com/coolinmc6/front-end-dev/tree/master/javascript)

<a id="top"></a>

# Zustand

## Create a Store
- here's a basic store for an example Toast feature:

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

[[↑] Back to top](#top)