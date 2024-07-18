<table>
    <thead>
        <tr>
            <th colspan="5" style="text-align: center;"><strong>Subjects of Study</strong></th>
        </tr>
        <tr>
            <td colspan="5">The links below are to the parent GitHub repos of completed courses, resources, my own notes, links to articles, etc. about the topics shown below. They are designed to be my "go-to" place for teaching myself the given subject.</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://github.com/coolinmc6/analytics">Analytics</a></td>
            <td><a href="https://github.com/coolinmc6/CS-concepts">Computer Science</a></td>
            <td><a href="https://github.com/coolinmc6/design-ux-ui#product-design--development">Product Development</a></td>
            <td><a href="https://github.com/coolinmc6/design-ux-ui">UX / UI Design</a></td>
            <td><strong><a href="https://github.com/coolinmc6/front-end-dev">Front End Development</a></strong></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/react/">React Concepts</a></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><em>React Snippets</em></td>
        </tr>
    </tbody>
</table>


# React Snippets

## General
I've had this problem before and don't remember how I've solved it but it's frustrating. This worked
well.

```tsx
const sidebar = useRef(null)
const [sidebarHeight, setSidebarHeight] = useState(0);

useEffect(() => {
  const height = sidebar.current.clientHeight;
  setSidebarHeight(height);
}, []);

// Element
return (
  <div ref={sidebar}>
    <div style={{ height: sidebarHeight }}>
      <Sidebar />
    </div>
  </div>
)
```

## Advanced

### forwardRef

```tsx
import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type BadgeProps = {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, variant = 'primary', className, ...props }, ref) => {
    return (
      <div
        {...props}
        className={twMerge(
          'inline-block px-3 py-1 rounded-full text-sm font-semibold',
          variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-black',
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    );
  }
) as React.ForwardRefExoticComponent<React.PropsWithoutRef<BadgeProps> & React.RefAttributes<HTMLDivElement>>;
```
- This example uses `forwardRef` which is a utility that lets you pass a ref through a component to one
of its children. I don't use refs often but good to know.
- The imports make sense and are readable
  - React and `forwardRef` from React
  - `twMerge` allows you to merge Tailwind CSS classes
- `BadgeProps` are basic and make sense
- Let's look at the first part of the code:

```tsx
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(...)
```
- This is where I got tripped up looking at the code. `forwardRef` only has one argument, a render function.
That render function takes two arguments, props (in this case `BadgeProps`) and the ref. Where I was getting
confused was seeing what looked like the `ref` first and then the `BadgeProps`. But really, what you are seeing
in the code above is one argument, the render function.
- What we are **NOT** seeing is the implementation of a `<Badge />` so we aren't seeing what's being passed in
as the ref. The types `HTMLDivElement, BadgeProps` are just providing the types for the Badge and the ref. As a
quick aside, let's look at a basic use of the Badge component:

```tsx
import React, { useRef } from 'react';
import { Badge } from './Badge';

const App = () => {
  const badgeRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Badge ref={badgeRef} variant="primary" className="my-badge">Primary Badge</Badge>
    </div>
  );
};

export default App;
```
- We create the `badgeRef` and pass that to the `<Badge />`. The variant and any other props are passed
into the render function so we can use them.
- Going back to the original code, now that we understand how `forwardRef` works, the rest of the code makes
more sense (original code with comments):

```tsx
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  // Render function
  (
    // Badge props broken out so that I can use them
    { children, variant = 'primary', className, ...props },
    // the ref
    ref
  ) => {
    return (
      <div
        {...props}
        className={twMerge(
          'inline-block px-3 py-1 rounded-full text-sm font-semibold',
          variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-black',
          className
        )}
        ref={ref} // here were are using the ref
      >
        {children}
      </div>
    );
  }
) as React.ForwardRefExoticComponent<React.PropsWithoutRef<BadgeProps> & React.RefAttributes<HTMLDivElement>>;
```
- The first argument in the render function is just my `BadgeProps` and me breaking them out so I can use them.
- the second argument is the `ref` that I'm passing from my parent component (or wherever I'm using it) to the
element I want the ref on. In this case, just div of the `<Badge />`.
- Last bit of code:

```tsx
(...) as React.ForwardRefExoticComponent<React.PropsWithoutRef<BadgeProps> & React.RefAttributes<HTMLDivElement>>;
```
- `as React.ForwardRefExoticComponent<React.PropsWithoutRef<BadgeProps> & React.RefAttributes<HTMLDivElement>>`
is a TypeScript type assertion. It explicitly tells TypeScript the exact type of the `Badge` component created 
using `forwardRef`.
- `ForwardRefExoticComponent` is a type provided by React to define components created using `forwardRef`
- Inside that is just `PropsWithoutRef` which is a utility type that removes the `ref` property from the props
if it exists. This is done because the ref is handled separately by `forwardRef`.
- and then finally `RefAttributes` is a utility type which includes the `ref` property with `HTMLDivElement` being
the type of the DOM element the ref will refer to.
- Assuming we import those types, it would look like this:

```tsx
) as ForwardRefExoticComponent<PropsWithoutRef<BadgeProps> & RefAttributes<HTMLDivElement>>;
```
- I think the most confusing part for me was the TypeScript. Understanding how to type (as in TypeScript) all this
looks complicated but most of it is clearly boilerplate TS that is added onto your component. 