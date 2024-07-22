# A Tour of JavaScript & React Patterns

## Module Pattern

https://javascriptpatterns.vercel.app/patterns/design-patterns/module-pattern

- the "Module Pattern" is what is now super common practice of breaking out a function into a
separate file and then exporting / importing it.
- I'd give an example but it is exactly what I think it is - not a whole lot of new or unknown stuff
here
- there are some cool tricks like:
  - when importing it via a `<script />` tag, you can do `type="module"` which turns it into a module
  - in the `package.json` file, you add a property to the root of the JSON object like this:
  `"type": "module",` and you can use an `index.js` file that imports modules

## Singleton Pattern

- a single instance that is exported across the application
- there can only ever be one instance of your Singleton
- nothing can alter your instance - you instantiate it, freeze it, and then other files import it
and call the functions, etc.
- Some of the cons are that we don't need to do this anymore - ES2015 Modules allow us to solve some
of the problems that singletons solve
- you can also incidentally hide dependencies without knowing it because everything is in the singleton
- and hidden side-effects could be hidden

## Proxy Pattern

- Instead of directly changing an object, you go through a Proxy to change it.
- a Proxy usually has `get` and `set` methods (and a bunch of others)

```js
// Directly changing the property
person.name = "John"

// Using a Proxy
personProxy.name = "John";
```
- What you don't see is how you set up the proxy. Here is an example:

```js
const person = {
    name: "Jane",
    age: 30
};

// Define the handler with a set trap
const handler = {
    set: function(target, property, value) {
        console.log(`Changing ${property} from ${target[property]} to ${value}`);
        target[property] = value;
        return true; // Indicate that the assignment was successful
    }
};

// Create the proxy
const personProxy = new Proxy(person, handler);

// Change the name property using the proxy
personProxy.name = "John";
```
- For basic stuff it feels like overkill but where proxies are useful would be like validation, logging,
formatting, etc.
- the general format is as you can see above: `const objectProxy = new Proxy(object, handler);` where
`object` is the object you want a proxy for and `handler` has all the methods you want.