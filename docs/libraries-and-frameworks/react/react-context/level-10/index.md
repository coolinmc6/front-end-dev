# Level 10: Ultimate + Enforced Pattern

:::tip Heads Up

This code is really high-level and reaching the point where you'd just use Zustand or some other
state management library. You would probably not ever need to do this yourself and even if you could, 
you'd still want to use Zustand just because it is open source, has a team supporting it,
and most importantly, not just you!

Consider yourself warned.
:::

**Level 10 is just Level 9 + some eslint rules to prevent other context patterns.** The code below
has not been implemented or tested - it is just an example of what you could do. I'm leaving this
here for reference and NOT as a recommendation as something one should do.

```js
// rules/no-raw-createContext.js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Use createUltimateContext instead of raw createContext',
    },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === 'react') {
          node.specifiers.forEach((specifier) => {
            if (specifier.imported?.name === 'createContext') {
              context.report({
                node: specifier,
                message: 'Use createUltimateContext instead of createContext',
              });
            }
          });
        }
      },
    };
  },
};
```