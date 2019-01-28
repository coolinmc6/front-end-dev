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

[FEIH: JavaScript](https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/javascript-questions.md#what-is-a-closure-and-howwhy-would-you-use-one)

> Closures are functions that have access to the outer (enclosing) function's variables—scope chain even after the outer function has returned.

- Those definitions alone are hard to visualize. Here is a super simple example with code:

```js
var c = 13;
function outer() {
    var b = 10;
    var d = 9;
    function inner() {
        var a = 6;
        console.log(a+b+c);
    }
    return inner;
}

var X = outer();
X();
```

- in the above example, it's easy to see that the only thing that really "happens" is that the inner function (conveniently called `inner()`) simply logs the sum of three variables: `a`, `b`, and `c`.
- The function `outer()` returns the function `inner()` so when I  `var X = outer()`, I'm not executing the function. 
- I execute it on the next line `X()`. When I do that, I get 29 in the console, showing essentially what the definition of a closure says that it does: it has access to the following scope chains:
	+ the `inner` function's own scope: `a`
	+ the `outer` function's variables that **it have been enclosed in inner**: `b`
		* *Note*: I won't have access to the variable `d` because it has NOT been enclosed in the `inner()` function
	+ the global scope's variable: `c`
- Wrapping that all up, when I execute `X()`, I am running the `inner` function which, because of closures, has access to all those variables and I can show `29` in the console.
- So that's a good example of closures that I can recreate whenever I want. If someone asks to demonstrate a simple example of closures, do the above example.
- Here is the above example extended to show a simple example of how the values of the outer function can "carry" into the inner function:

```js
var c = 13;
function outer() {
    var b = 10;
    function inner() {
        var a = 6;
        console.log('Total: ', a+b+c);
        console.log('a = ', a, ' b = ', b);
        a++;
        b++;
    }
    return inner;
}

var X = outer();
X();
X();
X();
X();
/*
* Console Output
*
* Total:  29
* a =  6  b =  10
* Total:  30
* a =  6  b =  11
* Total:  31
* a =  6  b =  12
* Total:  32
* a =  6  b =  13
* 
*/
```

- notice how incrementing `a` does nothing because I am setting it within the `inner` function to 6
- `c` never changes
- and `b` is being incrememnted so that with each call ( `X()` ), the value of `b` is carried over and so it goes from `6 + 10 + 13` to `6 + 11 + 13` to `6 + 12 + 13`, etc.


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




























