---
title: Vue Home
sidebar_position: 1
---

# Vue Home

**Vue Instance and Displaying a Variable**

```vue
<template>
    <h1>{{ product }}</h1>
</template>

<script>
var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
    link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks'
  } 
})
</script>
```

- For binding an html attribute, we can use `v-bind`. So it would like this: `v-bind:src="image"`.
  - to do it quicker, you can just do `:src=...`. You can see this all over the codebase
  - the `image` is the variable. You can think of the `""` as the double curly braces `{{}}` we'd normally need

**Conditional Rendering**

- Conditional rendering allows you to decide when you want to show an element.

```html
<!-- Example #1: Super Basic -->
<div v-if="inStock">In stock!</div>
<div v-else>Sold Out</div>

<!-- Example #2: Else-If -->
<div v-if="inventory > 10">In stock!</div>
<div v-else-if="inventory <= 10 && inventory > 0">Only a few left!</div>
<div v-else>Sold Out</div>

<!-- Example #3: V-Show -->
<div v-show="inStock">In stock!</div>
```
- they're all pretty self-explanatory. The `v-show` is more performant for when you are flipping an element on and off. It adds
`display: none` to the style if it's false.

**Displaying a List:**

- In the code below, `sizes` is an array on my `data` property. The `v-for` allows me to iterate through the array. And just like
an array, I can get the index of the array. *Q: Does that mean `v-for` is map?*

```html
<!--  -->
<div v-for="(size, i) in sizes" :key="i">
  <span>
    <strong>{{ size }}</strong> (id#{{ i }})
  </span>
</div>
```

**Event Handling**

- Vue events are just like JS events except you do `v-on:` before the event. So a click event is
`v-on:click`. This can be shortened to just `@click` which appears to be the most common way.
- Inside the quotes you put the code. Now I could do `cart += 1` but as functions get more complex,
you probably just want to put the function call in there. In this case, it is `addToCart`. Notice
that it isn't:
  - `addToCart()`
  - `() => addToCart()`
  - or something else; it's just `addToCart`
- The `addToCart` method lives in my Vue instance. The code is under the `methods` property of the large
object we're passing in at the line `var app = new Vue()`.
- **Note:** it looks like you can have custom event handlers like `@markAppIsLoaded`. Here is some more
info on custom events: https://vuejs.org/v2/guide/components-custom-events.html. We use them

```vue
<template>
  <!-- Long Form -->
  <button v-on:click="addToCart">Add to cart</button>

  <!-- Short Form -->
  <button @click="addToCart">Add to cart</button>
</template>

<script>
var app = new Vue({
  el: '#app',
  data: {
    cart: 0,
    // other data things (like React state)
  },
  methods: {
    // ES6 way of doing it
    addToCart() {
      this.cart += 1
    },
    // ES5 way
    addToCart: function() {
      this.cart += 1
    }
  }
})
</script>
```

**Class and Styles**

- Changing styles or classes seems a little different but nothing crazy. Here are two examples:

```html
<!-- VueMastery Solution -->
<p v-else :class="{out: !inStock, bold: !inStock}">Out of Stock</p>
<!-- CM Solution -->
<p v-else :class="inStock ? '' : 'out'">Out of Stock</p>
```

- The first solution has you v-bind the class attribute (I used the `:` syntax instead of `v-bind:class`)
and in the parens there is an object. Here is the breakdown:
  - the `out` property is the class name. So in the css, you'll `.out {}` with the styling as well a `bold` CSS rule
  - the `out` property is based on the `inStock` variable. If `inStock` is false, it is displayed
- My solution was a ternary where I gave it an empty string class or `'out'`. Probably better the first one but my
solution worked as well. 

**Computed Properties**

- Computed properties are properties that are calculated / computed by Vue and then displayed as opposed to ones
that are stored by Vue. In the example below, we are using properties from our data object.
- They are stored in a `computed` property in the Vue object. This is what it looks like:

```js
var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    brand: 'Vue Mastery',
    cart: 0
  },
  methods: {
    addToCart: function () {
      this.cart += 1
    },
    updateProduct: function (index) {
      this.selectedVariant = index
      console.log(index)
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    displaySale() {
      return `${this.brand} ${this.product} are ON SALE`
      // return "HEY";
    }
  }
})
```

**Components**

- Here is how you create a new component:

```js
Vue.component('product', {
  props: { // what you're passing to your component
    isLoggedIn: { // looks like built-in props typing
      type: Boolean,
      required: true
    }
  },
  template: ` 
    <div>
      <h1>{{ product }}</h1>
    <div>
  `, // Like React, must be one element
  data() {
    return {
      product: 'Amazing Socks',
      cart: 0,
      // other properties
    }
  },
  methods: {
    addToCart: () {
      this.cart += 1
    }
  },
  computed: {
    title() {
      return 'Nike ' + this.product
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true
  }
})
```

```html
<div id="app">
  <product :premium="premium"></product>
</div> 
```

- So that's how you create and use a Vue component.

**Communicating Events**

- Like in React, if you want to change parent-level state, you need to pass the handler
down to the component. This is what it would look like:

```html
<div id="app">
  <product 
    :premium="premium"
    @add-to-cart="updateCart"><!-- handler prop and the function -->
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    premium: true
  },
  methods: {
    addToCart: function(id) {
      this.cart.push(id)
    }
  }
})

Vue.component('product', {
  template: `
    <button v-on:click="addToCart" 
      :disabled="!inStock"
      :class="{ disabledButton: !inStock }"
      >
    Add to cart
    </button>`,
})
```

- **Notice** how the `@add-to-cart` is transformed to camelCase `addToCart` in the `v-on:click`.

**Forms**

- Good example here [https://codepen.io/coolinmc6/pen/rNMzKdR?editors=1010](https://codepen.io/coolinmc6/pen/rNMzKdR?editors=1010)
- Vue uses two-way data-binding which is pretty sweet:

```html
<p>
  <label for="name">Name:</label>
  <input id="name" v-model="name">
</p>
```
```js
Vue.component('product-review', {
  template: ``, // see above for html
  data() {
    return {
      name: null
    }
  }
})
```
- And that's it! Now, every time the user updates the input with the `v-model` attribute of "name", the
"name" property will be updated. Super simple.
- **Note:** this is NOT like React. React is one way - so I'd normally have to create an onChange handler
to update my "name" property...I don't have to do that here.
- Another important item to note is the preventDefault on a form submit. Take a look:

```html
<form class="review-form" @submit.prevent="onSubmit">
  <!-- CODE -->
</form>
```
- the `@submit.prevent="onSubmit"` => the `@submit` is the event handler, the `.prevent` is shorthand for preventing
the default behavior on form submission, and the `"onSubmit"` is our customer handler which is not shown here.
- In the example in the link above, the `onSubmit` emits an event and passes the *productReview* object up to the
parent. The example is worth reviewing again - a lot of good stuff in there.

**Event Bus**

- I want to revisit this topic as I don't entirely understand it but here's a working [CodePen](https://codepen.io/coolinmc6/pen/RwGZJzV).
It looks like a common pattern to simplify or bring together event handlers. I'll quickly show an example but I'll need to revisit:

```js
// initialize eventBus
var eventBus = new Vue()

// in the <product> component
Vue.components('product', {
  props: {},
  template: ``,
  data() {
    return {}
  },
  methods: {},
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  }
})

// in the event handler for the review
eventBus.$emit('review-submitted', productReview)
```
- The example has the `product-review` component inside the `product` component. The lifecycle method `mounted` uses
the eventBus. So there are three places you need it:
  - initialize the eventBus
  - mount it to the parent of the component
  - use it / emit the event in your handler
