
# TypeScript Questions

<style>
  
  summary {
    /* background-color: #fff; */
    font-weight: bold;
    width: 104%;
  }
  details {
    margin-bottom: 1rem;
  }
</style>

```ts
  type Props = {
    app: string
    countryCode: string
    regionCode: string
  } & Partial<InjectedProps>
  ```
<details>
  <summary>Explain this code:</summary><br />

This code defines a type called `Props`, which is an object that has the following properties:

`app`: a string
`countryCode`: a string
`regionCode`: a string

In addition to these properties, `Props` can also have some or all of the properties defined in the `InjectedProps` type. The `&` symbol indicates that `Props` is a "intersection type" that combines the properties of the object on the left with the properties of the `Partial<InjectedProps>` object on the right. The `Partial<T>` type is a utility provided by TypeScript that creates a new type from an existing type `T` by making all of its properties optional. This allows the properties defined in `InjectedProps` to be either present or absent in objects of type `Props`.
</details>

<details>
  <summary>What is the difference between "unknown" and "any" types in TypeScript?</summary><br />
  While "any" type allows any value to be assigned to it, "unknown" type is stricter as it does not allow any operations to be performed on it until it has been narrowed down to a more specific type.
</details>
<details>
  <summary>Can you explain what is a conditional type in TypeScript?</summary><br />
  Conditional types allow you to define types based on conditions. This can be useful in creating more flexible and reusable types that can adapt to different situations.
</details>
<details>
  <summary>How do you handle circular dependencies in TypeScript?</summary><br />
  Circular dependencies can be tricky to handle in TypeScript, but one solution is to use the "import type" syntax, which allows you to import types without actually importing the module itself.
</details>
<details>
  <summary>What is the difference between an interface and a type alias in TypeScript?</summary><br />
  Both interfaces and type aliases can be used to define custom types in TypeScript, but there are some differences between them. One key difference is that interfaces can be extended or implemented by other interfaces or classes, while type aliases cannot.
</details>
<details>
  <summary>How do you handle null or undefined values in TypeScript?</summary><br />
  One way to handle null or undefined values is to use the "non-null assertion operator" (!) or the "optional chaining" (?.) operator, which can help prevent null or undefined errors at runtime.
</details>

<details>
  <summary>What is a mapped type in TypeScript, and how would you use it?</summary><br />
  A mapped type in TypeScript is a way to create a new type by transforming each property of an existing type. You can use a mapped type to create a new type with all properties optional or readonly, or to add or remove properties from an existing type, among other things. For example, you can create a new type that has all the properties of an existing type, but with all the property values wrapped in a Promise, using the following mapped type syntax: `type Async<T> = { [P in keyof T]: Promise<T[P]> }`.
</details>
<details>
  <summary>What are the advantages and disadvantages of using TypeScript over JavaScript?</summary><br />
  Advantages of using TypeScript over JavaScript include stronger typing, better error checking and debugging, and improved tooling and code intelligence. Disadvantages can include a steeper learning curve, increased complexity, and potentially slower development time due to additional typing and compilation requirements.
</details>
<details>
  <summary>What is the "keyof" keyword in TypeScript, and how would you use it?</summary><br />
  The "keyof" keyword in TypeScript is used to get the union type of all the keys in an object. You can use the "keyof" keyword to create more generic and reusable functions that operate on objects and their properties. For example, you can create a function that takes an object and a key, and returns the value of that key from the object, using the following syntax: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }`.
</details>
<details>
  <summary>What is the "never" type in TypeScript, and when would you use it?</summary><br />
  The "never" type in TypeScript represents a value that can never occur. It can be used as a return type for functions that always throw an error or never return, or as a way to eliminate unreachable code in control flow analysis. For example, you can create a function that always throws an error and returns a value of type "never" using the following syntax: `function throwError(message: string): never { throw new Error(message); }`.
</details>
<details>
  <summary>What is the difference between a class and an interface in TypeScript, and when would you use each?</summary><br />
  A class in TypeScript is a blueprint for creating objects that have both data and behavior, while an interface is a contract that defines the shape and structure of an object. You would use a class when you need to create objects with specific behavior and methods, while you would use an interface when you need to define the structure of an object that may be implemented by multiple classes. In general, classes are used more often than interfaces in TypeScript.
</details>

<details>
  <summary>What is a decorator in TypeScript, and how would you use it?</summary><br />
  A decorator in TypeScript is a function that can be used to modify the behavior of a class, method, or property. You can use decorators to add metadata to a class or its members, to transform or enhance the functionality of a class or its members, or to instrument or log the behavior of a class or its members at runtime. For example, you can create a decorator that logs the arguments and return value of a method using the following syntax: `function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) { const originalMethod = descriptor.value; descriptor.value = function(...args: any[]) { const result = originalMethod.apply(this, args); console.log(`Calling ${propertyKey} with arguments ${args} returned ${result}`); return result; }; }`.
</details>
<details>
  <summary>What are generics in TypeScript, and how would you use them?</summary><br />
  Generics in TypeScript allow you to create functions, classes, and interfaces that can work with a variety of data types, without specifying the actual data types until the function, class, or interface is used. You can use generics to create more flexible and reusable code, and to enforce type safety at compile time. For example, you can create a function that takes an array of any type and returns a new array with the same elements in reverse order, using the following generic syntax: `function reverse<T>(arr: T[]): T[] { return arr.reverse(); }`.
</details>
<details>
  <summary>What is the "this" keyword in TypeScript, and how would you use it?</summary><br />
  The "this" keyword in TypeScript refers to the current object or context in which a function is executed. You can use the "this" keyword to access or modify properties and methods of the current object, to chain method calls together, or to pass the current object as a parameter to other functions or methods. For example, you can create a class with a method that uses the "this" keyword to access and modify the properties of the current object, using the following syntax: `class MyClass { private _value: number = 0; public increment(): void { this._value++; } public getValue(): number { return this._value; } }`.
</details>
<details>
  <summary>What are namespaces in TypeScript, and how would you use them?</summary><br />
  Namespaces in TypeScript allow you to group related code into a single, logical unit, and to prevent naming conflicts between different parts of your code. You can use namespaces to organize your code into modules or libraries, and to control the visibility and accessibility of different parts of your code. For example, you can create a namespace that contains a class, an interface, and a function, using the following syntax: `namespace MyNamespace { export class MyClass {} export interface MyInterface {} export function myFunction() {} }`.
</details>
<details>
  <summary>What is the difference between an abstract class and an interface in TypeScript, and when would you use each?</summary><br />
  An abstract class in TypeScript is a class that cannot be instantiated directly, and that may contain abstract methods or properties that must be implemented by its subclasses. An interface in TypeScript is a contract that defines the structure and behavior of an object, but does not provide any implementation details. 
You would use an abstract class when you need to create a base class that contains common functionality for its subclasses, and when you want to enforce certain behaviors or requirements for its subclasses. Abstract classes can contain both abstract and non-abstract methods and properties, and can also provide default implementations for some methods or properties.

You would use an interface when you need to define a contract that can be implemented by multiple classes, but that does not provide any implementation details. Interfaces can only contain method and property signatures, and cannot provide any implementation code. Interfaces are useful for creating loosely-coupled systems that can be easily extended and maintained, and for enforcing type compatibility between different parts of your code.

In general, you would use an abstract class when you want to provide a default implementation for some methods or properties, or when you want to create a hierarchy of related classes with a shared behavior. You would use an interface when you want to define a contract that can be implemented by multiple unrelated classes, or when you want to create a flexible and extensible system that can be easily adapted to changing requirements or use cases.
</details>
<details>
  <summary>What does the 'Omit' type do and give an example?</summary><br />
  The Omit type in TypeScript allows you to create a new type by omitting certain properties from an existing type. It takes two type parameters: the first is the type you want to create a new type from, and the second is a union type of string literal types representing the names of the properties you want to omit.

Here's an example:

```ts
interface Person {
  name: string;
  age: number;
  email: string;
  address: string;
}

type PersonWithoutEmail = Omit<Person, 'email'>;

const person: PersonWithoutEmail = {
  name: 'John',
  age: 30,
  address: '123 Main St.'
};

```

In this example, we define an interface Person with four properties: name, age, email, and address. We then use the Omit type to create a new type PersonWithoutEmail by omitting the email property from the Person type. Finally, we create a variable person of type PersonWithoutEmail, which only has the name, age, and address properties.

The Omit type can be useful when you want to create a new type that is similar to an existing type, but with some properties omitted. This can help you avoid duplicating code or creating similar types manually, and can also help you ensure type safety by preventing you from accidentally accessing or modifying properties that should not be present in a certain context.

</details>

<details>
  <summary>How to easily make all properties of an interface optional?</summary><br>
In TypeScript, you can easily make all properties of an interface optional using the Partial utility type. The Partial type takes an interface as a type parameter, and returns a new type with all properties of the original interface made optional.

Here's an example:

```ts
interface Person {
  name: string;
  age: number;
  email: string;
  address: string;
}

type PartialPerson = Partial<Person>;

const person: PartialPerson = {
  name: 'John'
};
```

In this example, we define an interface Person with four properties: name, age, email, and address. We then use the Partial type to create a new type PartialPerson by making all properties of the Person type optional. Finally, we create a variable person of type PartialPerson, which only has the name property.

The Partial type can be useful when you want to create a new type that has some or all properties of an existing type made optional. This can be especially useful when working with forms or APIs, where you may not always have all of the information available, or when you want to provide flexibility in the types of objects that can be created or manipulated in your code.

</details>