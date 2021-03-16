[Home](https://github.com/coolinmc6/front-end-dev)

# Vue Snippets


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