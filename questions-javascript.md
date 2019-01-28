[Back](https://github.com/coolinmc6/front-end-dev#front-end-development)
<a name="top"></a>
# JavaScript Questions & Definitions

### Table of Contents

- [Hard Questions](#hard) 
- [Intermediate Questions](#intermediate)
- [Easy Questions](#easy)
- [Glossary](#glossary)

## Hard

### What is a closure, and how/why would you use one?

- Here are a number of different definitions for closures from a number of different sources:

[coolinmc6/advanced_javascript](https://github.com/coolinmc6/advanced_javascript#lecture-12-what-are-function-closures)

> A closure is an inner function that has access to the outer (enclosing) function's variables—scope chain. 
The closure has three scope chains: it has access to its own scope (variables defined between its 
curly brackets), it has access to the outer function's variables, and it has access to the global variables.

[FreeCodeCamp (Medium)](https://medium.freecodecamp.org/javascript-closures-simplified-d0d23fa06ba4)

> A closure is a feature in JavaScript where an inner function has access to the outer (enclosing) function’s variables — a scope chain. The closure has three scope chains: (1) it has access to its own scope — variables defined between its curly brackets, (2) it has access to the outer function’s variables, (3) it has access to the global variables

[MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

> A closure is the combination of a function and the lexical environment within which that function was declared. 

[JavaScript is Sexy: Understand JavaScript Closures With Ease](http://javascriptissexy.com/understand-javascript-closures-with-ease/)

> A closure is an inner function that has access to the outer (enclosing) function’s variables—scope chain. The closure has three scope chains: it has access to its own scope (variables defined between its curly brackets), it has access to the outer function’s variables, and it has access to the global variables.
> The inner function has access not only to the outer function’s variables, but also to the outer function’s parameters. Note that the inner function cannot call the outer function’s arguments object, however, even though it can call the outer function’s parameters directly.



## Intermediate





## Easy

### What is "use strict" and what does it do?

- `"use strict"` is used to enable strict mode to an entire script (e.g. place at top of page) or individual functions. Strict mode is a way to opt into a restricted variant of JavaScript.
- Here are some of the main features / benefits:
	+ it makes debugging easier
	+ prevents you from accidentally creating global variables
	+ prevents you from naming variables that will be keywords in future JS verisons
	+ doesn't let you delete arguments to functions, functions, or variables

```js
// "use strict";

// not Strict mode
function newCode() {
    "use strict";

    // Strict Mode
}

// this would not be allowed as it was never defined anywhere with "var asim ="
asim = 1;

var theVal = 0;

thVal = 1;

if(theVal > 0) {
    console.log('hello')
}

// with eval and no "use strict", a can "leak out"
eval("var a = 1");
console.log(a);
```

**Advantages:**

* Makes it impossible to accidentally create global variables.
* Makes assignments which would otherwise silently fail to throw an exception.
* Makes attempts to delete undeletable properties throw (where before the attempt would simply have no effect).
* Requires that function parameter names be unique.
* `this` is undefined in the global context.
* It catches some common coding bloopers, throwing exceptions.
* It disables features that are confusing or poorly thought out.

**Disadvantages:**

* Many missing features that some developers might be used to.
* No more access to `function.caller` and `function.arguments`.
* Concatenation of scripts written in different strict modes might cause issues.

[back to top](#top)


## Glossary

AJAX


apply


asynchronous


bind


call


classical inheritance


closure


CORS


currying


destructuring


DOMContentLoaded


event bubbling


event loop


feature detection


feature inference


fetch


higher-order function


hoisting


host objects


HTML attribute


HTML property


IIFE


JavaScript templating


JSON


JSONP


lexical environment


load


module pattern


native objects


polyfill


Promise


rest syntax


same-origin policy


scope


spread syntax


ternary expression


this


UA String


use strict


XMLHttpRequest




























