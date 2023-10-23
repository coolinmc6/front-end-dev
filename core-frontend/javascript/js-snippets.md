

# JavaScript Snippets

## Arrays

#### Using `.some` instead of `.filter`
- I had an array that contained flags for a user. If it contained a special flag type, I would do
one thing - if not, do something else. Instead of filtering out all objects with that type and then
seeing if the resulting array has a length, just use `.some`.
- The example below isn't a massive code saver but it uses the `.some` method properly
```js
const actions = [ /* List of objects with a type property */ ];

// Original
if (actions.filter(o => o.type === 'error').length) {
  // do something
}

// Improved Version
if (actions.some(o => o.type === 'error')) {
  // do something
}
```