// Function that accepts a number and returns the number plus 1
function addOne(num: number): number {
  return num + 1;
}

// Function that accepts a name and returns a greeting
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Function that accepts an object with four properties: name, height, age, and weight
function profile(person: {
  name: string;
  height: number;
  age: number;
  weight: number;
}): string {
  return `${person.name} is ${person.height}cm tall, ${person.age} years old, and weighs ${person.weight}kg.`;
}

// Interface for a person object with name, height, age, and weight properties
interface Person {
  name: string;
  height: number;
  age: number;
  weight: number;
}

// Function that accepts a Person interface and returns a greeting
function profile2(person: Person): string {
  return `${person.name} is ${person.height}cm tall, ${person.age} years old, and weighs ${person.weight}kg.`;
}

// Function that explains TypeScript
function explain(): string {
  return `TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.`;
}

// To Do List Item interface with content, unique id, and completed status
interface Todo {
  content: string;
  id: number;
  completed: boolean;
}
