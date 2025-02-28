---
title: Token System
description: |
  Explanation of a CSS Token System along with trade-offs, basic implementation details, and
  why a CSS token system is useful.
---

# Token System Implementation

## What is a Token System?

A **token system** in the context of design and development is a structured set of values
used to ensure consistency and scalability across an application’s interface. These tokens
can be things like colors, typography styles, spacing, and other design elements that are
defined once and reused throughout a codebase.

> **Note:** While the token file **may** live in the repo, for companies with multiple
clients (iOS, Android, Web, etc.), fetching that file and incorporating it into each
platform is often part of the overall process. This ensures a single source of truth
across all products.

### Example JSON Token File

To better understand what is meant by **values**, here is an example token file in JSON
that an app (web, IOS, AND, etc.) may receive from the backend:

```json
{
  "colors": {
    "primary": "#FF5733",
    "secondary": "#2EC4B6",
    "background": "#FFFFFF",
    "text": "#333333"
  },
  "typography": {
    "fonts": {
      "base": "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      "heading": "Georgia, serif"
    },
    "sizes": {
      "sm": "14px",
      "base": "16px",
      "lg": "20px",
      "xl": "24px"
    },
    "weights": {
      "normal": 400,
      "semibold": 600,
      "bold": 700
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  }
}
```

### Styled Components Example

How exactly your app would use these values varies. The Tailwind implementation is shown below but
if your app used styled components, it may look something like this:

```jsx
// Styled Components Example
import styled from 'styled-components';
import designTokens from './design-tokens.json';

const Container = styled.div`
  background-color: ${designTokens.colors.background};
  color: ${designTokens.colors.text};
  font-family: ${designTokens.typography.fonts.base};
  font-size: ${designTokens.typography.sizes.base};
  padding: ${designTokens.spacing.md};
`;

export default function App() {
  return (
    <Container>
      <h1>Hello with Styled Tokens</h1>
      <p>
        This container is styled using tokens from our JSON file.
      </p>
    </Container>
  );
}
```

### Material UI Example 
For a Material UI project, it may look like this:

```jsx
import { createTheme } from '@mui/material/styles';
import designTokens from './design-tokens.json';

const theme = createTheme({
  palette: {
    primary: {
      main: designTokens.colors.primary
    },
    secondary: {
      main: designTokens.colors.secondary
    },
    text: {
      primary: designTokens.colors.text
    },
    background: {
      default: designTokens.colors.background
    }
  },
  typography: {
    fontFamily: designTokens.typography.fonts.base,
    h1: {
      fontFamily: designTokens.typography.fonts.heading,
      fontSize: designTokens.typography.sizes.xl,
      fontWeight: designTokens.typography.weights.bold
    },
    h2: {
      fontFamily: designTokens.typography.fonts.heading,
      fontSize: designTokens.typography.sizes.lg,
      fontWeight: designTokens.typography.weights.semibold
    },
    body1: {
      fontSize: designTokens.typography.sizes.base
    },
    body2: {
      fontSize: designTokens.typography.sizes.sm
    }
  },
  // MUI uses a function or a fixed scale for spacing. 
  // You can replace the logic below with a custom approach 
  // if you want to multiply by a base unit from your tokens.
  spacing: (factor) => {
    const baseSpacing = parseInt(designTokens.spacing.md, 10) || 16; // fallback if md isn't found
    return `${baseSpacing * factor}px`;
  }
});

export default theme;
```


### Key Characteristics

- **Atomic**: Each token represents a single piece of a design (e.g., a single color value,
a single spacing value).  
- **Reusable**: Tokens are defined in one place and used wherever needed, ensuring
design consistency.  
- **Adaptable**: Modifying a token (e.g., updating a color or changing spacing) propagates
changes across the entire interface.  
- **Brand-Aligned**: Tokens typically match the brand guidelines, ensuring that the various
client applications aligns closely with brand identity.

---

## Understand the Trade-offs

### Advantages

1. **Consistency**: Since tokens are defined in a single source of truth, the UI remains
visually consistent.  
2. **Scalability**: A token system allows larger or multiple teams to work on the same
project without introducing inconsistencies.  
3. **Maintainability**: When you need to update a design aspect (e.g., color or font size),
changing the token in one place updates it everywhere.  
4. **Collaboration**: Designers and developers share a common language (the tokens),
streamlining communication.

### Disadvantages

1. **Initial Overhead**: Setting up a token system takes time and requires alignment among
stakeholders.  
2. **Learning Curve**: Team members must learn how to use the tokens properly, especially
if they are unfamiliar with the concept.  
3. **Over-Optimization**: If taken too far, a token system can become overly complex and
rigid, making it harder to handle unique design needs.  
4. **Versioning Challenges**: Maintaining multiple versions of tokens for different projects
or design updates can become complicated.

---

## Comparison to Non-token System

| Aspect             | Token System                                   | Non-token System                                 |
|--------------------|-----------------------------------------------|--------------------------------------------------|
| **Consistency**    | High (Single source of truth)                 | Variable (Developers might use random values)    |
| **Scalability**    | Scalable (Tokens can be extended or updated)  | Less scalable (Updates may require widespread manual changes) |
| **Maintainability**| Easy (Change once, propagate everywhere)      | Harder (Changes must be made in many places)     |
| **Flexibility**    | High (Tokens can be overridden or extended)   | Dependent on how CSS classes and variables are structured |
| **Collaboration**  | Encouraged (Common design language)           | Inconsistent (Each developer might style differently) |

A non-token system might work fine for very small projects or prototypes where speed is the only priority and design consistency is less critical. However, as a project grows, the benefits of a token system become more apparent.

---

## Implementation Using Tailwind and Headless UI

### Tailwind CSS

Tailwind CSS is utility-first, making it straightforward to create design tokens by customizing the **Tailwind config**. The tokens can include:

- **Colors**: Brand colors, text colors, background colors.  
- **Spacing**: Margin, padding, gap values.  
- **Typography**: Font families, font sizes, line heights.  
- **Breakpoints**: Responsive design breakpoints.

By updating the `tailwind.config.js` (or a similar configuration file), you can define a cohesive set of tokens.

```js
// tailwind.config.js
const designTokens = require('./design-tokens.json');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
    // ... other paths
  ],
  theme: {
    colors: {
      ...designTokens.colors
      // or you can map them individually if you want custom keys
      // primary: designTokens.colors.primary,
      // secondary: designTokens.colors.secondary,
      // ...
    },
    extend: {
      fontFamily: {
        base: designTokens.typography.fonts.base,
        heading: designTokens.typography.fonts.heading
      },
      fontSize: {
        sm: designTokens.typography.sizes.sm,
        base: designTokens.typography.sizes.base,
        lg: designTokens.typography.sizes.lg,
        xl: designTokens.typography.sizes.xl
      },
      spacing: {
        ...designTokens.spacing
      }
    }
  },
  plugins: []
};
```

### Headless UI

**Headless UI** provides unstyled accessible components. Because they are unstyled, tokens are
extremely useful for consistently applying:

- **Colors** to states and components.  
- **Spacing** around interactive elements.  
- **Typography** for headings, labels, or buttons.

Using tokens in combination with Headless UI ensures that the look and feel of the components
remain consistent throughout the application.

**We can apply our token system by simply using the Tailwind classes we've updated in our Tailwind**
**config. No additional setup required.**

---

## Step-by-Step Guide

Here is a basic step-by-step guide to implement your own token system.

1. **Identify Your Tokens**  
   - Compile a list of design elements that need consistency (color palette, spacing scale, typography).
2. **Define Tokens in Tailwind**  
   - Update or create your Tailwind configuration file.  
   - Add tokens for colors, spacing, typography, etc.
3. **Integrate Tokens with Headless UI**  
   - Use Tailwind utilities referencing your tokens in the class names.  
   - Leverage Headless UI’s unstyled components and apply the utility classes.  
4. **Test and Iterate**  
   - Verify consistency across components and pages.  
   - Adjust tokens as needed for improvements or design changes.
