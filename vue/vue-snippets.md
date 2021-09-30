[Home](https://github.com/coolinmc6/front-end-dev)

# Vue Snippets

## Vue Features

### Adding the Composition API to Vue 2.x
- The composition API isn't available in Vue 2 but you can add it. Here is the [repo](https://github.com/vuejs/composition-api/blob/main/README.md)
but after doing `yarn add @vue/composition-api`, you simply do this: 

```js
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```
### Composition API Basics
- Here is a basic counter example:

```vue
<script>
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  setup() {
    const count = ref(0);

    const increment = () => (count.value += 1);
    return {
      count,
      increment,
    };
  },
});
</script>
<template>
  <div>
    <div>Total: {{ count }}</div>
    <button @click="increment()">+</button>
  </div>
</template>
```
- Notice that I'm importing `ref` from `'@vue/composition-api'` and NOT just `'vue'` because this is a Vue 2.x
example.
  - `defineComponent` is also a Vue 3.x thing that's available in Vue 2.x with the composition api. See the
  docs [here](https://v3.vuejs.org/api/global-api.html#definecomponent).
  - I'm not used to using the `defineComponent` function but something to be aware.
- After the `setup()` line, I define my first "data-like" property, `count`. This value would normally go in the
`data` function/object of a component but here, I'm using a Vue ref and initializing with the value `0`.
- The `increment` function is tricky because I can't just increment `count`, I'm incrementing `count.value`.
- Finally, I return those two variables so that I can use them in my template.
- It works for more complicated variable types like arrays as well; here is the code for a grocery list array
and a function to add stuff to it:
```js
export default defineComponent({
  setup() {
    const groceries = ref(["apples", "bananas"]);
    const addStuff = () => {
      return groceries.value.push("more stuff");
    };
    return {
      groceries,
      addStuff,
    };
  },
});
```


## Vuex

### MapState and Getting a Module

1. Import `mapState`

```js
import { mapState } from 'vuex';
```

2. Add `mapState` to the `computed` property

```js
export default {
  name: 'MyComponent',
  data: {},
  props: {},
  computed: {
    ...mapState('config', {
      lastGamePlayed: state =>
        state?.data?.featureConfig?.last_game_played?.enabled,
    }),
  }
}
```

3. Use in the html or js

```html
<div v-if="lastGamePlayed" />
```

```js
if(this.lastGamePlayed) {
  // do something
}
```