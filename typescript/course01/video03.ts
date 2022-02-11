// Types

// string
let myName: string = 'Colin';

// number
let year: number = 2022;

// boolean
let isEnabled: boolean;
isEnabled = true;

// Types for Array

// Array of Strings
let guests: string[] = ['Joe', 'Jenny', 'John'];

// Types for Functions

// this function receives a string and returns a string
// first line is the type, second line is the implementation
let killBill: (name: string) => string;
killBill = function(name) {
  return name.toUpperCase();
}

// This is the implementation in one shot
const greetBill = function(name: string): string {
  return `Hello, ${name}!`;
}