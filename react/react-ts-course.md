<a name="top"></a>

# Front End Masters: React and TypeScript

## The Fundamentals

### Local Setup
source: https://frontendmasters.com/courses/react-typescript/local-setup/

### propTypes
source: https://frontendmasters.com/courses/react-typescript/proptypes/

[[↑] Back to top](#top)

### Common Types
source: https://frontendmasters.com/courses/react-typescript/common-types/

```ts
type GroceryListProps = {
  items: string[];
  status: "loading" | "error" | "success";
}
```

```ts
type ExampleComponentProps = {
  anObject: object; // useful as a placeholder
  anotherObject: {}; // can have any properties and values
  item: {
    id: string;
    title: string;
  };
  items: {
    id: string;
    title: string;
  }[]; // array of objects of a certain type
}
```

```ts
// example of an object called "Item"
type Item = {
  id: string;
  title: string;
};

// Items is just an array of Item's
type Items = Item[];

// this object has a key of type string and value must be an Item
type ItemHash = {
  [key: string]: Item;
}

Record<string, Item>; // same as ItemHash
```

These two implementations are the same:

```ts
// function that adds two numbers
function add(a: number, b: number): number {
  return a + b;
}

// function that adds two numbers with arrow function syntax
const add = (a: number, b: number): number => a + b;
```
[[↑] Back to top](#top)

### Types vs Interfaces
source: https://frontendmasters.com/courses/react-typescript/types-vs-interfaces/

- kind of like Types and Interfaces, function declaration and function expressions 
are *mostly* the same, but there are some differences.
- Types show up better in the IDE
- Here is an example type and interface:

```ts
type Item = {
  id: string;
  title: string;
};

interface Item {
  id: string;
  title: string;
}
```

### Typing Children Exercise
source: https://frontendmasters.com/courses/react-typescript/typing-children-exercise/

### Typing CSS Styling
source: https://frontendmasters.com/courses/react-typescript/typing-css-styling/

### useState Hook
source: https://frontendmasters.com/courses/react-typescript/usestate-hook/

Here is an example mini-app:

```tsx
import { questions } from './questions';
import { useState } from 'react';

type QuestionProps = {
  question: string;
  answer: string;
};

const Question = ({ question, answer }: QuestionProps) => {
  /*
  * You can also do:
  * const [hidden, toggleHidden] = useState<boolean>(true);
  * but you don't need to define the type - it can infer based on set value
  **/
  const [hidden, toggleHidden] = useState(true);

  return (
    <article className="question">
      <header>{question}</header>
      <p className="answer">
        <span className={`${hidden ? 'blurred' : 'visible'}`}>{answer}</span>
      </p>
      <footer>
        <button onClick={() => toggleHidden(!hidden)}>Toggle Answer</button>
      </footer>
    </article>
  );
};

const Application = () => {
  return (
    <main>
      {questions.map((q) => (
        <Question question={q.question} answer={q.answer} key={q.id} />
      ))}
    </main>
  );
};

export default Application;
```
[[↑] Back to top](#top)

## Interacting With Components

### Set State Without a Default Value
source: https://frontendmasters.com/courses/react-typescript/set-state-without-a-default-value/

### useEffect TypeScript Exercise & Solution
source: https://frontendmasters.com/courses/react-typescript/useeffect-typescript-solution/

### Typing Class-Based Components
source: https://frontendmasters.com/courses/react-typescript/typing-class-based-components/


[[↑] Back to top](#top)

## Working With Reducers

### Typing Reducers
source: https://frontendmasters.com/courses/react-typescript/typing-reducers/

```ts
type PizzaData = {
  numberOfPeople: number;
  slicesPerPerson: number;
  slicesPerPie: number;
}

type PizzaState = PizzaData & { pizzasNeeded: number; }
```

[[↑] Back to top](#top)

## Color and Context

[[↑] Back to top](#top)

## Just Enough TypeScript

## Generics

- Typescript generics are a way to define a type that is a function of other types.
- Here's an example with a linked list node:

```ts
type LinkedListNode<T> = {
  value: T;
  next?: LinkedListNode<T>;
}

const first: LinkedListNode<string> = {
  value: 'first'
}

const second: LinkedListNode<number> = {
  value: 2,
}

// TypeScript will not allow this because it is expecting a node of the same type
first.next = second;
```

![Grid item placement](https://github.com/coolinmc6/front-end-dev/blob/master/assets/typescript01.png)

[[↑] Back to top](#top)

## Higher Order Components

[[↑] Back to top](#top)

## Advanced Component Patterns

[[↑] Back to top](#top)