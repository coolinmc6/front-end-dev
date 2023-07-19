[Back](https://github.com/coolinmc6/front-end-dev#front-end-development)
<a name="top"></a>

# Storybook

## My Questions

**What is Storybook?**
- Storybook allows you to create components in isolation, separated from your app's business logic. It is
a development-only app that lives inside your app's codebase. You install it and run it locally (e.g.
`npm run storybook`) and you can see individual components. Each variation of a component can be given
a "Story". A "story" is the declarative syntax that allows you to provide props and mock data to simulate
different component variations. So for a `Button`, for example, you can show different variants like
`primary`, `secondary`, etc. but also `loading` state, `disabled`, etc.
- There are a bunch of addons that you can install and it has functionality that allows you to test different
options via the Controls.


*Source:* https://storybook.js.org/docs/react/get-started/why-storybook

**What is a Story?**
- A more official definition of a story is this: "A story captures the rendered state of a UI component".
A component can have multiple stories. It's clear that, given the number of different states that a component
can have, we don't need to show every permutation but rather the "interesting" ones.
- Stories are written in Component Story Format (CSF) (which they keep mentioning but I don't think I really
need to know much about).
- Stories are typically written in a file named `ComponentName.stories.tsx` and are located in the same
directory as the component itself. In the example below, when you open StoryBook, there will be "Button"
in the left sidebar and then Primary listed underneath. This component has one Story.

```tsx
// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <Button primary label="Button" />,
};
```

**What are addons?**


**What are Controls and how do they work? Show an example.**

**What are Actions and how do they work? Show an example.**

**What are Viewport and how do they work? Show an example.**

**How does Storybook handle component states and variations?**
## Example
- Here is a basic example of a `Button` component in Storybook.

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/ui/Button/Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI Library/Button',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => (
    <Button variant="contained">Primary Button</Button>
  )
};

export const Secondary: Story = {
  render: () => (
    <Button variant="contained" color="secondary">Secondary Button</Button>
  )
};
```

- The first chunk of text after the import statements is the `Meta` object. This is where you can define the title of the story, the component, and any tags you want to add to the story. 
  - The `tags` property is used to filter stories in the Storybook UI.
    - `autodocs` is a tag that is used to filter stories that have automatically generated documentation.
  - The `component` property is used to define the component that the story is for.
  - The `title` property is used to define the title of the story.
    - in this case, the category is `UI Library` and the story is `Button`.
    - I could also create a sub-category by doing something like: `UI Library/Components/Button`
- The next two lines (`export default meta;` and `type Story = StoryObj<typeof Button>;`) are required by Storybook
- That is the basic setup code to get it working. After that, I simply need to show some of the variants of
the code. In this particular case, I have two "stories": *Primary* and *Secondary*.

  

[[↑] Back to top](#top)
