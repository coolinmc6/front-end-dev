[Back](https://github.com/coolinmc6/front-end-dev#front-end-development)
<a name="top"></a>
# JavaScript Questions & Definitions

### Table of Contents

- [OOP in JavaScript](#oop-in-javascript)
- [Hard Questions](#hard) 
- [Intermediate Questions](#intermediate)
- [Easy Questions](#easy)
- [Glossary](#glossary)

## OOP in JavaScript

- I've struggled to really dig deep into object-oriented JavaScript. It's not really that difficult but there's just a lot going on. I'm going to try to do two things:
    + define the terms or concepts with both explanations and code
    + break down "object-oriented JavaScript" into concrete, specific examples or questions that I can quickly use to explain it

**What is object-oriented programming (OOP)?**

- A widely accepted definition of OOP that is used to classify a language as "object-oriented" is based on two requirements:
    * its capability to model a problem through objects
    * its support of a few principles that grant modularity (break code into smaller pieces) and code reuse
- Those two requirements can each be broken down into three principles.
- Here is the first requirement broken down:
    * Association: an objects capability to refer to another independent object
        - `var bill = {name: 'Bill'}`
        - `var steve = {name: 'Steve'}`
        - `steve.parent = bill;`
        - Here, we have two objects and there is an association created between these two completely independent objects
    * Aggregation: the aboject's capability to embed one or more *independent* objects
        - `var company = {name: 'ABC Corporation', employees: []}`
        - `company.employees.push(bill);`
        - A different object, `company`, has a property `employees` which holds an array. I can add the `bill` object to that array
    * Composition: the object's capability to embed one or more *dependent* objects
        - `bill.address = {street: '123 Main Street', city: 'Philadelphia', state: 'PA'}`
        - The `address` property is just an object with multiple properties for Bill's address. It is a dependent object because it doesn't exist outside of `bill`
- Here is the second component broken down:
    * Encapsulation: This is the capability to concentrate into a single entity data and code that manipulates it, hiding its internal details
        - there is nothing *natively* in JavaScript that hides internal details. All properties are public automatically. But there are techniques that can be used to mimic the principle of encapsulation.
    * Inheritance: This is the mechanism by which an object acquires some or all features from one or more other objects
        - JavaScript has prototypal inheritance which is a complicated subject. It isn't exactly *inheritance* the way other "classical languages" use it but there is an inheritance mechanism that allows an object to have access to the methods of its prototype object.
    * Polymorphism: This is the capability to process objects differently based on their data type or structure
        - This is a definition I found:

> Generally, the ability to appear in many forms. In object-oriented programming, polymorphism refers to a programming language's ability to process objects differently depending on their data type or class. More specifically, it is the ability to redefine methods for derived classes.

**Lay the foundation for OOP in JavaScript. Why is it so different than other languages?**

- This is a super-quick overview of object-oriented programming in JavaScript.
- JavaScript is different than "classical languages" in how it does inheritance. This is so important because that is essentially how object-oriented programming works: a class of objects with certain behaviors/properties that can be passed down to instances of that object OR serve as a parent class of another class of objects.
- JavaScript uses prototypal inheritance which means instead of a property being "passed down" or copied into the "child" object or class, what's really happening is *behavior delegation*. 
- Behavior delegation is essentially when a programmer asks for a method/property on an object, if that property isn't there, it looks to its *prototype* or *parent* object for that property. This is called the prototype chain.
- Instead of "copying down" the methods/properties, the child object "delegate up" the prototype chain in search of that method or property. So it could theoretically go from *child object* to *parent object*; if the method isn't there, it could go from *parent object* to *grandparent object* looking for the method/property. Eventually, it goes up the chain until you find the method. That chain ends with the parent for **all** objects in JavaScript, the Object, wherein if the method/property isn't there, it is `undefined`.
- So with that foundation, I've learned that object-oriented JavaScript is really an implementation of OOP principles using different techniques to mimic certain features that the language doesn't natively support.
- In addition to the major feature I mentioned above, **inheritance**, there are patterns and best practices of how to implement certain other features of OOP like private properties, getter/setter functions, etc.

**Explain the difference between prototypal and classical inheritance.**

- "Classical" inheritance is really talking about the methods of object orientation.
- A "class" that acts as a blueprint or architectual diagram for an object and then you need to create an instance of that class in JavaScript, inheritance works using prototypes - in prototypal inheritance, new objects are created using previously created objects.
    + there is a parent "Object" for all objects in JavaScript
- There is a method of JavaScript of emulating the more classical object-oriented form using classes and that's called the Pseudo-Classical Pattern but, again, it's only faking it...all inheritance in JavaScript is prototypal

**Show a basic example of object-oriented JavaScript: properties, methods, instantiation.**

```js
function Person(first_name, last_name) {
    this.first_name = first_name;   // basic property
    this.last_name = last_name; 

    this.hello = function(name) {   // method
        console.log('Hello, ', name);
    }
};

var dude = new Person('Steve', 'Smith');    // instantiating new object
console.log(dude);    // Person {first_name: "Steve", last_name: "Smith", hello: ƒ}
dude.hello("Matt");   // calling the method
```

  - that's a basic example of creating a "class" for the object, `Person`, with basic properties and a method.

**Using the example above, add a method or property to your** `Person` **object.**

```js
Person.prototype.full_name = function() {
    console.log(this.first_name + ' ' + this.last_name);
}

Person.prototype.monopoly = {
    money: 1500,
    cards: []
}

dude.full_name();           // Steve Smith
console.log(dude.monopoly); // {money: 1500, cards: Array(0)}
```
  - notice how both are logged out. Despite not being instantiated with either the `full_name()` method or the `monopoly` property, the `dude` object has access to them.

**Demonstrate the concepts of Encapsulation in object-oriented JavaScript**


**Demonstrate the concept of Inheritance in object-oriented JavaScript.**


**Demonstrate the concept of Polymorphism in object-oriented JavaScript.**


**Explain ES6 Classes and how they relate to ES5 object-oriented JavaScript.**


**Explain ALL the major concepts of object-oriented JavaScript, front-to-back.**




**Links**

- [Eloquent JavaScript](http://eloquentjavascript.net/)
- [Eloquent JavaScript: Object Oriented Programming](https://eloquentjavascript.net/1st_edition/chapter8.html)
- [JavaScript is Sexy: OOP In JavaScript](http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/)
- [Medium: Is JavaScript a (true) OOP language?](https://medium.com/@andrea.chiarelli/is-javascript-a-true-oop-language-c87c5b48bdf0)

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

### Explain how prototypal inheritance works

- Prototypal inheritance and JavaScript Objects generally don't feel incredibly difficult but explaining *prototypes* in a succinct way is a bit tricky. I've read a lot of definitions that feel the need to address the fact that JavaScript classes don't *really* inherit methods the way other programming languages with classes do. The following "definition" is really just a list of important points relating to prototypes and then some code that explains it.
- All JavaScript objects have a prototype property that is a reference to another object.
- When you ask for a property or method on an object, if it's not there, JavaScript will traverse (go up) the prototype chain and try to find that property or method on the linked object. If it isn't there, it traverses again up the prototype chain looking for that property/method.
- This will keep happening until it finds the property/method OR it runs out of objects to traverse.
- This link explains more of the computer science answer as to why "prototypal inheritance" doesn't quite apply to JavaScript if you use the word "inheritance" as it's intended from classical languages: [Quora: What is Prototypal Inheritance](https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson)
- Here is another good link from Kyle Simpson's **You Don't Know JS**: [Chapter 5: Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch5.md#chapter-5-prototypes)
- Other links:
    + [MDN: Object Prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
    + [coolinmc6/advanced_javascript](https://github.com/coolinmc6/advanced_javascript#lecture-16-what-is-the-prototype-chain)
    + 

### What is JSONP?




## Easy

### Explain "hoisting".

- A simple definition of *hoisting* is the declaration of functions and variables "moved" to the top of the current scope.
- Your code isn't magically being moved to the top - what's actualy happening is that your declarations are added to memory during the compile phase.
- Here are some examples to show how it applies to variables and functions and some take-aways to remember:

```js
console.log(a); // undefined
var a = 5;
console.log(a); // 5

console.log(b); // ReferenceError: b is not defined
```

- There are a few things to notice here:
    + first, I am logging the value of `a` right away and I get `undefined`. This right here is **hoisting** in action. It gets `undefined` because I declared `a` in the second line (`var a = 5`)
    + Skipping to the bottom, notice how `b`, which is never declared, does NOT get the same `undefined`, it gets a ReferenceError. There was no `b` declaration to hoist therefore JavaScript has no idea what the hell `b` is
    + On line 2 I define `a` and then print out its value on line 3. Nothing controversial there; that's normal behavior.
    + The key thing to notice is the difference between what happens on line 1 (`undefined` is logged) because `a` has been declared SOMEWHERE in the code and what happens on line 5 (`ReferenceError`) because `b` was never declared.
- That's the first example: simple `var` declarations. A take-away here is that **only declarations are hoisted**, not *initializations*. 
- Sticking with variables, the next example shows how hoisting only applies to variables declared with `var`:

```js
console.log(a); // ReferenceError: a is not defined
let a = 5;
console.log(a); // [NEVER EXECUTED]: because of the error, this is never run
```

```js
console.log(a); // ReferenceError: a is not defined
const a = 5;
console.log(a); // [NEVER EXECUTED]: because of the error, this is never run
```

- In these two examples, we are using the `let` and `const` keywords as opposed to `var`. 
- The key take-away here is that they cannot be hoisted! 
    + `var`: Yes, it is hoisted
    + `let`: NO, it is **not** hoisted
    + `const`: NO, it is **not** hoisted
- Moving onto functions:

```js
sayHello('Colin');  // Hello, Colin
function sayHello(name) {
    console.log('Hello, ', name);
}
sayHello('Colin');  // Hello, Colin
```

- Notice that it works both times! I call `sayHello()` on line 1 despite declaring in line 2 and it still works!
- The Line 5 call of `sayHello()` also works as expected
- As a quick sidenote, the way I've declared `sayHello` above is called a *function declaration*. It uses the function keyword and then name of the argument. In the above example, `sayHello` was hoisted. The same does not apply to *function expressions* like below:

```js
sayHello('Colin');  // TypeError: sayHello is not a function
var sayHello = function(name) {
    console.log('Hello, ', name);
}
sayHello('Colin');
```

- Notice how I get a `TypeError` - it has no idea what `sayHello` is.
- Here is a quick table about hoisting:

|Type|Code|Hoisted?|
|:---:|:---:|:---:|
|Variable|`var` declaration|**Yes**|
|Variable|`let` declaration|No|
|Variable|`const` declaration|No|
|Function|Function declaration<br>`function sayHello(){}`|**Yes**|
|Function|Function expression<br>`var sayHello = function(){}`|No|


**References**

- [Medium: What is Hoisting?](https://codeburst.io/javascript-what-is-hoisting-dfa84512dd28)
- [FEIH: Explain Hosting](https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/javascript-questions.md#explain-hoisting)
- [coolinmc6/advanced_javascript](https://github.com/coolinmc6/advanced_javascript#lecture-9-what-is-variable-hoisting)

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


function declaration


function expression


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




























