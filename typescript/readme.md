<a id="top"></a>

# TypeScript

## Courses

|Course|Notes|Completed|
|:---:|:---:|:---:|
|[TypeScript Beginner Course](https://www.youtube.com/watch?v=wiKENmTNMz8&list=PLe30vg_FG4OQjsYa-iys5HUeaoSHzz-wk&index=1)|[Notes](course01.md)|:white_check_mark:|
|Making TypeScript Stick|[Notes](course02.md)||
|[TypeScript Fundamentals, v3](https://frontendmasters.com/courses/typescript-v3/)|[Notes](course03.md)||

**Links:**

- [https://www.youtube.com/watch?v=gp5H0Vw39yw](https://www.youtube.com/watch?v=gp5H0Vw39yw)

## Notes

### Interface vs Type

- Both `interface` and `type` can be used to define custom types, but they are different.
There's a table below that tries to sum up the differences.


<table>
  <thead>
    <tr>
      <th>Interface</th>
      <th>Type</th>
      <th>Use / Concept / Functionality</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>:white_check_mark:</td>
      <td>:x:</td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>


### General

In TypeScript, the angle brackets `<` `>` are used for type parameterization and are called "angle bracket syntax" or "type parameter syntax". They are also sometimes referred to as "generic syntax" or "generic type syntax".

Type parameterization allows you to define generic types that can work with different data types, providing type safety while keeping code flexible and reusable.

The angle bracket syntax is commonly used in TypeScript when defining generic types for collections such as arrays, sets, and maps, as well as for functions that can operate on multiple data types. For example, you might use angle bracket syntax when defining an array of strings: 

```ts
const myArray: Array<string> = ['hello', 'world'];`
```

### TypeScript Decorators

Source: https://deadsimplechat.com/blog/typescript-decorators-a-complete-guide

- CM: this is honestly one of those things where it's cool to know but I honestly don't
see myself using it. I am going to show off some of the examples here and try to explain them
but I won't linger too long - just something to know.
- Decorators are essentially just functions that you can use to modify classes, methods, properties, etc.
- Decorators can apply to:
  - class
  - method
  - class property
  - accessor
  - method parameter
- I'll give a few examples of each but first, here are the defaults for each of them:

```ts
/**
 * Class Decorator
 * @param constructor
 * The only parameter is the constructor function of the class being decorated
 */
function classDecorator(constructor: Function) {
  // ...
}

/**
 * Property Decorator
 * @param target
 * @param propertyName
 * The first parameter is the prototype of the class being decorated
 * The second parameter is the name of the property being decorated
 */
function propertyDecorator(target: any, propertyName: string) {
  // ...
}

/**
 * Method Decorator
 * @param target
 * @param methodName
 * @param descriptor
 */
function methodDecorator(target: any, methodName: string, descriptor: PropertyDescriptor) {
  // ...
}

function parameterDecorator(target: any, methodName: string, parameterIndex: number) {
  // ...
}
```

**Class Decorators**

- In this first example, we are simply adding a new property to ALL classes that use this decorator.
The new property is called `newProperty` and it has a value of `"new value"`.
- We "decorate" the class by adding the decorator function `myClassDecorator` above the class definition
via the `@` symbol.
```ts
function myClassDecorator(target: any) {
  // Add a new property to the class prototype
  target.prototype.newProperty = "new value";
}

@myClassDecorator
class MyClass {
  // Define the class properties and methods
}

const myInstance = new MyClass();
console.log(myInstance.newProperty); // "new value"
```

- In this example, we are logging the name of the class that is being decorated.

```ts
function TechClass(constructor: Function) {
  console.log(`Class Name: ${constructor.name}`);
}

@TechClass
class CoolClass {
  constructor() {
    console.log('New Class instance has beed created');
  }
}

const myInstance = new CoolClass();
// Class Name: CoolClass
// New Class instance has beed created
```

**Method Decorators**

- Just like class decorators, we define our decorator function and then use the `@` symbol to
decorate the method we want to modify.

```ts
function myMethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`Method ${propertyKey} called with args ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${propertyKey} returned ${JSON.stringify(result)}`);
    return result;
  };

  return descriptor;
}

class MyClass {
  @myMethodDecorator
  myMethod(arg1: string, arg2: number): string {
    return `${arg1} - ${arg2}`;
  }
}

const myClassInstance = new MyClass();
myClassInstance.myMethod('hello', 42);

// Method myMethod called with args ["hello", 42]
// Method myMethod returned "hello - 42"
```