[Home](https://github.com/coolinmc6/front-end-dev) | [Vue Notes](https://github.com/coolinmc6/front-end-dev/blob/master/vue.md)

# Testing in Vue Notes

## Components

- Create the new file in your `__tests__` folder: `component-name.spec.js`
- Wrap the whole test suite in a describe with your component name:
```js
describe('component-name.vue', () => {
  // tests go here
})
```
- Import your test library
```js
import { shallowMount } from '@vue/test-utils';
```