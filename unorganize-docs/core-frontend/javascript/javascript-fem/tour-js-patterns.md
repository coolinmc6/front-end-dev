# A Tour of JavaScript & React Patterns

## JavaScript Patterns

### Module Pattern

https://javascriptpatterns.vercel.app/patterns/design-patterns/module-pattern

- the "Module Pattern" is what is now super common practice of breaking out a function into a
separate file and then exporting / importing it.
- I'd give an example but it is exactly what I think it is - not a whole lot of new or unknown stuff
here
- there are some cool tricks like:
  - when importing it via a `<script />` tag, you can do `type="module"` which turns it into a module
  - in the `package.json` file, you add a property to the root of the JSON object like this:
  `"type": "module",` and you can use an `index.js` file that imports modules

### Singleton Pattern

- a single instance that is exported across the application
- there can only ever be one instance of your Singleton
- nothing can alter your instance - you instantiate it, freeze it, and then other files import it
and call the functions, etc.
- Some of the cons are that we don't need to do this anymore - ES2015 Modules allow us to solve some
of the problems that singletons solve
- you can also incidentally hide dependencies without knowing it because everything is in the singleton
- and hidden side-effects could be hidden

### Proxy Pattern

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

### Observer Pattern

https://javascriptpatterns.vercel.app/patterns/design-patterns/observer-pattern

### Factory Pattern

- With the Factory Pattern, we can use a special function - the factory function - to create 
many of the same objects.

```js
const createUser = (firstName, lastName) => ({
  id: crypto.randomUUID(),
  createdAt: Date.now(),
  firstName,
  lastName,
  fullName: `${firstName} ${lastName}`,
});

createUser("John", "Doe");
createUser("Sarah", "Doe");
createUser("Lydia", "Hallie");
```
- this isn't really a pattern and this is generally how I would do this if I needed to have
something with this functionality.

### Prototype Pattern

- this is a great follow-up to the **Factory Pattern** because if the `createUser` function had a
method, that method would be created for each user that you instantiate. We don't need the same method
created for all of them.
- To avoid all of this, you can simply use the new(ish) ES6 classes which puts it on the prototype
of that object.
- So this factory-type pattern:
```js
const createDog = (name, age) => ({
  name,
  age,
  bark() { // duplicated method
    console.log(`${name} is barking!`);
  },
  wagTail() { // duplicated method
    console.log(`${name} is wagging their tail!`);
  },
});

const dog1 = createDog("Max", 4);
// {name: 'Max', age: 4, bark: ƒ, wagTail: ƒ}
```

- goes to this ES6 Class Pattern:
```js
class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  bark() {
    console.log(`${this.name} is barking!`);
  }

  wagTail() {
    console.log(`${this.name} is wagging their tail!`);
  }
}

const dog1 = new Dog('Max', 4);
// Dog {name: 'Max', age: 4}
// where bark and wagTail are in the [[Prototype]]: Object dropdown
```

## React Patterns

### Container / Presentation Pattern

- the main thing is that the container component fetches the data and the Presentational
component shows it.
- Memorizing the "name" of this pattern doesn't seem super useful
- In the problem-solution section, there is a "container" section and a "presentational" section.

### HOC Pattern

- Higher Order Component
- I've used this before and use it for Auth

### Render Props Pattern

- I have never really understood this one. The code make sense, I understand what I'm reading,
I just don't think I like it. Here is an example:

```jsx
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      {props.renderKelvin({ value: value + 273.15 })}
      {props.renderFahrenheit({ value: (value * 9) / 5 + 32 })}
    </>
  );
}

export default function App() {
  return (
    <Input
      renderKelvin={({ value }) => <div className="temp">{value}K</div>}
      renderFahrenheit={({ value }) => <div className="temp">{value}°F</div>}
    />
  );
}
```
- one of the listed trade-offs of this is that hooks have changed the way we can add
reusability and data sharing to components.
- I feel like React Composition would solve some of these issues

### Hooks Pattern

- removes stateful logic from the component
- I do this stuff everyday - makes perfect sense

**start here: **https://frontendmasters.com/courses/tour-js-patterns/hooks-pattern-solution/