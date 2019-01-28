[Back](https://github.com/coolinmc6/front-end-dev#front-end-development)
<a name="top"></a>
# JavaScript Questions & Definitions

### Table of Contents

- [Hard Questions](#hard) 
- [Intermediate Questions](#intermediate)
- [Easy Questions](#easy)
- [Glossary](#glossary)

## Hard

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
bind
call
classical inheritance
closure
CORS
DOMContentLoaded
event bubbling
feature detection
feature inference
fetch
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
same-origin policy
this
UA String
XMLHttpRequest


























