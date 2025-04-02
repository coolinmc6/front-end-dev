---
title: Snippets
description: Some of my favorite React Snippets
---

# React Snippets

This page will be a general discussion of snippets that I find interesting or useful.
I think a good way to think of this page is a running list of items that I have liked over the years.
It won't be culled or curated much - use [React Recipes](./react-recipes.md) for items that will be
updated and managed.

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

### Render Props useEffect: Headless UI

I was trying to solve an issue where I needed to know whether a Popover was open or not. If
it was open, I'd refetch my query.

This is Solution #1:

```jsx
import { Popover } from '@headlessui/react';
import { useQuery } from '@apollo/client';
import { USER_PROFILE_QUERY } from './queries';
import { useEffect } from 'react';

function UserProfileMenu() {
  const { data, refetch } = useQuery(USER_PROFILE_QUERY, {
    skip: true, // Don't auto-run on mount
  });

  return (
    <Popover>
      {({ open }) => {
        useEffect(() => {
          if (open) {
            refetch();
          }
        }, [open]);

        return (
          <>
            <Popover.Button>
              {/* Avatar, initials, etc. */}
              <span>Profile</span>
            </Popover.Button>

            <Popover.Panel className="z-50 mt-2 rounded-lg shadow-lg bg-white">
              {/* You can safely use `data` here */}
              <div className="p-4">
                {data ? (
                  <p>Hello, {data.user.name}!</p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </Popover.Panel>
          </>
        );
      }}
    </Popover>
  );
}
```

This issue with this is that using a `useEffect` inside the render props pattern is not
always the most stable. My second solution was to use state at the top-level and then
set a variable `popoverIsOpen` inside the render props. Again, not a super stable pattern
because you are setting state inside the render. 

This is what I ended up with:

```jsx
import { Popover } from '@headlessui/react';
import { useQuery } from '@apollo/client';
import { USER_PROFILE_QUERY } from './queries';
import { useEffect } from 'react';

function UserProfileMenu() {
  const { data, refetch } = useQuery(USER_PROFILE_QUERY, {
    skip: true, // Don't auto-run on mount
  });

  return (
    <Popover>
      {({ open }) => {
        return (
          <>
            <RefetchProfile refetch={refetch}>
            <Popover.Button>
              <span>Profile</span>
            </Popover.Button>

            <Popover.Panel className="z-50 mt-2 rounded-lg shadow-lg bg-white">
              <div className="p-4">
                {data ? (
                  <p>Hello, {data.user.name}!</p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </Popover.Panel>
          </>
        );
      }}
    </Popover>
  );
}

const RefetchProfile = ({ refetch }) => {
  useEffect(() => {
    refetch()
  }, [refetch])

  return null
}
```

We then had to refactor it even more and instead of rendering that little component that would
just refetch, we added `unmount` to the Popover.Panel which when it is not displayed, is no
longer in the DOM. Then contents of the popover were in a separate component and we passed
refetch in as a prop. 

### Passing Props to Dynamic Child
I was working on a feature where there were 6 different types of the same thing. Each of the different types
have a title and must query the backend. I decided to create a parent component where I show the title, 
make the query, and then pass the results of that query to the children of that component. So the 
problem I'm trying to solve is **passing props to an unknown child**. The child is "unknown" in that the 
children component could be one of 6 different components. I'm going to discuss some of the solutions and 
then show what I ultimately landed on.

First, this is how I use my parent component:

```tsx
const App = () => {
  return (
    <div>
      <ParentComponent type="type-1" title="Type 1" >
        <Type1>
      </ParentComponent>
      <ParentComponent type="type-2" title="Type 2">
        <Type2>
      </ParentComponent>
      <ParentComponent type="type-3" title="Type 3">
        <Type3>
      </ParentComponent>

    </div>
    
  )
}
```
Each `ParentComponent` takes a `title` and `type`. The title will be just a `h1` element while the type will
be a variable passed to the query.

**How do I build the `ParentComponent` to pass the data down to any child component?**

Here is **Version 1: React.cloneElement**

```tsx
// ParentComponent.tsx
export const ParentComponent = ({
  children,
  title,
  type,
}: ParentComponentProps) => {
  const { data, loading, error } = useAwesomeFeature({ type })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error || !children) {
    return <ErrorComponent error={error} />
  }

  return (
    <section>
      <h1 className="text-style-xl-bold">{title}</h1>
      {React.cloneElement(children, { data })}
    </section>
  )
```

The key part is near the bottom: `{React.cloneElement(children, { data })}`. This pattern clones the element
and allows you to add props. It actually does appear to be a commonly used pattern but I found that it is more
of a legacy React API and not something they recommend. There are some pitfalls as listed
[here](https://react.dev/reference/react/cloneElement) and I was getting pushback from other devs.

Here is **Version 2: Render Props**

I first need to update how we use the `ParentComponent` at the top level:

```tsx
const App = () => {
  return (
    <div>
      <ParentComponent type="type-1" title="Type 1" render={(data) => <Type1 data={data}>} >
        <Type1>
      </ParentComponent>
     {/* etc */}
    </div>
    
  )
}
```

And then tweak how we are returning the children:

```tsx
export const ParentComponent = ({
  render,
  title,
  type,
}: ParentComponentProps) => {
  const { data, loading, error } = useAwesomeFeature({ type });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !children) {
    return <ErrorComponent error={error} />;
  }

  return (
    <section>
      <h1>{title}</h1>
      {render(data)}
    </section>
  );
};
```
But I really dislike how the render-props looks. 

I ended up just going for React Context which I really like.

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