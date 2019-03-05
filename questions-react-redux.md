<table>
    <thead>
        <tr>
            <th colspan="5" style="text-align: center;"><strong>Subjects of Study</strong></th>
        </tr>
        <tr>
            <td colspan="5">The links below are to the parent GitHub repos of completed courses, resources, my own notes, links to articles, etc. about the topics shown below. They are designed to be my "go-to" place for teaching myself the given subject.</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://github.com/coolinmc6/analytics">Analytics</a></td>
            <td><a href="https://github.com/coolinmc6/CS-concepts">Computer Science</a></td>
            <td><a href="https://github.com/coolinmc6/design-ux-ui#product-design--development">Product Development</a></td>
            <td><a href="https://github.com/coolinmc6/design-ux-ui">UX / UI Design</a></td>
            <td><strong><a href="https://github.com/coolinmc6/front-end-dev">Front End Development</a></strong></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md">JavaScript Questions & Glossary</a></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-css.md">CSS Questions & Glossary</a></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-networking-web.md">Networking Questions & Glossary</a></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-accessibility.md">Accessibility Questions & Glossary</a></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><em>React & Redux Questions</em></td>
        </tr>
    </tbody>
</table>



<a name="top"></a>
# React Questions

## Sources

- [5 Essential React Interview Questions](https://www.codementor.io/blog/5-essential-reactjs-interview-questions-du1084ym1 )
- [Edureka: 50 React Interview Questions](https://www.edureka.co/blog/interview-questions/react-interview-questions/)
- [Pau1Fitz: React Interview](https://github.com/Pau1fitz/react-interview)
- [Tyler McGinnis: React Interview Questions](https://tylermcginnis.com/react-interview-questions/)



## Hard


[[↑] Back to top](#top)

## Intermediate




[[↑] Back to top](#top)

## Easy

### What is React?

**Version 1**

- React is JavaScript library developed by Facebook.
- It is usually used as the view-layer of an application and one of its biggest benefits is that it provides a performance boost
- It does that by introducing a concept called the Virtual DOM that works by selectively rendering parts of your application depending on state changes. It does the least amount of DOM manipulation possible to keep your components up-to-date

**Version 2**

- React is a JavaScript library developed by Facebook
- Its main purpose is to build user interfaces; so just what you see on the front-end
- React makes that process easy by breaking every page down into pieces called components

**Version 3**

- React is a front end JavaScript library developed by Facebook in 2011. 
- It follows the component based approach which helps in building reusable UI components. It is used for developing complex and interactive web and mobile UI. 
- Even though, it was open-sourced only in 2015, it has one of the largest communities supporting it.

[[↑] Back to top](#top)

### What do you know about React? Summarize your knowledge.

- React is the view-layer of an application and has an interesting way of handling the 'state management' aspect of your application.
    - The 'state management' problem I am referring to is let's say you want to show the same data in several places. How do you ensure they are consistent across your application? 
- It introduces the concept of the Virtual DOM which sits on top of the actual DOM. 
    - Usually this means that the entire page or application is rendered to a particular render target like a `<div>`
- Handling DOM manipulation with a Virtual DOM leads to a performance boost BUT it is a big file to load
- React utilizes a lot of ES6's new features and syntax and is typically written in what's called JSX which is a sort of HTML-JavaScript hybrid
    - A JSX component is usually a function that returns a parent element (i.e. a div) which inside it has mostly normal HTML (for example, instead of "class" they "className"
- Building a React page is all about components. There is usually a parent <App /> component and then inside them you put more components that you build


[[↑] Back to top](#top)


### What are some of the major features of React?

- It uses the virtual DOM instead of the real DOM.
- It uses server-side rendering.
- It follows uni-directional data flow or data binding.


[[↑] Back to top](#top)

### What is JSX?

- JSX is the JavaScript-HTML hybrid that you write React in. 
- JSX allows you to embed JavaScript expressions into your code by wrapping it in curly braces. This includes something like '2+2' or printing the `age` property from your `person` object.
- JSX can look like HTML but attributes in your elements use camelCase and often have different attribute names (i.e. `className` instead of just `class`)
- JSX compiles down to `React.createElement()` calls using Babel. So as I said, JSX is really just a user-friendly way to create these JavaScript objects that React uses to build the virtual DOM.


[[↑] Back to top](#top)

### How does the Virtual DOM work?

**Person Analogy**

- Imagine you have an object that you want to model around a person. And this object has every relevant property that a person could possibly have (i.e. arms, legs, head, etc.)
- This is basically what React is doing with the DOM. It is building a virtual DOM with all of the relevant properties of the actual DOM.
- Now sticking with the Person object example, let's say you wanted to add a mustache, change their eyes to green, and give them some big biceps.
- So when we apply these changes, what React does is it FIRST runs a "diffing" algorithm which pretty much just identifies what has changed with your person object. 
- Second, it runs a reconciliation process where it updates the actual DOM (or in this case, the person) with just the results of the diffing algorithm.
- This means that instead of rebuilding your real person from the ground up, React would only change the real person's face (mustache and green eyes) and their arms (bigger biceps).
- And what's cool about this is because React is doing all this on a virtual DOM is that these views can be rendered server-side.

**Version #2**

- A virtual DOM is a JavaScript object that is essentially a copy for the real DOM. 
- The object itself is just a node tree with elements and their attributes and contents (as Objects) along with their properties
- It then updates this tree based on changes in the data model (or state) of the application.
- These changes can come from the user (i.e. user actions like a tweet or a like) or from the system (new tweet comes in, friend request, etc.)
- Whenever there is a data change, the entire UI is re-rendered in the Virtual DOM
- React then compares that virtual DOM to the real DOM in its diffing algorithm
React then updates only the part of the real DOM that has been changed


[[↑] Back to top](#top)

### Real DOM vs. Virtual DOM

|Real DOM|Virtual  DOM|
|:---|:---|
|It updates slow.|It updates faster.|
|Can directly update HTML.|Can’t directly update HTML.|
|Creates a new DOM if element updates.|Updates the JSX if element updates.|
|DOM manipulation is very expensive.|DOM manipulation is very easy.|
|Too much of memory wastage.|No memory wastage.|

[[↑] Back to top](#top)

### How does React render the virtual DOM?
Usually you have a root HTML element in your index.html file that has an id of 'root' but I've also seen other names. This div is called the "root" DOM node because everything in it is managed by React DOM.
To render an element, we call the ReactDOM.render() method which takes two parameters: the element you want to render and the root DOM node.
The element you want to render usually houses the entire application so it'll typically be called App or something like that
The root DOM node is actually selected using JavaScript  document.getElementById('root')
Usually, the ReactDOM.render() method is called once and then the state of the app changes which causes the components to re-render
React DOM compares the element and its children to the previous version of it and then updates what has changed


[[↑] Back to top](#top)

### Explain the sentence: "In React, everything is a component."
Components are the building blocks of a React application's user interface (UI).
These components split the entire UI into small, independent and reusable pieces.
React then renders these components independent of each other without affecting the UI.


[[↑] Back to top](#top)

### What is a React Component?
Components are the building blocks of React apps. 
They can be either functional components or class-based components.
In addition to returning the JSX that you want, class components can also have state which stores information in a JavaScript object
What is a functional component?
Functional components are written like normal JavaScript functions that return some JSX that React turns into HTML
What is a Class component?
Class components are written like JavaScript classes. 
The basic syntax is something like:
class MyComponent extends React.Component {}
Every React component must have a render() function that returns the JSX of our component


[[↑] Back to top](#top)

### What is Props?
The word "props" is shorthand for properties and refers to the read-only data that a component has access to.
They are usually passed down from parent to child component though props is also used by Redux.
A child component can never pass a prop up to a parent component, hence the "uni-directional" data flow.


[[↑] Back to top](#top)

### What is state in React and how is it used?
States are the source of data and must be kept as simple as possible. 
Basically, states are objects which determine components rendering and behavior. 
They are mutable unlike the props and create dynamic and interactive components. They are accessed via this.state().


[[↑] Back to top](#top)

### What are the different phases of a React component’s lifecycle?
There are three different phases to know:
Initial Rendering Phase: This is the phase when the component is about to start its life journey and make its way to the DOM.
Updating Phase: Once the component gets added to the DOM, it can potentially update and re-render only when a prop or state change occurs. That happens only in this phase.
Unmounting Phase: This is the final phase of a component’s life cycle in which the component is destroyed and removed from the DOM.


[[↑] Back to top](#top)

### What are some of the most important Lifecycle Methods?
componentWillMount() - Invoked once, on both client & server before rendering occurs.
componentDidMount() - Invoked once, only on the client, after rendering occurs.
componentWillReceiveProps() - Invoked as soon as the props are received from the parent class and before another render is called
shouldComponentUpdate() - Returns true or false value based on certain conditions. If you want your component to update, return true else return false. By default, it returns false.
componentWillUpdate() – Called just before rendering takes place in the DOM.
componentDidUpdate() – Called immediately after rendering takes place.
componentWillUnmount() – Called after the component is unmounted from the DOM. It is used to clear up the memory spaces.


[[↑] Back to top](#top)

### What is an event in React?
Event handlers in React are placed directly on the element. 
Events are named using camel case instead of just using the lowercase.
Events are passed as functions instead of strings.


[[↑] Back to top](#top)

### What are synthetic events in React?
Synthetic events are the objects which act as a cross-browser wrapper around the browser’s native event. 
They combine the behavior of different browsers into one API. 
This is done to make sure that the events show consistent properties across different browsers.


[[↑] Back to top](#top)

### What are Higher Order Components(HOC)?
Higher Order Component is an advanced way of reusing the component logic. 
Basically, it’s a pattern that is derived from React’s compositional nature. 
HOC are custom components which wraps another component within it. They can accept any dynamically provided child component but they won’t modify or copy any behavior from their input components. 
You can say that HOC are ‘pure’ components.
HOC's are used for:
Code reuse, logic and bootstrap abstraction
Render High jacking
State abstraction and manipulation
Props manipulation













