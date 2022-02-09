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

/**
 * The items below are for an object that requires at least one property but that
 * property can be one of several. The situation is that we want a piece of personal
 * information but it can be their DOB, first name, full SSN, etc. We don't need all of it, 
 * but we do need at least one.
 * 
 * Original Solution: create an interface that just had 5 optional properties that are
 * just dob?: (or whatever the syntax is).
 * 
 * This is the new solution. I've also included the link from where I think this
 * solution came from: https://stackoverflow.com/questions/48230773/how-to-create-a-partial-like-that-requires-a-single-property-to-be-set/48244432
 */
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];
interface PersonalInformationShape {
  dob: string;
  first_name: string;
  last_name: string;
  ssn: string;
  address1: string;
}

export type PersonalInformation = AtLeastOne<PersonalInformationShape>;