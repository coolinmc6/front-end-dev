# JavaScript Questions & Definitions

- [DOM Questions](http://thatjsdude.com/interview/index.html)
    + take a look and take notes; good stuff in here


### Table of Contents

#### By Difficulty

- [OOP in JavaScript](#oop-in-javascript)
- [Hard Questions](#hard) 
- [Intermediate Questions](#intermediate)
- [Easy Questions](#easy)
- [Glossary](#glossary)

#### By Concept

<details>
<summary>Asynchronous JavaScript</summary>

* [What is a Promise? How does a Promise work?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-is-a-promise-how-does-a-promise-work)
* [How do you use Async/Await?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#how-do-you-use-asyncawait)
* [Explain the difference between synchronous and asynchronous functions.](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#explain-the-difference-between-synchronous-and-asynchronous-functions)
* [What is asynchronous programming, and why is it important in JavaScript?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-is-asynchronous-programming-and-why-is-it-important-in-javascript)
</details>
<details>
<summary>Basic JavaScript</summary>

* [What language constructions do you use for iterating over object properties and array items?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-language-constructions-do-you-use-for-iterating-over-object-properties-and-array-items)
* [What's the difference between a variable that is: null, undefined or undeclared? How would you go about checking for any of these states?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#whats-the-difference-between-a-variable-that-is-null-undefined-or-undeclared-how-would-you-go-about-checking-for-any-of-these-states)
* [What is "use strict" and what does it do?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-is-use-strict-and-what-does-it-do)
</details>
<details>
<summary>ES6</summary>

* [ES6 Template Literals offer a lot of flexibility in generating strings, can you give an example?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#es6-template-literals-offer-a-lot-of-flexibility-in-generating-strings-can-you-give-an-example)
* [What are the benefits of using spread syntax and how is it different from rest syntax?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-are-the-benefits-of-using-spread-syntax-and-how-is-it-different-from-rest-syntax)
* [What are the differences between variables created using let, var or const?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-are-the-differences-between-variables-created-using-let-var-or-const)
* [What are the differences between ES6 class and ES5 function constructors?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-are-the-differences-between-es6-class-and-es5-function-constructors)
* [What advantage is there for using the arrow syntax for a method in a constructor?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-advantage-is-there-for-using-the-arrow-syntax-for-a-method-in-a-constructor)
* [Can you give an example for destructuring an object or an array?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#can-you-give-an-example-for-destructuring-an-object-or-an-array)
* [How do you export an object in JavaScript?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#how-do-you-export-an-object-in-javascript)
</details>
<details>
<summary>How JavaScript Works</summary>

* [In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#in-what-order-will-the-numbers-1-4-be-logged-to-the-console-when-the-code-below-is-executed-why)
* [Describe event bubbling.](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#describe-event-bubbling)
* [What is the event loop? What is the difference between call stack and task queue?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-is-the-event-loop-what-is-the-difference-between-call-stack-and-task-queue)
</details>
<details>
<summary>JavaScript Objects and `this`</summary>

* [The Rules of `this`](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#the-rules-of-this)
* [This - Testing your this knowledge in JavaScript: What is the output of the following code?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#this---testing-your-this-knowledge-in-javascript-what-is-the-output-of-the-following-code)
* [Object Clone - How do you clone an object?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#object-clone---how-do-you-clone-an-object)
* [Object Equality - How would you compare two objects in JavaScript?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#object-equality---how-would-you-compare-two-objects-in-javascript)
</details>
<details>
<summary>Miscellaneous</summary>

* [Can you name two programming paradigms important for JavaScript app developers?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#can-you-name-two-programming-paradigms-important-for-javascript-app-developers)
* [Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#write-a-simple-function-less-than-160-characters-that-returns-a-boolean-indicating-whether-or-not-a-string-is-a-palindrome)
* [Write a sum method which will work properly when invoked using either syntax below.](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#write-a-sum-method-which-will-work-properly-when-invoked-using-either-syntax-below)
* [What is JSONP? How does it work and how is it different than AJAX?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-is-jsonp-how-does-it-work-and-how-is-it-different-than-ajax)
* [How do you debug JavaScript? What tools and techniques do you use debugging JavaScript code?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#how-do-you-debug-javascript-what-tools-and-techniques-do-you-use-debugging-javascript-code)
* [Explain the difference between mutable and immutable objects.](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#explain-the-difference-between-mutable-and-immutable-objects)
</details>
<details>
<summary>Object-Oriented JavaScript</summary>

* [What is object-oriented programming (OOP)?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-is-object-oriented-programming-oop)
* [Lay the foundation for OOP in JavaScript. Why is it so different than other languages?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#lay-the-foundation-for-oop-in-javascript-why-is-it-so-different-than-other-languages)
* [Explain the difference between prototypal and classical inheritance.](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#explain-the-difference-between-prototypal-and-classical-inheritance)
* [Show a basic example of object-oriented JavaScript: properties, methods, instantiation.](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#show-a-basic-example-of-object-oriented-javascript-properties-methods-instantiation)
* [Using the example above, add a method or property to your `Person` object.](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#using-the-example-above-add-a-method-or-property-to-your-person-object)
* [Explain how prototypal inheritance works](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#explain-how-prototypal-inheritance-works)
</details>
<details>
<summary>Scope</summary>

* [What is a closure, and how/why would you use one?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-is-a-closure-and-howwhy-would-you-use-one)
* [Closures - What will be the output of the following code](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#closures---what-will-be-the-output-of-the-following-code)
* [Hoisting - What will be the output of this code?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#hoisting---what-will-be-the-output-of-this-code)
* [Explain "hoisting".](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#explain-hoisting)
</details>
<details>
<summary>Tricky JavaScript Topics</summary>

* [What is a closure, and how/why would you use one?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#what-is-a-closure-and-howwhy-would-you-use-one)
* [Closures - What will be the output of the following code](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#closures---what-will-be-the-output-of-the-following-code)
* [Can you give an example of a curry function and why this syntax offers an advantage?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#can-you-give-an-example-of-a-curry-function-and-why-this-syntax-offers-an-advantage)
* [Hoisting - What will be the output of this code?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#hoisting---what-will-be-the-output-of-this-code)
* [Explain "hoisting".](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#explain-hoisting)
* [What's a typical use case for anonymous functions?](https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md#whats-a-typical-use-case-for-anonymous-functions)
</details>


<details>
<summary>Template</summary>

* [Example](#)
* [Example](#)
* [Example](#)
</details>





## OOP in JavaScript

OOP Example - https://github.com/coolinmc6/front-end-dev/blob/master/assets/oop-cool.png - fix asset path

### What is object-oriented programming (OOP)?

- A widely accepted definition of OOP that is used to classify a language as "object-oriented" is based on two requirements:
    * its capability to model a problem through objects
    * its support of a few principles that grant modularity (break code into smaller pieces) and code reuse
- Those two requirements can each be broken down into three principles.
- Here is the first requirement broken down:
    * **Association**: an objects capability to refer to another independent object
        - `var bill = {name: 'Bill'}`
        - `var steve = {name: 'Steve'}`
        - `steve.parent = bill;`
        - Here, we have two objects and there is an association created between these two completely independent objects
    * **Aggregation**: the object's capability to embed one or more *independent* objects
        - `var company = {name: 'ABC Corporation', employees: []}`
        - `company.employees.push(bill);`
        - A different object, `company`, has a property `employees` which holds an array. I can add the `bill` object to that array
    * **Composition**: the object's capability to embed one or more *dependent* objects
        - `bill.address = {street: '123 Main Street', city: 'Philadelphia', state: 'PA'}`
        - The `address` property is just an object with multiple properties for Bill's address. It is a dependent object because it doesn't exist outside of `bill`
- Here is the second component broken down:
    * **Encapsulation**: This is the capability to concentrate into a single entity data and code that manipulates it, hiding its internal details
        - there is nothing *natively* in JavaScript that hides internal details. All properties are public automatically. But there are techniques that can be used to mimic the principle of encapsulation.
    * **Inheritance**: This is the mechanism by which an object acquires some or all features from one or more other objects
        - JavaScript has prototypal inheritance which is a complicated subject. It isn't exactly *inheritance* the way other "classical languages" use it but there is an inheritance mechanism that allows an object to have access to the methods of its prototype object.
    * **Polymorphism**: This is the capability to process objects differently based on their data type or structure
        - This is a definition I found:

> Generally, the ability to appear in many forms. In object-oriented programming, polymorphism refers to a programming language's ability to process objects differently depending on their data type or class. More specifically, it is the ability to redefine methods for derived classes.

[[↑] Back to top](#top)

### Lay the foundation for OOP in JavaScript. Why is it so different than other languages?

- This is a super-quick overview of object-oriented programming in JavaScript.
- JavaScript is different than "classical languages" in how it does inheritance. This is so important because that is essentially how object-oriented programming works: a class of objects with certain behaviors/properties that can be passed down to instances of that object OR serve as a parent class of another class of objects.
- JavaScript uses prototypal inheritance which means instead of a property being "passed down" or copied into the "child" object or class, what's really happening is *behavior delegation*. 
- Behavior delegation is essentially when a programmer asks for a method/property on an object, if that property isn't there, it looks to its *prototype* or *parent* object for that property. This is called the prototype chain.
- Instead of "copying down" the methods/properties, the child object "delegate up" the prototype chain in search of that method or property. So it could theoretically go from *child object* to *parent object*; if the method isn't there, it could go from *parent object* to *grandparent object* looking for the method/property. Eventually, it goes up the chain until you find the method. That chain ends with the parent for **all** objects in JavaScript, the Object, wherein if the method/property isn't there, it is `undefined`.
- So with that foundation, I've learned that object-oriented JavaScript is really an implementation of OOP principles using different techniques to mimic certain features that the language doesn't natively support.
- In addition to the major feature I mentioned above, **inheritance**, there are patterns and best practices of how to implement certain other features of OOP like private properties, getter/setter functions, etc.

[[↑] Back to top](#top)

### Explain the difference between prototypal and classical inheritance.

- All inheritance in JavaScript is prototypal. The *Pseudo-Classical Pattern* is a method of JavaScript that tries to emulate the more classical object-oriented form using classes but because of how JavaScript truly operates, everything has a prototype.
- There is a parent "Object" for all objects in JavaScript
- In prototypal inheritance, new objects are created using previously created objects.

> **Class Inheritance**: instances inherit from classes (like a blueprint — a description of the class), and create sub-class relationships: hierarchical class taxonomies. Instances are typically instantiated via constructor functions with the `new` keyword. Class inheritance may or may not use the `class` keyword from ES6.

- Here is a simple example of *Pseudo-Classical Inheritance* or as they call it, *Classical Inheritance*:

```js
function Person(first_name, last_name) {
    this.first_name = first_name;
    this.last_name = last_name;
};

var dude = new Person("asim", "hussain");
console.log(dude);
```

> **Prototypal Inheritance**: instances inherit directly from other objects. Instances are typically instantiated via factory functions or `Object.create()`. Instances may be composed from many different objects, allowing for easy selective inheritance.

- Here is an example of Prototypal Inheritance Pattern:

```js
"use strict"

var Person = {
    init: function(first_name, last_name) {
        this.first_name = first_name;
        this.last_name = last_name;
        return this;
    },
    full_name: function() {
        return this.first_name + ' ' + this.last_name;
    }
}

var asim = Object.create(Person);
asim.init("asim", "hussain");
console.log(asim.full_name());
```

- [Quora: What is Prototypal Inheritance?](https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson)
- [Medium: 10 JavaScript Interview Questions](https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95)

### Show a basic example of object-oriented JavaScript: properties, methods, instantiation.

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

[[↑] Back to top](#top)

### Using the example above, add a method or property to your** `Person` **object.

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

[[↑] Back to top](#top)

### Demonstrate the concepts of Encapsulation in object-oriented JavaScript

- Here are some definitions of encapsulation:

> Encapsulation is about hiding information and implementation. Objects should expose only those properties and methods which are required by the outside world to interact with them. Everything else should be hidden.

> Encapsulation includes the idea that the data of an object should not be directly exposed.  Instead, callers that want to achieve a given result are coaxed into proper usage by invoking methods (rather than accessing the data directly).

- Here is an example that I believe demonstrates encapsulation in ES5:

```js
function Person(name) {
    this.name = name;

    let species = "human";

    this.setSpecies = function(input) {
        species = input;
    }

    this.getSpecies = function() {
        console.log(species);
        return species;
    }
}

var person = new Person("Dave");
console.log(person);            // Person {name: "Dave", setSpecies: ƒ, getSpecies: ƒ}
console.log(person.species);    // undefined
person.getSpecies();            // human
person.setSpecies('alien');
person.getSpecies();            // alien
```

- In the above example, I am creating a new `Person` object called `person` and it has a property of "Dave"
- The `species` variable cannot be accessed outside of `Person` so it is "private"
- Using the `setSpecies()` and `getSpecies()` methods on the `Person` object, I can set and get the value of the `species` variable
- `person.getSpecies();` returns "human"
- `person.setSpecies();` changes the species to "alien"
- `person.getSpecies();` returns "alien"
- The above example work essentially because of closures. The inner functions `setSpecies` and `getSpecies`
- It appears that creating encapsulation using Classes from ES6 is a little more difficult but there are a number of options like:
    + WeakMaps
    + Symbols
    + Getters


[[↑] Back to top](#top)

### Demonstrate the concept of Inheritance in object-oriented JavaScript.


[[↑] Back to top](#top)

### Demonstrate the concept of Polymorphism in object-oriented JavaScript.


[[↑] Back to top](#top)

### Explain ES6 Classes and how they relate to ES5 object-oriented JavaScript.

[[↑] Back to top](#top)

### Explain ALL the major concepts of object-oriented JavaScript, front-to-back.


[[↑] Back to top](#top)

### Explain how prototypal inheritance works

- JavaScript classes don't *really* inherit methods the way other programming languages with classes do. The following "definition" is really just a list of important points relating to prototypes and then some code that explains it.
- All JavaScript objects have a prototype property that is a reference to another object.
- When you ask for a property or method on an object, if it's not there, JavaScript will traverse (go up) the prototype chain and try to find that property or method on the linked object. If it isn't there, it traverses again up the prototype chain looking for that property/method.
- This will keep happening until it finds the property/method OR it runs out of objects to traverse.
- This link explains more of the computer science answer as to why "prototypal inheritance" doesn't quite apply to JavaScript if you use the word "inheritance" as it's intended from classical languages: [Quora: What is Prototypal Inheritance](https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson)
- Here is another good link from Kyle Simpson's **You Don't Know JS**: [Chapter 5: Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch5.md#chapter-5-prototypes)
- Other links:
    


[[↑] Back to top](#top)

**Links**

- *General OOP*
    - [Eloquent JavaScript](http://eloquentjavascript.net/)
    - [Eloquent JavaScript: Object Oriented Programming](https://eloquentjavascript.net/1st_edition/chapter8.html)
    - [FreeCodeCamp: Intro to Object Oriented Programming in JavaScript](https://medium.freecodecamp.org/an-introduction-to-object-oriented-programming-in-javascript-8900124e316a)
    - [JavaScript.info](https://javascript.info/object-oriented-programming)
    - [JavaScript is Sexy: OOP In JavaScript](http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/)
    - [Medium: Is JavaScript a (true) OOP language?](https://medium.com/@andrea.chiarelli/is-javascript-a-true-oop-language-c87c5b48bdf0)
- *Encapsulation*
    + Five different methods to hide data: [http://2ality.com/2016/01/private-data-classes.html](http://2ality.com/2016/01/private-data-classes.html)
    + [https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/](https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/)
    + [https://developers.redhat.com/blog/2016/11/08/data-hiding-in-es6/](https://developers.redhat.com/blog/2016/11/08/data-hiding-in-es6/)
    + [http://tatiyants.com/groking-javascript-encapsulation/](http://tatiyants.com/groking-javascript-encapsulation/)
+ *Prototypes & Inheritance*
    + [coolinmc6/advanced_javascript](https://github.com/coolinmc6/advanced_javascript#lecture-16-what-is-the-prototype-chain)
    + [Master JavaScript Prototypes & Inheritance](https://codeburst.io/master-javascript-prototypes-inheritance-d0a9a5a75c4e)
    + [MDN: Object Prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
    

[[↑] Back to top](#top)

## Hard

Difficult Questions - https://github.com/coolinmc6/front-end-dev/blob/master/assets/physics-equations-mugs.jpg - fix asset path

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

[[↑] Back to top](#top)

### Real world example of a closure in action

```js
function apiConnect(apiKey) {
  function get(route) {
    return fetch(`${route}?key=${apiKey}`);
  }
  function post(route, params) {
    return fetch(route, {
      method: 'POST',
      body: JSON.stringify(params),
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })
  }
  return { get, post }
}
const api = apiConnect('my-secret-key');
// No need to include the apiKey anymore
api.get('http://www.example.com/get-endpoint');
api.post('http://www.example.com/post-endpoint', { name: 'Joe' });
```

- **Source:** [12 Concepts That Will Level Up Your JavaScript Skills](https://hackernoon.com/12-javascript-concepts-that-will-level-up-your-development-skills-b37d16ad7104)

### Closures - What will be the output of the following code:

```js
for (var i = 0; i < 5; i++) {
    setTimeout(function() { console.log(i); }, i * 1000 );
}
```
**Explain your answer. How could the use of closures help here?**

- The number 5 is printed 5 times
- I've seen this type of closure question before. Here is how you can solve it:

```js
for (var i = 0; i < 5; i++) {
    (function(i) {
        setTimeout(function() { console.log(i); }, i * 1000 );     
    })(i)
   
}
```

- First, why does it NOT work? As I've seen from other questions, the `setTimeout()` functions will not get executed until after the `for` loop is done. This means that when it is done, each execution will reference the last value of `i`, which will be 5.
- So how do we fix this? We can fix this with closures to create a unique scope for each iteration and storing the value of the `i` variable we want within its scope.
- By wrapping the `setTimeout` in an IIFE and passing `i` to the IIFE as opposed to directly to to the `setTimeout`, I can enclose each value of `i` in the closure so that particular value is logged and attached to the function.
- We can also solve this using ES6 syntax and using `let` as opposed to `var`. As a reminder, `let` and `const` have block-level scope while `var` has function level scope. 

- [https://www.toptal.com/javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)

[[↑] Back to top](#top)




### Can you give an example of a curry function and why this syntax offers an advantage?

> Currying is when you break down a function that takes multiple arguments into a series of functions that take part of the arguments.

- Here is a super simple example:

```js
function curriedFn(a) {
    return function(b) {
        return a * b;
    }
}

var multiplyBy3 = curriedFn(3);
var twelve = multiplyBy3(4);
console.log(twelve);            // 12
```

- When do you use currying? 
- Show a more advanced example of currying.
- Be able to explain currying.

- References:
  - [https://medium.com/@kbrainwave/currying-in-javascript-ce6da2d324fe](https://medium.com/@kbrainwave/currying-in-javascript-ce6da2d324fe)
  - [https://stackoverflow.com/questions/36314/what-is-currying](https://stackoverflow.com/questions/36314/what-is-currying)
  - [https://bjouhier.wordpress.com/2011/04/04/currying-the-callback-or-the-essence-of-futures/](https://bjouhier.wordpress.com/2011/04/04/currying-the-callback-or-the-essence-of-futures/)


[[↑] Back to top](#top)


### How would you implement currying for any function?

- Currying is partial invocation of a function. Currying means that the first few arguments of a function are pre-processed and a function is returned. The returning function can add more arguments to the curried function.

```js
function addBase(base){
  return function(num){
    return base + num;
  }
}

var addTen = addBase(10);
addTen(5); //15
addTen(80); //90
addTen(-5); //5
```

- You are essentially creating a closure. So the new function "remembers" the `base` variable you entered for `addBase()`. So now, every time you call `addBase` you have that `10` still locked in there.

[[↑] Back to top](#top)


### What is RegExp? Explain and demonstrate its basic usage.



[[↑] Back to top](#top)

## Intermediate

Intermediate Questions - https://github.com/coolinmc6/front-end-dev/blob/master/assets/struggle.jpg - fix asset path




### Can you name two programming paradigms important for JavaScript app developers?

> JavaScript is a multi-paradigm language, supporting imperative/procedural programming along with OOP (Object-Oriented Programming) and functional programming. JavaScript supports OOP with prototypal inheritance.



[[↑] Back to top](#top)


### What is functional programming?

> Functional programming produces programs by composing mathematical functions and avoids shared state & mutable data.

- Functional programming has pure functions:
    + no side-effects
    + same input returns the same output every time


### What are the ways of creating objects in JavaScript?



- Source: [https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions#question-28-what-are-the-ways-of-creating-objects-in-javascript-](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions#question-28-what-are-the-ways-of-creating-objects-in-javascript-)

[[↑] Back to top](#top)

### Write a function called deepClone which takes an object and creates a object copy of it.


- Source: [https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions#question-29-write-a-function-called-deepclone-which-takes-an-object-and-creates-a-object-copy-of-it](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions#question-29-write-a-function-called-deepclone-which-takes-an-object-and-creates-a-object-copy-of-it)

[[↑] Back to top](#top)




### Discuss possible ways to write a function `isInteger(x)` that determines if `x` is an integer.

```js
// ES6 solution pretty much already does this:
Number.isInteger()

// ES5 Solutions:

// bitwise XOR operator:
function isInteger(x) {
    return (x ^ 0) === x;
}

// This rounds down (or up; Math.ceil() works as well)
function isInteger(x) {
    return Math.floor(x) === x;
}

// Must check that it is a number
function isInteger(x) {
    return (typeof x === 'number') && (x % 1 === 0);
}

//============================================
// INCORRECT SOLUTIONS 
// This fails BECAUSE "false" would be classified as an integer:
function isInteger(x) {
    return (x % 1 === 0);
}

// This fails when x becomes really large due to how parseInt() converts scientific notation
function isInteger(x) { 
    return parseInt(x, 10) === x; 
}

```


- [https://www.toptal.com/javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)

[[↑] Back to top](#top)


### In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?

```js
(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();
```

- The answer is: 1, 4, 3, 2
- 1 and 4 are displayed first because they're simple `console.log()` calls
- 3 is logged next because it has only a 0 millisecond delay
- 2 is logged last because of 1 second delay
- Understanding the above is connected to the call stack and event table and event queue.
- `setTimeout()` puts its execution of its referenced function into the event queue if the browser is busy. This example below illustrates exactly this:

```js
for(let i = 0; i < 3000; i++) {
    if(i % 2 === 0) {
        setTimeout(function() {
            console.log(i)
        }, 0)
    } else {
        console.log(i)
    }
}
```

- even though there is a `setTimeout()` with 0 seconds delayed, **NONE** of the even numbers are logged to the console until **EVERY** odd number is. I went as high as 3000 to show that this is not just a matter of there being too few logs between 1 and 4 as shown above. In my example, every single odd number is logged *before* any of the even numbers

- [https://www.toptal.com/javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)
- [http://javascript.info/settimeout-setinterval](http://javascript.info/settimeout-setinterval) - more info on setTimeout() and things like that

[[↑] Back to top](#top)


### Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

```js
// My solution (case sensitive)
const p = (s) => s === s.split('').reverse().join('');
```

```js
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase();
  return (str == str.split('').reverse().join(''));
}
```

- [https://www.toptal.com/javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)

[[↑] Back to top](#top)

### Write a `sum` method which will work properly when invoked using either syntax below.

```js
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5
```

- Completing this question required an understanding of the `arguments` parameter in functions. I've learned this before but have not just it very frequently. Here is one way to solve the problem:

```js
// Method #1
function sum(x) {
    if(arguments.length == 2) {
        return arguments[0] + arguments[1]
    } else {
        return function(y) {
            return x + y
        }
    }
}
```

- simply use the `arguments` parameter to count how many arguments you actually received. If you received two, just return the sum of those numbers; if you received 1, return a function that takes one argument and returns the sum of those two numbers
- The next method requires two arguments at the outset and checks if `y` is undefined. 

```js
function sum(x, y) {
  if (y !== undefined) {
    return x + y;
  } else {
    return function(y) { 
        return x + y; 
    }
  }
}
```

- [https://www.toptal.com/javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)

[[↑] Back to top](#top)


### Consider the following code snippet (and determine what gets logged to the console):

```js
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```


- [https://www.toptal.com/javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)

[[↑] Back to top](#top)


### Array-Reverse: What will the code below output to the console and why?

```js
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
```

- Here is the answer:

```js
// "array 1: length=5 last=j,o,n,e,s"
// "array 2: length=5 last=j,o,n,e,s"
```

- So *why* are they saying essentially the same thing? And where exactly is "j,o,n,e,s" coming from?
- We're going to go line-by-line to understand how this works.
- **Line 1**: `var arr1 = "john".split('');` - this just creates an array with the letters of the "john". If you logged that array, this is what you'd get: `["j", "o", "h", "n"]`
- **Line 2**: `var arr2 = arr1.reverse()`. JavaScript passes objects and arrays (which are Objects) by reference, not value. So here, we are essentially setting `arr2` to equal `arr1`. This means, that what happens to one, happens to the other. Also, in this line, we are using `reverse()` on `arr1`. The `reverse()` method alters the array so now both the `arr1` and `arr2` variables point to the same array and `["j", "o", "h", "n"]` is now `["n", "h", "o", "j"]`
- **Line 3**: just like Line 1 but with a different string: `["j", "o", "n", "e", "s"]`
- **Line 4**: We are using the `push()` method to add the entire `arr3` array to `arr2` (which, remember, is the same as `arr1`). We are *NOT* spreading it or concatting it which means we now have an array of four strings and then the fifth element is an array. This is what we have now: `["n", "h", "o", "j", ["j", "o", "n", "e", "s"]]`
- Lines 5 and 6 are going to output the same thing because they both point to the same array. So what is the length? We know the length is 5: 4 Strings plus 1 Array. How about that last part? This is tricky because you need to know that `slice()` does **not** alter the array (so the second console.log won't be affected) AND you need to know how an array will be outputted when it is outputted as a string. As the answer above shows, when outputting an array as a string, it separates each string with a comma.
    + See the example below:

```js
console.log("array 3: " + arr3);     // "array 3: j,o,n,e,s"
```

- Source: [https://www.toptal.com/javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)

[[↑] Back to top](#top)


### The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

```js
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};
```

- this answer is related to the call stack


- [https://www.toptal.com/javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)

[[↑] Back to top](#top)


### This - Testing your `this` knowledge in JavaScript: What is the output of the following code?

```js
var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);
```

- Answer: 10 2
- Everything starts at the bottom: `obj.method(fn, 1)`. The function `method` takes only argument, a function, but in this example we give it two...
- Inside `method`, we see only two lines: `fn()` and `arguments[0]()`. The first is pretty easy; it's just calling the function, `fn`, which was defined above. The second is trickier but that is really just the `arguments` array that comes with every function and it is just calling `fn()` again. So we get two `fn()` calls.
- So we have two function calls of `fn` but this is where it gets tricky. In the `fn()` function declaration, it simply logs `this.length` which, at its first call, `this` is the global `window` object. And because the first line, `var length = 10`, is declared on the global scope, `this.length` is equal to 10.
- The first log is 10
- For the second log, even though we are just calling `fn()` again, inside the `fn`, the scope of this function becomes the arguments arraw, and logging the length of `arguments[]` will return 2.
- CM - I need to run through a few more `this` examples, I don't think I entirely get this. I can recreate it

- [https://www.toptal.com/javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)

[[↑] Back to top](#top)


### The Rules of `this`

1 - If the `new` keyword is used when calling the function, `this` inside the function is a brand new object created by the JavaScript engine.

```js
function ConstructorExample() {
    console.log(this);
    this.value = 10;
    console.log(this);
}

new ConstructorExample();

// -> ConstructorExample {}
// -> ConstructorExample { value: 10 }
```

2 - If `apply`, `call`, or `bind` are used to call a function, `this` inside the function is the object that is passed in as the argument.

```js
function fn() {
    console.log(this);
}

var obj = {
    value: 5
};

var boundFn = fn.bind(obj);

boundFn(); // -> { value: 5 }
fn.call(obj); // -> { value: 5 }
fn.apply(obj); // -> { value: 5 }
```

3 - If a function is called as a method — that is, if dot notation is used to invoke the function — `this` is the object that the function is a property of. In other words, when a dot is to the left of a function invocation, `this` is the object to the left of the dot. (`ƒ` symbolizes function in the code blocks)

```js
const obj = {
    value: 5,
    printThis: function() {
      console.log(this);
    }
};

obj.printThis(); // -> { value: 5, printThis: ƒ }
```

4 - If a function is invoked as a free function invocation, meaning it was invoked without any of the conditions present above, `this` is the global object. In a browser, it’s `window`.

```js
function fn() {
    console.log(this);
}

// if called in browser:
fn(); // -> Window {stop: ƒ, open: ƒ, alert: ƒ, ...}
```


- Source: [https://www.educative.io/collection/page/5679346740101120/5707702298738688/5676830073815040](https://www.educative.io/collection/page/5679346740101120/5707702298738688/5676830073815040)

[[↑] Back to top](#top)

### What is `this` in JavaScript (and how does it work)?

- At the time of execution of every function, the JavaScript engine sets a property to the function called `this` which refer to the current execution context. `this` always refers to an object and depends on how the function is called. There are 7 different cases where the value of `this` varies:
    + In the global context or inside a function `this` refers to the window object.
    + Inside IIFE (immediate invoking function) if you use "use strict", the value of `this` is undefined. To pass access window inside IIFE with "use strict", you have to pass `this`.
    + While executing a function in the context of an object, the object becomes the value of this
    + Inside a setTimeout function, the value of `this` is the window object.
    + If you use a constructor (by using `new` keyword) to create an object, the value of `this` will refer to the newly created object.
    + You can set the value of `this` to any arbitrary object by passing the object as the first parameter of `bind`, `call` or `apply`
    + For a DOM event handler, value of `this` would be the element that fired the event

- Source: [http://www.thatjsdude.com/interview/js2.html#this](http://www.thatjsdude.com/interview/js2.html#this)

[[↑] Back to top](#top)

### Explain "hoisting".

- *Hoisting* in JavaScript is when the declaration of functions and variables is "moved" to the top of the current scope.
- Your code isn't magically being moved to the top - what's actualy happening is that your declarations are added to memory during the compile phase.
- Here are some examples to show how it applies to variables and functions and some take-aways to remember:

```js
console.log(a); // undefined
var a = 5;
console.log(a); // 5

console.log(b); // ReferenceError: b is not defined
```

- There are a few things to notice here:
    + first, I am logging the value of `a` right away and I get `undefined`. This right here is **hoisting** in action. It logs `undefined` because I declared `a` in the second line (`var a = 5`)
    + Skipping to the bottom, notice how `b`, which is never declared, does NOT get the same `undefined`, it gets a ReferenceError. There was no `b` declaration to hoist therefore JavaScript has no idea what `b` is
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
|Function|Function declaration - `function sayHello(){}`|**Yes**|
|Function|Function expression - `var sayHello = function(){}`|No|


**References**

- [Medium: What is Hoisting?](https://codeburst.io/javascript-what-is-hoisting-dfa84512dd28)
- [FEIH: Explain Hosting](https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/javascript-questions.md#explain-hoisting)
- [coolinmc6/advanced_javascript](https://github.com/coolinmc6/advanced_javascript#lecture-9-what-is-variable-hoisting)

[[↑] Back to top](#top)

### Hoisting - What will be the output of this code?

```js
var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl();
```

- Neither 21 nor 20, the result is `undefined`
- I would've initially thought 21 but what is really happening is related to *hoisting*. So first, it's not 21 because when the function is executed, it sees that there is a local `x` variable present.
- So 21 is NOT used because there's a local `x`
- Hoisting in JavaScript means that variable declarations (`var x;`) are hoisted but NOT initializations `var x = 20`. So in this scenario, the `x` that it's looking for will be `var x = 20` but that initial value isn't given until after the console.log.

- Source: [https://www.toptal.com/javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)

[[↑] Back to top](#top)


### Object Clone - How do you clone an object?

```js
var obj = {a: '4', b: 'apple'};

var clone = Object.assign({}, obj);
```


- [https://www.toptal.com/javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)

[[↑] Back to top](#top)

### Object Equality - How would you compare two objects in JavaScript?

- Answering this question completely requires an understanding of how JavaScript tests for equality. Primitives (undefined, null, boolean, string, and number) are compared by their value while Objects (which includes objects (e.g. user-defined objects), arrays, dates) are compared by reference.
- Comparing "by reference" pretty much means assessing whether these two objects are pointing to the same location in memory.
- So to check two objects that do not point to the same location in memory, we need to check whether the objects have the same properties and same values in those properties. If all the properties have the same value, they are equal.
- Here are two solutions:

```js
function isEqual(a, b) {
    var aProps = Object.getOwnPropertyNames(a),
        bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}
```

- The solution I originally came up with is not 100% correct because it uses `Object.keys()` which is not the same as `Object.getOwnPropertyNames()`. Here is a good explanation of the difference between them: [https://stackoverflow.com/questions/22658488/object-getownpropertynames-vs-object-keys](https://stackoverflow.com/questions/22658488/object-getownpropertynames-vs-object-keys)
    + the short answer is that `Object.keys()` returns all *enumerable* own properties on the object. So if you manually set a property to `{enumerable: false}`, then `Object.keys()` won't have that property in the resulting array.
    + I have never manually made a property not enumerable but just FYI
- [http://www.thatjsdude.com/interview/js2.html#objectEquality](http://www.thatjsdude.com/interview/js2.html#objectEquality)


[[↑] Back to top](#top)





[[↑] Back to top](#top)

### What is JSONP? How does it work and how is it different than AJAX?

- JSONP (JSON with Padding) is a method commonly used to bypass the cross-domain policies in web browsers because Ajax requests from the current page to a cross-origin domain is not allowed.
- JSONP works by making a request to a cross-origin domain via a `<script>` tag and usually with a callback query parameter, for example: `https://example.com?callback=printData1`. The server will then wrap the data within a function called `printData` and return it to the client.

```html
<!-- https://mydomain.com -->
<script>
function printData(data) {
  console.log(`My name is ${data.name}!`);
}
</script>

<script src="https://example.com?callback=printData"></script>
```

```js
// File loaded from https://example.com?callback=printData
printData({ name: 'Yang Shun' });
```

- The client has to have the `printData` function in its global scope and the function will be executed by the client when the response from the cross-origin domain is received.
- JSONP can be unsafe and has some security implications. As JSONP is really JavaScript, it can do everything else JavaScript can do, so you need to trust the provider of the JSONP data.
- These days, [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is the recommended approach and JSONP is seen as a hack.

[[↑] Back to top](#top)

### Describe event bubbling.

> When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors. The process is called “bubbling”, because events “bubble” from the inner element up through parents like a bubble in the water.

- This means the event checks for a handler on **each** parent ancestor as it goes up the chain. So your event handler on the child it will check for that same event on the parent element. This CodePen shows that in code: [CodePen: Event Bubbling](https://codepen.io/coolinmc6/full/GzxOjz)
  - There are two elements: a `div.child` and `div.parent`; the child is inside the parent
  - THere are click handlers on both the child and parent to console.log something when clicked
  - If you click on the `.child`, you get two logs: one from the child and then one from the parent (because there are two event handlers)
  If you click on the `.parent`, you get only one log => **events bubbles UP from child -> parent -> all the way up to the `document` element**

Sources: 
- [https://www.sitepoint.com/event-bubbling-javascript/](https://www.sitepoint.com/event-bubbling-javascript/)
- [https://javascript.info/bubbling-and-capturing](https://javascript.info/bubbling-and-capturing)

[[↑] Back to top](#top)

### What is a Promise? How does a Promise work?

> A promise represents the eventual result of an asynchronous operation. It is a placeholder into which the successful result value or reason for failure will materialize.

> Essentially, a Promise is a returned object you attach callbacks to, instead of passing callbacks into a function.

> A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it’s not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: fulfilled, rejected, or pending. Promise users can attach callbacks to handle the fulfilled value or the reason for rejection.

- Promises are used to handle asynchronous code. They provide a simpler alternative to executing, composing, and managing asynchronous operations vs. traditional callback-based approaches
- What are the 3 states of a Promise?
- When are Promises used?
- What is the traditional callback-based approach?
- Show a basic example of a Promise.

- Sources:
  - [https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
  - [https://spring.io/understanding/javascript-promises](https://spring.io/understanding/javascript-promises)
  - [https://medium.com/@kvosswinkel/is-javascript-synchronous-or-asynchronous-what-the-hell-is-a-promise-7aa9dd8f3bfb](https://medium.com/@kvosswinkel/is-javascript-synchronous-or-asynchronous-what-the-hell-is-a-promise-7aa9dd8f3bfb)

[[↑] Back to top](#top)


### What are promises and how they are useful?

- We use promises for handling asynchronous interactions in a sequential manner. They are especially useful when we need to do an async operation and **THEN** do another async operation based on the results of the first one. For example, if you want to request the list of all flights and then for each flight you want to request some details about it. The promise represents the future value. It has an internal state (`pending`, `fulfilled` and `rejected`) and works like a state machine.
- A promise object has a `then()` method, where you can specify what to do when the promise is fulfilled or rejected.
- You can chain `then()` blocks, thus avoiding the callback hell. You can handle errors in the `catch()` block. After a promise is set to fulfilled or rejected state, it becomes immutable.


- Source: [https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions#question-32-what-are-promises-and-how-they-are-useful](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions#question-32-what-are-promises-and-how-they-are-useful)
- Read through: [https://opensourceconnections.com/blog/2014/02/16/a-simple-promise-implementation-in-about-20-lines-of-javascript/](https://opensourceconnections.com/blog/2014/02/16/a-simple-promise-implementation-in-about-20-lines-of-javascript/)

[[↑] Back to top](#top)

### Write 10 simple examples of promises.

**#0: Undefined Promise**

```js
const promise00 = new Promise();
console.log(promise00)
// Uncaught TypeError: Promise resolver undefined is not a function
```
- you can't just create a new promise without a resolve function. This code causes an error as nothing
is resolved.

**#0-b: Incomplete Resolve**

```js
const promise00b = new Promise(() => {
    return 'a'
});
console.log(promise00b);
console.log(promise00b.then((res) => {console.log(res)}));
/*
Promise {<pending>}
Promise {<pending>}
*/
```
- both lines return `Promise {<pending>}` because you didn't complete the promise.
There is no explicit "resolve" function, really. Notice how returning "a" didn't 
log it to the console.

**#0-c: Resolved Promise**

```js
const promise00c = new Promise((a) => {
    a('a')
});
console.log(promise00c)
promise00c.then((res) => {console.log(res)})
/*
Promise {<resolved>: "a"}
    __proto__: Promise
    [[PromiseStatus]]: "resolved"
    [[PromiseValue]]: "a"
a
*/
```
- the name of my resolve function is `a` and I am returning the letter "a". As you can see in the console, 
the promise is resovled. You can expand the `Promise` object in the console and see both the
`[[PromiseStatus]]` and `[[PromiseValue]]`.

**#0-d: Unresolved Promise**

```js
const promise00d = new Promise((a) => {
    return 'a';
    a('a')
});
console.log(promise00d)
promise00d.then((res) => {console.log(res)})
// Promise {<pending>}
```
- This results in an unresolved promise but it's not undefined. So a promise needs to have a resolve
function, which this one does, but that still doesn't guarantee that it is correct. In this case, 
I have a `return` statement before my resolve function, `a`.
- Notice the console: promise is pending and will be pending forever based on how this promise
is written.

**#1**
```js
const promise01 = new Promise((res, rej) => res("hey"));
console.log(promise01)
promise01.then((res) => { console.log(res)})
/*
Promise
    __proto__: Promise
    [[PromiseStatus]]: "resolved"
    [[PromiseValue]]: "hey"
hey
*/
```
- This is a working promise. It has a resolve function that returns the word "hey"
- I then use the `.then()` syntax to get that value. I pass my anonymous function into `then()`
to simply log the result, which is "hey".

**#2**
```js
function promiseBuilder() {
    return new Promise((resolve, reject) => {
        return Math.random() < 0.5 ? resolve('success') : reject('rejected')
    })
}

for(let i = 0; i < 5; i++) {
    const promise02 = promiseBuilder();
    promise02.then((res) => { console.log(i ,res)}).catch((err) => { console.log(i, err)})
    console.log(`${i}: `, promise02)
}
/*
0:  Promise {<rejected>: "rejected"}
1:  Promise {<resolved>: "success"}
2:  Promise {<resolved>: "success"}
3:  Promise {<resolved>: "success"}
4:  Promise {<rejected>: "rejected"}
1 "success"
2 "success"
3 "success"
0 "rejected"
4 "rejected"
*/
```
- the `promiseBuilder()` function simply returns a promise with a 50% chance of resolving or rejecting.
If `Math.random() < 0.5`, we resolve "success", else we reject and give message of "rejected"
- I then created five (5) promises and resolved/rejected them right away.
- Notice that I have both a `then()` and `catch()`. If I rejected the promise and only specified a
resolve function, I couldn't get the error message.
    - for both the resolve and reject I return the iteration counter, `i`, and the message. 
    - I don't understand why but the "success" messages appear to have been logged first. As 
    you can see by the numbers, the first was actually "rejected" but printed only after the 
    successes
- Notice how I can log the count and the promise in the for-loop and then once the iterations are done, 
the promises are resolved

**#3**
```js
const promise03 = new Promise((resolve) => {
    console.log('Promise #1')
    resolve('hey')
})
promise03.then(value => {
    return new Promise((resolve) => {
        console.log('Promise #2')
        resolve(value)
    })
}).then(value => {
    console.log(value)
})
/*
Promise #1
Promise #2
hey
*/
```
- this isn't anything too difficult but I am simply creating a promise and then in my
returned value, I'm returning another promise.
- The first promise logs "Promise #1" and then resolves the value "hey"
- the second promise logs "Promise #2" and then resolves the value it received from the first one
- finally, in the `.then()` of Promise #2, it logs "hey"

**#4**
```js
const promise04 = new Promise((res, rej) => {
    setTimeout(() => {res('asynchronous response')}, 1000)
})
console.log(promise04)
promise04.then(res => { 
    console.log(res)
    console.log(promise04)
})
/*
Promise {<pending>}
asynchronous response
Promise {<resolved>: "asynchronous response"}
*/
```
- In this example, we used `setTimeout()` to delay the resolve by one second, simulating an actual asynchronous
request.
- As you can see in the logs, first it is the unresolved promise, then the response, and then the
resolved promise

**#5**
```js
const promise05a = new Promise((res) => {console.log('promise #1'); setTimeout(() => {res('success #1')}, 5000)})
const promise05b = new Promise((res) => {console.log('promise #2'); setTimeout(() => {res('success #2')}, 3000)})
const promise05c = new Promise((res) => {console.log('promise #3'); setTimeout(() => {res('success #3')}, 1000)})

Promise.all([promise05a, promise05b, promise05c]).then(res => {
    console.log(res);
})
/*
promise #1
promise #2
promise #3
(3) ["success #1", "success #2", "success #3"]
*/
```
- This code creates three different promises. Each one first logs which promise it is
(e.g. promise #1) and then has a `setTimeout()` function with a different time. Each one
then resolves "success" and a number
- Notice how the promises are instantiated synchronously (obviously)
- The result of the `Promise.all()` does not happen for 5 seconds or 5000 ms, which is the
length of the longest resolve time, promise #1. The array that is returned has each of
the resolve values from each promise

**#6: Qlik Session Object**

```jsx
// qDocPromise is a promise that returns the global doc
getSessionObject(qProp) {
    return new Promise((resolve) => {
        qDocPromise.then((doc) => {
            doc.createSessionObject(qProp).then((obj) => {
                resolve(obj);
            });
        });
    });
}
```
- First, notice that this method is returning a promise. It takes an argument, `qProp`, and
returns a promise that has a lot going on
- The purpose of the method is to return a session object. To that, I need to call 
`createSessionObject()` on `doc`. The resulting object is what I'll need.
- In this complicated example, there are a number of things that are happening:
    - using qDocPromise is an async function so I have to wait for the doc
    - I then use the `doc` to call `createSessionObject()` and pass in the `qProp`
    - I can then return the `obj` using my `resolve()` function from the parent promise


### How do you use Async/Await?

- Here is a simple example using promises:

```js
const myFunction = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise resolved')
    }, 1000)
  })
}

const doAsync = async () => {
  const value = await myFunction()
  console.log(value)
}

// call within async function
await doAsync()
```

[[↑] Back to top](#top)

### How do you debug JavaScript? What tools and techniques do you use debugging JavaScript code?

[[↑] Back to top](#top)

### What language constructions do you use for iterating over object properties and array items?

**For objects:**

* `for-in` loops - `for (var property in obj) { console.log(property); }`. However, this will also iterate through its inherited properties, and you will add an `obj.hasOwnProperty(property)` check before using it.
* `Object.keys()` - `Object.keys(obj).forEach(function (property) { ... })`. `Object.keys()` is a static method that will lists all enumerable properties of the object that you pass it.
* `Object.getOwnPropertyNames()` - `Object.getOwnPropertyNames(obj).forEach(function (property) { ... })`. `Object.getOwnPropertyNames()` is a static method that lists all enumerable and non-enumerable properties of the object that you pass it.

**For arrays:**

* `for` loops - `for (var i = 0; i < arr.length; i++)`. The common pitfall here is that `var` is in the function scope and not the block scope and most of the time you would want block scoped iterator variable. ES2015 introduces `let` which has block scope and it is recommended to use that instead. So this becomes: `for (let i = 0; i < arr.length; i++)`.
* `forEach` - `arr.forEach(function (el, index) { ... })`. This construct can be more convenient at times because you do not have to use the `index` if all you need is the array elements. There are also the `every` and `some` methods which will allow you to terminate the iteration early.
* `for-of` loops - `for (let elem of arr) { ... }`. ES6 introduces a new loop, the `for-of` loop, that allows you to loop over objects that conform to the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) such as `String`, `Array`, `Map`, `Set`, etc. It combines the advantages of the `for` loop and the `forEach()` method. The advantage of the `for` loop is that you can break from it, and the advantage of `forEach()` is that it is more concise than the `for` loop because you don't need a counter variable. With the `for-of` loop, you get both the ability to break from a loop and a more concise syntax. 

- Also, when using the `for-of` loop, if you need to access both the index and value of each array element, you can do so with the ES6 Array `entries()` method and destructuring:

```
const arr = ['a', 'b', 'c'];

for (let [index, elem] of arr.entries()) { 
  console.log(index, ': ', elem);
}
```

[[↑] Back to top](#top)

### Explain the difference between mutable and immutable objects.

- The difference between these things are essentially in the definition: *mutable objects* can be changed after instantiation/creation while *immutable objects* cannot.

> A mutable object is an object whose state can be modified after it is created. An immutable object is an object whose state cannot be modified after it is created.

- Immutable objects are used in functional programming, especially React and Redux. In Redux, when you update state, you are essentially creating a new object with the updated value as opposed to changing the first object.
- Using the `const` keyword will NOT make an array or object immutable. It does, however, make *primitive values* like `String` and `Number` variables unchangeable. See below:

```js
const arr = ['a', 'b', 'c'];    // ['a', 'b', 'c']
arr.push('d');                  // ['a', 'b', 'c', 'd']
arr.shift();                    // ['b', 'c', 'd']

const apple = "apple";          // "apple"
apple = "orange";               // TypeError: Assignment to constant variable.
```
- the `arr` variable can be added to, removed from, and even changed with index assignment `arr[0] = 'e'`. The `String` variable `apple` cannot be changed or re-assigned.

[[↑] Back to top](#top)

### Explain the difference between synchronous and asynchronous functions.

- Synchronous functions are blocking while asynchronous functions are not. In synchronous functions, statements complete before the next statement is run. In this case, the program is evaluated exactly in order of the statements and execution of the program is paused if one of the statements take a very long time.
- Asynchronous functions usually accept a callback as a parameter and execution continues on the next line immediately after the asynchronous function is invoked. The callback is only invoked when the asynchronous operation is complete and the call stack is empty. Heavy duty operations such as loading data from a web server or querying a database should be done asynchronously so that the main thread can continue executing other operations instead of blocking until that long operation to complete (in the case of browsers, the UI will freeze).
- A `Promise` is used to handle asynchronous code. It allows you to make asynchronous code look synchronous
- JavaScript is a single-threaded language

[[↑] Back to top](#top)

### What is asynchronous programming, and why is it important in JavaScript?

- On synchronous programming:

> Synchronous programming means that, barring conditionals and function calls, code is executed sequentially from top-to-bottom, blocking on long-running tasks such as network requests and disk I/O.

- vs. asynchronous:

> Asynchronous programming means that the engine runs in an event loop. When a blocking operation is needed, the request is started, and the code keeps running without blocking for the result. When the response is ready, an interrupt is fired, which causes an event handler to be run, where the control flow continues. In this way, a single program thread can handle many concurrent operations.





[[↑] Back to top](#top)

### What is the event loop? What is the difference between call stack and task queue?

> The event loop is a single-threaded loop that monitors the call stack and checks if there is any work to be done in the task queue. If the call stack is empty and there are callback functions in the task queue, a function is dequeued and pushed onto the call stack to be executed.

- To understand the event loop, you need to understand what the call stack is. JavaScript has a single call stack in which it keeps track of what function we’re currently executing and what function is to be executed after that.
  - when you see `stack`, think like the data structure; it is LIFO or FILO. Like a stack of plates, the plate on top is the first one removed
- Every time you call a setTimeout function or you do some async operation — it is added to the Event Table. 
- The Event Table does not execute functions and does not add them to the call stack on it’s own. It’s sole purpose is to keep track of events and send them to the Event Queue.
- The Event Queue is a data structure similar to the stack — again you add items to the back but can only remove them from the front. It kind of stores the correct order in which the functions should be executed. It receives the function calls from the Event Table, but it needs to somehow send them to the Call Stack.
- The event loop is constantly checking if the call stack is empty. If it is empty, it looks at the Event Queue. If there is something in the event queue that is waiting it is moved to the call stack. If not, then nothing happens.

- References:
  - [YouTube: What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ&feature=youtu.be)
  - [https://hackernoon.com/understanding-js-the-event-loop-959beae3ac40](https://hackernoon.com/understanding-js-the-event-loop-959beae3ac40)

[[↑] Back to top](#top)

### Explain the differences on the usage of `foo` between `function foo() {}` and `var foo = function() {}`.

- `function foo() {}` is a *function declaration* while `var foo = function() {}` is a function expression. 
- The key difference is that a function declaration has its body hoisted but the body of a function expression is not (they have the same hoisting behavior as variables).

**Function Declaration**

```js
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
```

**Function Expression**

```js
foo(); // Uncaught TypeError: foo is not a function
var foo = function() {
  console.log('FOOOOO');
};

// Similar to variables:
console.log(a);     // undefined
var a = 'hey there!';
```

[[↑] Back to top](#top)

### ES6 Template Literals offer a lot of flexibility in generating strings, can you give an example?

- The main uses are simply *string interpolation* and *multi-line strings*. 
- Template literals help make it simple to do string interpolation, or to include variables in a string. Before ES2015, it was common to do something like this:

```js
var person = { name: 'Colin', age: 12 };
console.log('Hi, my name is ' + person.name + ' and I am ' + person.age + ' years old!');
// 'Hi, my name is Colin and I am 12 years old!'
```

- With template literals, you can now create that same output like this instead:

```js
const person = { name: 'Colin', age: 12 };
console.log(`Hi, my name is ${person.name} and I am ${person.age} years old!`);
// 'Hi, my name is Colin and I am 12 years old!'
```

- Note that you use backticks, not quotes, to indicate that you are using a template literal and that you can insert expressions inside the `${}` placeholders.
- A second helpful use case is in creating multi-line strings. Before ES2015, you could create a multi-line string like this:

```js
console.log('This is line one.\nThis is line two.');
// This is line one.
// This is line two.
```

- Or if you wanted to break it up into multiple lines in your code so you didn't have to scroll to the right in your text editor to read a long string, you could also write it like this:

```js
console.log('This is line one.\n' +
	'This is line two.');
// This is line one.
// This is line two.
```

- Template literals, however, preserve whatever spacing you add to them. For example, to create that same multi-line output that we created above, you can simply do:

```js
console.log(`This is line one.
This is line two.`);
// This is line one.
// This is line two.
```

[[↑] Back to top](#top)



### What are the benefits of using spread syntax and how is it different from rest syntax?



[[↑] Back to top](#top)

### How can you share code between files?

[[↑] Back to top](#top)

### Why you might want to create static class members?

[[↑] Back to top](#top)


### Explain the Decorator Pattern.

- Decorators are a structural design pattern that aim to promote code re-use.
- In CM's words: decorators appear to be used to update, replace or extend certain functions or properties on a certain class but on an as-needed basis. If it was that important, it'd be on the base class, so with decorators, developers can create these functions that update one particular thing for an object.
- Decorators are used to modify existing systems *without* heavily changing a lot of the underlying code. If we have an object that we want to change, we can write a decorator to change just one function or property it won't affect the other objects.

> The Decorator pattern isn't heavily tied to how objects are created but instead focuses on the problem of extending their functionality. Rather than just relying on prototypal inheritance, we work with a single base object and progressively add decorator objects which provide the additional capabilities. The idea is that rather than sub-classing, we add (decorate) properties or methods to a base object so it's a little more streamlined.

- Here is a basic example:

```js
function MacBook() {
    this.cost = function() { return 997; };
    this.screenSize = function() { return 11.6; };
}

// Decorator #1
function memory(macbook) {
    var cost = macbook.cost();
    macbook.cost = function() {
        return cost + 75;
    }
}

// Decorator #2
function engraving(macbook) {
    var cost = macbook.cost();
    macbook.cost = function() {
        return cost + 200;
    }
}

// Decorator 3
function insurance( macbook ){
  var cost = macbook.cost();
  macbook.cost = function(){
     return cost + 250;
  };
}

var mb = new MacBook();
memory(mb);
engraving(mb);
insurance(mb)

console.log(mb.cost())       // 1522 => 997 (orig) + 75 + 200 + 250
console.log(mb.screenSize()); // 11.6 => original size
```



- [https://addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript)

[[↑] Back to top](#top)


### Explain the Factory Pattern.


- [https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)

[[↑] Back to top](#top)


### Explain the Singleton Pattern.


- Sources:
    - [https://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)
    - [https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions#question-27-describe-singleton-pattern-in-javascript](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions#question-27-describe-singleton-pattern-in-javascript)

[[↑] Back to top](#top)


### Explain the Revealing Module Pattern.


- [https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)

[[↑] Back to top](#top)

### Explain the Module Pattern.

- Here is an example of the Module Pattern:

```js
var Module = (function() {
    function privateMethod() {
        // do something
    }

    return {
        publicMethod: function() {
            // can call privateMethod();
        }
    };
})();

Module.publicMethod(); // works
Module.privateMethod(); // Uncaught ReferenceError: privateMethod is not defined
```

[[↑] Back to top](#top)



### Explain the Facade Pattern.

- [https://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript)

[[↑] Back to top](#top)


### Explain the Observer Pattern.

- [https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)

[[↑] Back to top](#top)


### Explain the MVC (Model-View-Controller) Pattern.

- [https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvc](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvc)

[[↑] Back to top](#top)


### Explain the MVP (Model-View-Presenter) Pattern.


- [https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvp](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvp)

[[↑] Back to top](#top)


### Explain the MVVM (Model View ViewModel)Pattern.

- [https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvvm](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvvm)

[[↑] Back to top](#top)



## Easy

Easy Questions - https://github.com/coolinmc6/front-end-dev/blob/master/assets/building-blocks.jpg - fix asset path

### What are the differences between variables created using let, var or const?

- Variables declared using the `var` keyword are scoped to the function in which they are created, or if created outside of any function, to the global object. `let` and `const` are _block scoped_, meaning they are only accessible within the nearest set of curly braces (function, if-else block, or for-loop).
- This first example shows how inside the function, we can log them to the console, but outside of `foo()`, none of them are defined. *Nothing too crazy or exciting here...this makes sense.*

```js
function foo() {
  // All variables are accessible within functions.
  var bar = 'bar';
  let baz = 'baz';
  const qux = 'qux';

  console.log(bar); // bar
  console.log(baz); // baz
  console.log(qux); // qux
}

console.log(bar); // ReferenceError: bar is not defined
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

- This next snippet really shows the difference between `var` and `let` / `const`:

```js
if (true) {
  var bar = 'bar';
  let baz = 'baz';
  const qux = 'qux';
}

// var declared variables are accessible anywhere in the function scope.
console.log(bar); // bar
// let and const defined variables are not accessible outside of the block they were defined in.
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

- `var` allows variables to be hoisted, meaning they can be referenced in code before they are declared. 
- `let` and `const` will not allow this, instead throwing an error.

```js
console.log(foo); // undefined

var foo = 'foo';

console.log(baz); // ReferenceError: can't access lexical declaration 'baz' before initialization

let baz = 'baz';

console.log(bar); // ReferenceError: can't access lexical declaration 'bar' before initialization

const bar = 'bar';
```

- Redeclaring a variable with `var` will not throw an error, but 'let' and 'const' will.

```js
var foo = 'foo';
var foo = 'bar';
console.log(foo); // "bar"

let baz = 'baz';
let baz = 'qux'; // Uncaught SyntaxError: Identifier 'baz' has already been declared
```

- `let` and `const` differ in that `let` allows reassigning the variable's value while `const` does not.

```js
// This is fine.
let foo = 'foo';
foo = 'bar';

// This causes an exception.
const baz = 'baz';
baz = 'qux';            // TypeError: Assignment to constant variable.
```

### What are the differences between ES6 class and ES5 function constructors?

Let's first look at example of each:

```js
// ES5 Function Constructor
function Person(name) {
  this.name = name;
}

// ES6 Class
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

- For simple constructors, they look pretty similar.
- The main difference in the constructor comes when using inheritance. If we want to create a `Student` class that subclasses `Person` and add a `studentId` field, this is what we have to do in addition to the above.

```js
// ES5 Function Constructor
function Student(name, studentId) {
  // Call constructor of superclass to initialize superclass-derived members.
  Person.call(this, name);

  // Initialize subclass's own members.
  this.studentId = studentId;
}

// if I don't add this, the __proto__ of my new student is Object, and I want it to be Person
Student.prototype = Object.create(Person.prototype); 
Student.prototype.constructor = Student;

// ES6 Class
class Student extends Person {
  constructor(name, studentId) {
    super(name);
    this.studentId = studentId;
  }
}
```

- It's much more verbose to use inheritance in ES5 and the ES6 version is easier to understand and remember.

[[↑] Back to top](#top)

### What's the difference between an "attribute" and a "property"?

> When writing HTML source code, you can define attributes on your HTML elements. Then, once the browser parses your code, a corresponding DOM node will be created. This node is an object, and therefore it has properties.

- the above definition is pretty easy to understand. *Attributes* are in HTML and can be defined in the HTML elements. *Properties* are just like the properties on an object - and that's what it is: the browser parses the code and a corresponding DOM node is created. This node is an object that has properties.

[[↑] Back to top](#top)


### What is the DOM?

- The DOM or Document Object Model is a programming interface for HTML and XML documents...so it is NOT the page itself!
    + as a quick reminder, a web page is just a document! It can be displayed in a text editor (like Sublime) or it can be displayed in a browser window.
- It represents the page so that programs can change parts of the document like structure, style and content.
- The DOM represents the document (HTML or XML) as nodes and objects so that programming languages can connect to the page. Below is an image of what the DOM would look like:

DOM Image - https://github.com/coolinmc6/front-end-dev/blob/master/assets/pic_htmltree.gif - fix asset path

- The DOM is an object-oriented representation of the web page that a scripting language like JavaScript can manipulate.
- The DOM is **NOT** a programming language.
- The W3C DOM and WHATWG DOM standards are implemented in most modern browsers but not all browsers are the same and often extend the standard in different ways.
- One example of a common standard is `getElementsByTagName`. That standard specifies that that method must return a list of all elements that are of that tag in the parentheses:

```js
var paragraphs = document.getElementsByTagName("p");
```

- Sources:
    + [MDN: What is the DOM?](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
    + [DOM Questions](http://thatjsdude.com/interview/index.html)
        * great questions that I need to follow up on.

[[↑] Back to top](#top)


### What is the Shadow DOM? How does it relate to the DOM?



[[↑] Back to top](#top)

### What is REST, and why do people use it?

- REST stands for Representational State Transfer
- REST is a web standards architecture style that uses HTTP protocol for data communication.  In a REST application, all components are resources and the resources are accessed using HTTP standards.
- RESTful applications use HTTP requests to post data (create and/or update), read data (e.g., make queries), and delete data. Thus, REST uses HTTP for all four CRUD (Create / Read / Update / Delete) operations
- In REST architecture, a REST Server simply provides access to resources and a REST client accesses and presents the resources.
- REST has six constraints
    - Client-Server - separation of user interface with the database/data storage concerns
    - Stateless - each request from the client to the server must contain all the necessary information for the server to understand it (all state is kept on the client)
    - Cacheable - information can be marked "cacheable" so that a client can reuse data from a previous request for future requests
    - Uniform Interface - 
    - Layered System - 
    - Code on Demand (optional) - 
- Links: 
    - [https://restfulapi.net/](https://restfulapi.net/)
    - [https://www.sitepoint.com/developers-rest-api/](https://www.sitepoint.com/developers-rest-api/)


[[↑] Back to top](#top)

### What is a Map? How is it different than an Object? Why would you use one?



- Sources:
    + [Frontend Weekly: ES6 — Map vs Object — What and when?](https://medium.com/front-end-weekly/es6-map-vs-object-what-and-when-b80621932373)
    + [GeeskforGeeks: Map in JavaScript](https://www.geeksforgeeks.org/map-in-javascript/)

[[↑] Back to top](#top)

### Common Vanilla JavaScript functions.

#### Select elements from the DOM


`querySelector`

```js
var element = document.querySelector('.target');
console.log(element);   // "<div class='target'></div>"
```

- This method returns the **first element** that matches.

`querySelectorAll`

```js
var targets = document.querySelectorAll('.target')
console.log(targets);           // NodeList(2) [div.target, div.target]

var transformed = Array.prototype.slice.call(targets);
console.log(transformed);       // (2) [div.target, div.target]

var transformedES6 = Array.from(targets);
console.log(transformedES6);    // (2) [div.target, div.target]
```

- returns a list of elements that match the selector. This is **NOT** an array, but a `NodeList`. The variable called `transformed` shows you can convert that `NodeList` into an array. There are two versions, the first with ES5 and the second with ES6.

`getElementByID`


`getElementsByClassName`


- Others: `getElementsByName`, `getElementsByTagName`, `getElementByTagNameNS`

#### Add Event Listener

```js
var button = document.querySelector('.button');

button.addEventListener('click', function(e) {
    console.log(e.type + ' got fired');
});

```

#### Get value of an input using Vanilla JavaScript.

```js
var text = document.querySelector('.text');

// Version #1: Anonymous Function
text.addEventListener('keyup', function() {
    var value = this.value;
    
    console.log(value)
});

// Version #2: Named function
text.addEventListener('keyup', getValueDoStuff)

function getValueDoStuff() {
    var value = this.value;
    
    console.log(value)
}
```

#### Create a new DOM Element

- Here is a simple example:

```js
var d = document.createElement('div');

var sp = document.createElement('span');
```

- Here is a function I created to created to simplify the creation of complex elements (element has a class, content in the element, attributes):

```js
/*
 * elem         => String: 'div', 'span', 'h1'...whatever the HTML tag you want to create
 * elemClass    => String: 'button blue', 'btn btn-primary', etc...the element's class
 * text         => String: "Click here", "Delete Item?", "&times;" ... the text in the element
 * attributes   => Object: { target: "_blank", href: "www.google.com"} other HTML attributes
 *
 *
 **/
function makeHTMLElement(elem, elemClass, text, attributes) {
    var d = document.createElement(elem);
    d.className = elemClass;
    d.innerHTML = text;

    for(var prop in attributes) {
        d.setAttribute(prop, attributes[prop])
    }

    return d;
}

var button = makeHTMLElement('button', 'btn btn-primary', 'Add Vehicle', {"href": "www.cars.com", carID: car.id});
```

#### Remove an element from the DOM


#### Add/Remove a class to/from an element.

```js
myElement.classList.add('foo');
myElement.classList.remove('bar');
myElement.classList.toggle('baz');
```

- [https://www.sitepoint.com/add-remove-css-class-vanilla-js/](https://www.sitepoint.com/add-remove-css-class-vanilla-js/)

#### Change an element's class completely.

- One way to do that is to use to the `setAttribute()` method and completely overwrite the class:

```js
// Version #1
var button = document.querySelector('.unclassed');  // grab element with the class: "unclassed"
button.setAttribute('class', 'btn btn-danger');     // replace it with class: "btn btn-danger"

// Version #2 => DOES NOT SHOW UP IN THE BROWSER
var button = document.querySelector('.unclassed');
Object.assign(button, {
    'class': 'btn btn-danger unclassed'
});
```

- Version #1 is visible to users. Version #2 *does* change the class but there is no redraw which, 
for most purposes (for me, at least), does not really help. 
- **Quick Answer:** use `setAttribute()`

#### Get an attribute from a DOM element.

```js
// Get an attribute value
const value = myElement.value

// Set an attribute as an element property
myElement.value = 'foo'

// Set multiple properties using Object.assign()
Object.assign(myElement, {
  value: 'foo',
  id: 'bar'
})

// Remove an attribute
myElement.value = null
```

> Note that there are also the methods `.getAttibute()`, `.setAttribute()` and `.removeAttribute()`. These directly modify the HTML attributes (as opposed to the DOM properties) of an element, thus causing a browser redraw (you can observe the changes by inspecting the element with your browser’s dev tools). Not only is such a browser redraw more expensive than just setting DOM properties, but these methods also can have unexpected results.

#### Get window properties like window height, scroll position, etc.

**Height**

- There are two "heights" you should know about: `window.innerHeight` and `window.outerHeight`. You can read more about them here: [Window.innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight), [Window.outerHeight](https://developer.mozilla.org/en-US/docs/Web/API/Window/outerHeight). Both of these are *readonly* properties and can be accessed in the global scope by simply typing `innerHeight` or `outerHeight`.
- `Window.innerHeight` gets the height (in pixels) of the browser window viewport including, if rendered, the horizontal scrollbar.
    - this shrinks when you open Chrome devtools whereas the `outerHeight` is untouched
- `Window.outerHeight` gets the height in pixels of the whole browser window. It represents the height of the whole browser window including sidebar (if expanded), window chrome and window resizing borders/handles.

**Scroll Position**

- For scroll position and where you "are" on the page can be achieved with two other *read only* `window` properties: `pageXOffset` and `pageYOffset`. It appears, however, that not every browser supports those
properties so you need alternatives if trying implement a functionality that needs to know your position
like infinite scroll.
- Learn more about those properties here: [pageXOffset](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageXOffset), [pageYOffset](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset)
- Both `pageXOffset` and `pageYOffset` can be accessed in the global scope with just `pageXOffset` and `pageYOffset` as well as `window.pageXOffset` and `window.pageYOffset`
- To account for the fact that those properties are not always available, here is a function that
returns the (x,y) coordinates of your position on a page.

```js
document.getScroll = function() {
    if (window.pageYOffset != undefined) {
        return [pageXOffset, pageYOffset];
    } else {
        var sx, sy, d = document,
            r = d.documentElement,
            b = d.body;
        sx = r.scrollLeft || b.scrollLeft || 0;
        sy = r.scrollTop || b.scrollTop || 0;
        return [sx, sy];
    }
};
```

- the other properties being used here are `scrollLeft` and `scrollTop`
- To solve the problem of availability of properties, it check for `pageYOffset`; if it is `undefined`
then it looks to get the position of the `documentElement`, then `body`, then defaults to `0`.
  - `document.documentElement` is the root element of the document (for example, the `html` element for all HTML documents). Learn more: [MDN: Document.documentElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)


**Summary**

|Property|Use For|Measures|
|:---:|:---:|:---|
|`innerHeight`|Height|Height of inner window viewport; this figure gets smaller when you view devtools|
|`outerHeight`|Height|Height of entire window; unaffected by devtools opening BUT will get larger when user resizes window to be larger|
|`pageYOffset`|Position|Vertical scroll position - It is not available in every browser so you may need to use `scrollTop` of another element|
|`pageXOffset`|Position|Horizontal scroll position - Like `pageYOffset`, not available in every browser.|
|`scrollTop`|Position|Vertical scroll position|
|`scrollLeft`|Position|Horizontal scroll position|

- Sources:
    + [The Basics of DOM Manipulation in Vanilla JavaScript ](https://www.sitepoint.com/dom-manipulation-vanilla-javascript-no-jquery/)

[[↑] Back to top](#top)

### What is the difference between the `window` object and the `document` object?

**Answer #1**

- `Window` is the main JavaScript object root, aka the global object in a browser, also can be treated as the root of the document object model. You can access it as `window` in most of the cases (in the browser);
- `window.screen` is a small information object about physical screen dimensions.
- `window.document` or just `document` is the main object of the visible (or better yet: rendered) document object model/DOM

**Answer #2**

- Overview:
    - `window` is the execution context and global object for that context's JavaScript
    - `document` contains the DOM, initialized by parsing HTML
    - `screen` describes the physical display's full screen
- The most basic relationship among the three is that each browser tab has its own `window`, and a `window` has `window.document` and `window.screen` properties. The browser tab's window is the global context, so `document` and `screen` refer to `window.document` and `window.screen`
- **Window**


- Sources:
    - [Stack Overflow: What is the difference between window, screen, and document in Javascript?](https://stackoverflow.com/questions/9895202/what-is-the-difference-between-window-screen-and-document-in-javascript)

[[↑] Back to top](#top)


### What are some of the "features" of JavaScript?

- JavaScript is most commonly used as a client-side scripting language. This means that an HTML page with JavaScript is sent to the browser and the browser runs the JavaScript.
- JavaScript is an interpreted language which means that it produces a result from the program (whatever you wrote in JavaScript) while a compiled language is a language where a compiler is required to take your code and compile it into a program in assembly language.
- JavaScript is an object-based language but uses prototypal inheritance unlike more classical OO languages.
- JavaScript is light weight.
- JavaScript is case sensitive.

### My website is slow. Walk me through diagnosing and fixing it. What are some performance optimizations people use, and when should they be used?



[[↑] Back to top](#top)


### What frameworks have you used? What are the pros and cons of each? Why do people use frameworks? What kinds of problems do frameworks solve?


[[↑] Back to top](#top)


### What are build tools? Name some examples of build tools and explain how they work.

- Linters and Formatters
- Module Bundlers
- Task Runners

[[↑] Back to top](#top)


### How do you test your application? What are some frameworks? What are the different kinds of testing?

- Jest, Enzyme, Cypress
- Test Types: Unit, Integration, Functional

[[↑] Back to top](#top)


### What is Web Assembly (WASM)?



[[↑] Back to top](#top)

### Can you offer a use case for the new arrow => function syntax? How does this new syntax differ from other functions?

- One obvious benefit of arrow functions is to simplify the syntax needed to create functions, without a need for the `function` keyword. 
- The `this` within arrow functions is also bound to the enclosing scope which is different compared to regular functions where the `this` is determined by the object calling it. 
- Lexically-scoped `this` is useful when invoking callbacks especially in React components.
- Lexical Scoping just means that it uses `this` from the code that contains the Arrow Function.

[[↑] Back to top](#top)

### What advantage is there for using the arrow syntax for a method in a constructor?



[[↑] Back to top](#top)

### What is the definition of a higher-order function?

- A higher-order function is any function that takes one or more functions as arguments, which it uses to operate on some data, and/or returns a function as a result. 
- Higher-order functions are meant to abstract some operation that is performed repeatedly. The classic example of this is `map`, which takes an array and a function as arguments. `map` then uses this function to transform each item in the array, returning a new array with the transformed data. 
- Other popular examples in JavaScript are `forEach`, `filter`, and `reduce`. A higher-order function doesn't just need to be manipulating arrays as there are many use cases for returning a function from another function. `Function.prototype.bind` is one such example in JavaScript.


**Links:**

- [https://www.sitepoint.com/higher-order-functions-javascript/](https://www.sitepoint.com/higher-order-functions-javascript/)

[[↑] Back to top](#top)

### Can you give an example for destructuring an object or an array?

- Destructuring is an expression available in ES6 which enables a succinct and convenient way to extract values of Objects or Arrays and place them into distinct variables.

**Array destructuring**

```js
// Variable assignment.
const foo = ['one', 'two', 'three'];

const [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
```

```js
// Swapping variables
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

**Object destructuring**

```js
// Variable assignment.
const o = { p: 42, q: true };
const { p, q } = o;

console.log(p); // 42
console.log(q); // true

var person = {
    name: "Colin", 
    age: 12
}

const { age, name } = person;
console.log(name) // Colin
console.log(age);  // 12
```


[[↑] Back to top](#top)


### What's the difference between a variable that is: `null`, `undefined` or undeclared? How would you go about checking for any of these states?

- **Undeclared** variables are created when you assign a value to an identifier that is not previously created using `var`, `let` or `const`. 
- Undeclared variables will be defined globally, outside of the current scope. In strict mode, a `ReferenceError` will be thrown when you try to assign to an undeclared variable. 
- Undeclared variables are bad just like how global variables are bad. Avoid them at all cost! To check for them, wrap its usage in a `try`/`catch` block.

```js
function foo() {
  x = 1; // Throws a ReferenceError in strict mode
}

foo();
console.log(x); // 1
```

- A *variable* that is `undefined` is a variable that has been declared, but not assigned a value. It is of type `undefined`. 
- If a *function* does not return any value as the result of executing it is assigned to a variable, the variable also has the value of `undefined`. 
- To check for it, compare using the strict equality (`===`) operator or `typeof` which will give the `'undefined'` string. 
  - Don't use `(x == 'undefined')` as it will also return `true` if the value is `null`.

```js
var foo;
console.log(foo); // undefined
console.log(foo === undefined); // true
console.log(typeof foo === 'undefined'); // true

console.log(foo == null); // true. This is Wrong! You need the strict equality operator

function bar() {}
var baz = bar();
console.log(baz); // undefined
```

- A variable that is `null` will have been explicitly assigned to the `null` value. It represents no value and is different from `undefined` in the sense that it has been explicitly assigned. 
- To check for `null,` simply compare using the strict equality operator. 
- Just like `undefined` above, you should not be using the abstract equality operator (`==`) to check, as it will also return `true` if the value is `undefined`.

```js
var foo = null;
console.log(foo === null); // true
console.log(typeof foo === 'object'); // true

console.log(foo == undefined); // true. Wrong, don't use this to check!
```

[[↑] Back to top](#top)

### What's a typical use case for anonymous functions?

- Here are the big three:
  - IIFEs (wrap the function and call it right away)
  - Callback that is used once and doesn't need to be used anywhere else( e.g. jQuery)
  - Arguments to functional programming constructors or Lodash
- They can be used in IIFEs to encapsulate some code within a local scope so that variables declared in it do not leak to the global scope.

```js
(function() {
  // Some code here.
})();
```

- As a callback that is used once and does not need to be used anywhere else. The code will seem more self-contained and readable when handlers are defined right inside the code calling them, rather than having to search elsewhere to find the function body.

```js
// 
setTimeout(function() {
  console.log('Hello world!');
}, 1000);

// jQuery example
$('.delete-btn').on('click', function() {
    alert("Delete!!");
});
```

- Arguments to functional programming constructs or Lodash (similar to callbacks).
  - functional programming items like `map`, `filter`, etc.

```js
const arr = [1, 2, 3];
const double = arr.map(function(el) {
  return el * 2;
});
console.log(double); // [2, 4, 6]
```

[[↑] Back to top](#top)

### What's the difference between host objects and native objects?

- Native objects are objects that are part of the JavaScript language defined by the ECMAScript specification, such as `String`, `Math`, `RegExp`, `Object`, `Function`, etc.
- Host objects are provided by the runtime environment (browser or Node), such as `window`, `XMLHTTPRequest`, etc.

[[↑] Back to top](#top)

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

[[↑] Back to top](#top)


### How do you check if an object is an array or not?

```js
var arrayList = [1,2,3];

// Version 1
if(Object.prototype.toString.call(arrayList) === '[object Array]') {
    console.log('Array!');
}

// Examples of Object.prototype.toString()
var obj = {a: 'object!!'};
var str = 'string!!';
var num = 8;
var nul = null;
var und = undefined;
var bool = true;

console.log(Object.prototype.toString.call(obj))    // [object Object]
console.log(Object.prototype.toString.call(str))    // [object String]
console.log(Object.prototype.toString.call(num))    // [object Number]
console.log(Object.prototype.toString.call(nul))    // [object Null]
console.log(Object.prototype.toString.call(und))    // [object Undefined]
console.log(Object.prototype.toString.call(bool))   // [object Boolean]
console.log(Object.prototype.toString.call(Math));  // [object Math]
```

- **Note:** using `typeof arrayList` won't solve your problem because it returns `object`. Using the `toString()` function and then calling it with whatever you're looking at allows you to see specifically what it is.

- [https://www.codementor.io/nihantanu/21-essential-javascript-tech-interview-practice-questions-answers-du107p62z#question-7](https://www.codementor.io/nihantanu/21-essential-javascript-tech-interview-practice-questions-answers-du107p62z#question-7)

[[↑] Back to top](#top)

### How do you export an object in JavaScript?

**Export Default**

- When it is one variable, you can just use `export default stuff` or whatever the name of your variable is

```js
// stuff.js
const stuff = {
    items: ['apple', 'calculator'],
    name: 'Backpack',
    quantity: 1
};

export default stuff;
```

```js
// App.js
import stuff from './stuff';
```

- Notice that you don't need to destructure anything - you are just importing it.

**Export Multiple Variables**

```js
// file.js
const item = 'Backpack';
const quantity = 25;
const price = {
    'good': 1,
    'fair': 0.65,
    'poor': 0.3
};

export { item, quantity, price};
```

```js
// App.js
import { item, quantity, price } from './file';
```

- Notice that I'm simply exporting an object, `{}`, which has keys of `item`, `quantity`, and `price`. With ES6 syntax, I don't have
to do `{ item: item, ...}`, I can just do `export { item, quantity, price}`.
- On the import statement, I'm destructuring that object using the import statement

[[↑] Back to top](#top)

### Tricky Boolean Questions

**Question:** Is `'false'` is false?


**Answer:** No. Because, it's a string with length greater than 0. Only empty string is false.


**Question:** Is `' '` is false?


**Answer:** No. Because, it's not an empty string. There is a white space in it.


**Question:** What about `{}`?


**Answer:** true. It's an object. An object without any property is an object can't be falsy.


**Question:** Tell me about `[]`?


**Answer:** This is also truthy. It's an array object (array is child of object) is truthy.


**Question:** You talked bout `''` to be falsy. What about `new String('')`?


**Answer:** Though you are passing empty string to the string constructor, it is creating a String object. More precisely an instance of String object. It becomes an object. Hence, it is not false. so, it is truthy.


**Question:** Tell me about `new Boolean(false)`


**Answer:** truthy. As it creates an instance of the Boolean object which is an object. Object is truthy.


**Question:** `Boolean(function(){})`


**Answer:** `true` if you pass a truthy value to Boolean, it will be true.


**Question:** `Boolean(/foo/)`


**Answer:** `true`


**Question:** `true%1`


**Answer:** 0. When you are trying to find reminder of true, true becomes 1 and reminder of 1 while dividing by 1 is 0. you will get same result if you do `false%1`


**Question:** `''%1`


**Answer:** 0

- See this table for a good look at what is truthy: [https://dorey.github.io/JavaScript-Equality-Table/](https://dorey.github.io/JavaScript-Equality-Table/)
- Source: [http://www.thatjsdude.com/interview/js2.html#trueLies](http://www.thatjsdude.com/interview/js2.html#trueLies)










## JavaScript Array Methods & Properties

**References:**

- [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)


**Array Methods: Original Untouched**

- `concat()`

**Array Methods: Original Altered**

- `reverse()`
- `sort()`

### Array Methods - Alphabetical

**concat**

- `concat` does **not** mutate the original array.

```js
const arr1 = [1,2,3];
const arr2 = [4,5,6];

arr1.concat(arr2);

console.log(arr1); // [1, 2, 3]

const arr3 = arr1.concat(arr2)

console.log(arr3); // [1, 2, 3, 4, 5, 6]
```

**copyWithin**



**entries**



**every**



**fill**

> The `fill()` method fills all the elements of an array from a start index to an end index with a static value. If the end index is not included, it will modify all the elements from the start index to the end of the array. It returns the modified array.

- The array must exist before using this. You can't fill *nothing* with something.

```js
//============================
// Create new array with numbers 1 - 10
let arr = new Array(10).fill(1).map((num, idx) => num * (idx+1));
// output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


//============================
// MDN Example
var array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]
```

**filter**



**find**

> The `find()` method returns the value of the first element in the array that satisfies the provided testing function. Otherwise `undefined` is returned.

- *Note:* it returns the value, not an array containing the value. Similar to `filter` except it only returns one item and it's just the value you're looking for, not an array. I think `filter` is probably much more valuable.


**findIndex**



**flat**



**flatMap**



**forEach**



**includes**



**indexOf**

> The `indexOf()` method returns the first index at which a given element can be found in the array, or -1 if it is not present.

```js
let arr = new Array(10).fill(1).map((num, idx) => num * (idx+1));

var index = arr.indexOf(10)
console.log(index); // 9
var index2 = arr.indexOf(11);
console.log(index2); // -1
```


**join**



**keys**



**lastIndexOf**



**length**



**map**



**pop**



**push**



**reduce**



**reduceRight**



**reverse**

> The `reverse()` method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.

- **ALTERS THE ARRAY**. If you don't want to alter the array, you need to make a copy. 
- "In-place" means that it transforms the input without using an auxiliary data structure (hence altering the original array).
- See below a basic example:

```js
let arr = new Array(10).fill(1).map((num, idx) => num * (idx+1));
arr.reverse();
console.log(arr);   // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

- If you don't want to alter the array, make a copy and then reverse it:

```js
let arr = new Array(10).fill(1).map((num, idx) => num * (idx+1));
let arr2 = arr.slice();
arr2.reverse();
console.log(arr);   // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(arr2);  // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

- `arr` is untouched

**shift**



**slice**



**some**



**sort**

> The `sort()` method sorts the elements of an array in place and returns the array. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.



**splice**



**toLocaleString**



**toString**



**unshift**



**values**





## JavaScript Object Methods & Properties

**References:**

- [MDN: Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)


__defineGetter__
__defineSetter__
__lookupGetter__
__lookupSetter__
__proto__
assign
constructor
create
defineProperties
defineProperty
entries
freeze
fromEntries
getOwnPropertyDescriptor
getOwnPropertyDescriptors
getOwnPropertyNames
getOwnPropertySymbols
getPrototypeOf
is
isExtensible
isFrozen
isSealed
keys
hasOwnProperty
isPrototypeOf
propertyIsEnumerable
toLocaleString
toString
valueOf


## JavaScript String Methods & Properties

**References:**

- [MDN: String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)


anchor
big
blink
bold
charAt
charCodeAt
codePointAt
concat
constructor
endsWith
fixed
fontcolor
fontsize
includes
indexOf
italics
lastIndexOf
length
link
localeCompare
match
normalize
padEnd
padStart
repeat
replace
search
slice
small
split
startsWith
strike
sub
substr
substring
sup
toLocaleLowerCase
toLocaleUpperCase
toLowerCase
toString
toUpperCase
trim
trimEnd
trimLeft
trimRight
trimStart
valueOf


## Glossary

### A - M

abstract equality operator


activation objects


AJAX


apply


arguments object


asynchronous


bind


call


call stack


classical inheritance


closure


CORS


currying


destructuring


DOMContentLoaded


event bubbling


event loop


event queue


event table


execution contexts


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


[[↑] Back to top](#top)

### N - Z

native objects


polyfill


Primitives


Promise


rest syntax


same-origin policy


scope


spread syntax


strict equality operator


string interpolation


ternary expression


this


UA String


variable objects


use strict


XMLHttpRequest




[[↑] Back to top](#top)























