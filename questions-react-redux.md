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
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-accessibility.md">Accessibility Questions & Glossary</a></td>
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
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md">JavaScript Questions & Glossary</a></td>
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
- [React Resources](https://reactresources.com/)
- [sudheerj/reactjs-interview-questions](https://github.com/sudheerj/reactjs-interview-questions)
    + pretty comprehensive - must revisit
- [TopTal: 13 Essential Raect.js Interview Questions](https://www.toptal.com/react/interview-questions)
- [Tyler McGinnis: React Interview Questions](https://tylermcginnis.com/react-interview-questions/)



## Hard


[[↑] Back to top](#top)

## Intermediate

### What are some of the most important Lifecycle Methods?

- **componentWillMount()** (deprecated) - Invoked once, on both client & server before rendering occurs.
- **componentDidMount()** - Invoked once, only on the client, after rendering occurs.
- **componentWillReceiveProps()** (deprecated) - Invoked as soon as the props are received from the parent class and before another render is called
- **shouldComponentUpdate()** - Returns true or false value based on certain conditions. If you want your component to update, return true else return false. By default, it returns false.
- **componentWillUpdate()** (deprecated) – Called just before rendering takes place in the DOM.
- **componentDidUpdate()** – Called immediately after rendering takes place.
- **componentWillUnmount()** – Called after the component is unmounted from the DOM. It is used to clear up the memory spaces.
- Here are all the lifecycle methods:

![React Lifecycle Methods](https://github.com/coolinmc6/front-end-dev/blob/master/assets/react-lifecycle.png)

[[↑] Back to top](#top)


### Where in a React component should you make an AJAX request?

- `componentDidMount` is where an AJAX request should be made in a React component. This method will be executed when the component “mounts” (is added to the DOM) for the first time. 
- This method is only executed once during the component’s life. Importantly, you can’t guarantee the AJAX request will have resolved before the component mounts. If it doesn't, that would mean that you’d be trying to `setState` on an unmounted component, which would not work. 
- Making your AJAX request in `componentDidMount` will guarantee that there’s a component to update.

[[↑] Back to top](#top)

### Explain Differences between State and Props.

|Conditions|State|Props|
|:---:|:---:|:---:|
|Receive initial value from parent component|Yes|Yes|
|Parent component can change value|No|Yes|
|Set default values inside component|Yes|Yes|
|Changes inside component|Yes|No|
|Set initial value for child components|Yes|Yes|
|Changes inside child components|No|Yes|

[[↑] Back to top](#top)


### What are the differences between stateful and stateless components?

|Stateful Component|Stateless Component|
|:---|:---|
|1. Stores info about component’s state change in memory |1. Calculates the internal state of the components
|2. Have authority to change state   |2. Do not have the authority to change state
|3. Contains the knowledge of past, current and possible future changes in state |3. Contains no knowledge of past, current and possible future state changes
|4. Stateless components notify them about the requirement of the state change, then they send down the props to them.|4. They receive the props from the Stateful components and treat them as callback functions|


[[↑] Back to top](#top)

### What are the differences between controlled and uncontrolled components?

|Controlled Components|Uncontrolled Components|
|:---|:---|
|1. They do not maintain their own state |1. They maintain their own state|
|2. Data is controlled by the parent component   |2. Data is controlled by the DOM|
|3. They take in the current values through props and then notify the changes via callbacks  |3. Refs are used to get their current values|


[[↑] Back to top](#top)

### What are refs in React?

- Refs is the short hand for References in React. 
- It is an attribute which helps to store a reference to a particular React element or component, which will be returned by the components render configuration function. 
- It is used to return references to a particular element or component returned by `render()`. They come in handy when we need DOM measurements or to add methods to the components.
- Here are some cases of when to use refs:
    + When you need to manage focus, select text or media playback
    + To trigger imperative animations
    + Integrate with third-party DOM libraries

**Links:**

- [Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

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

### How does React work?

- React creates a virtual DOM. When state changes in a component it firstly runs a "diffing" algorithm, which identifies what has changed in the virtual DOM. The second step is reconciliation, where it updates the DOM with the results of diff.

[[↑] Back to top](#top)

### What are some of the major features of React?

- It uses the virtual DOM instead of the real DOM.
- It uses server-side rendering.
- It follows uni-directional data flow or data binding.


[[↑] Back to top](#top)


### What are some advantages of React?

- It increases the application’s performance
- It can be conveniently used on the client as well as server side
- Because of JSX, code’s readability increases
- React is easy to integrate with other frameworks like Meteor, Angular, etc
- Using React, writing UI test cases become extremely easy

[[↑] Back to top](#top)

### What are some limitations of React?

- React is just a library, not a full-blown framework
- Its library is very large and takes time to understand
- It can be little difficult for the novice programmers to understand
- Coding gets complex as it uses inline templating and JSX

[[↑] Back to top](#top)

### What is JSX?

- JSX is the JavaScript-HTML hybrid that you write React in. 
- JSX allows you to embed JavaScript expressions into your code by wrapping it in curly braces. This includes something like '2+2' or printing the `age` property from your `person` object.
- JSX can look like HTML but attributes in your elements use camelCase and often have different attribute names (i.e. `className` instead of just `class`)
- JSX compiles down to `React.createElement()` calls using Babel. So as I said, JSX is really just a user-friendly way to create these JavaScript objects that React uses to build the virtual DOM.
- Browsers can't read JSX because it is not JavaScript. For React to work, JSX must be transformed into JavaScript using a JSX transformer like Babel and then passed to the browser.


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

- Usually you have a root HTML element in your `index.html` file that has an id of 'root' but I've also seen other names. This div is called the "root" DOM node because everything in it is managed by React DOM.
- To render an element, we call the `ReactDOM.render()` method which takes two parameters: the element you want to render and the root DOM node.
- The element you want to render usually houses the entire application so it'll typically be called `App` or something like that
- The root DOM node is actually selected using JavaScript: `document.getElementById('root')`
- Usually, the `ReactDOM.render()` method is called once and then the state of the app changes which causes the components to re-render
- React DOM compares the element and its children to the previous version of it and then updates what has changed


[[↑] Back to top](#top)

### Explain the sentence: "In React, everything is a component."

- Components are the building blocks of a React application's user interface (UI).
- These components split the entire UI into small, independent and reusable pieces.
- React then renders these components independent of each other without affecting the UI.


[[↑] Back to top](#top)

### What is a React Component?

- Components are the building blocks of React apps. 
- They can be either functional components or class-based components.
- In addition to returning the JSX that you want, class components can also have state which stores information in a JavaScript object
- **What is a functional component?**
    - Functional components are written like normal JavaScript functions that return some JSX that React turns into HTML
- **What is a Class component?**
    - Class components are written like JavaScript classes. 
    - The basic syntax is something like:
    - `class MyComponent extends React.Component {}`
    - Every React component must have a render() function that returns the JSX of our component


[[↑] Back to top](#top)

### What is Props?

- The word "props" is shorthand for properties and refers to the read-only data that a component has access to.
- They are usually passed down from parent to child component though props is also used by Redux.
- A child component can never pass a prop up to a parent component, hence the "uni-directional" data flow.


[[↑] Back to top](#top)

### What is state in React and how is it used?

- States are the source of data and must be kept as simple as possible. 
- Basically, states are objects which determine components rendering and behavior. 
- They are mutable unlike the props and create dynamic and interactive components. They are accessed via `this.state()`.


[[↑] Back to top](#top)

### What are the different phases of a React component’s lifecycle?

- There are three different phases to know:
    - **Initial Rendering Phase**: This is the phase when the component is about to start its life journey and make its way to the DOM.
    - **Updating Phase**: Once the component gets added to the DOM, it can potentially update and re-render only when a prop or state change occurs. That happens only in this phase.
    - **Unmounting Phase**: This is the final phase of a component’s life cycle in which the component is destroyed and removed from the DOM.
- Alternate names:
    + **Initialization**
    + **State/Property Updates**
    + **Destruction**


[[↑] Back to top](#top)



### What is an event in React? How do you create one?

- Event handlers in React are placed directly on the element. 
- Events are named using camel case instead of just using the lowercase.
- Events are passed as functions instead of strings.
- Here is a simple example of an event in React:

```babel
class MyComponent extends Component {
    show(e) {

    },

    render() {

        return (
            <div onClick={this.show} className="awesome-div">Click Here!</div>
        );
    }
}

```

[[↑] Back to top](#top)

### What are synthetic events in React?
- Synthetic events are the objects which act as a cross-browser wrapper around the browser’s native event. 
- They combine the behavior of different browsers into one API. 
- This is done to make sure that the events show consistent properties across different browsers.


[[↑] Back to top](#top)

### What are Higher Order Components(HOC)?

- Higher Order Component is an advanced way of reusing the component logic. 
- Basically, it’s a pattern that is derived from React’s compositional nature. 
- HOCs are custom components which wraps another component within it. They can accept any dynamically provided child component but they won’t modify or copy any behavior from their input components. 
- You can say that HOC are ‘pure’ components.
- HOC's are used for:
    - Code reuse, logic and bootstrap abstraction
    - Render High jacking
    - State abstraction and manipulation
    - Props manipulation

[[↑] Back to top](#top)


### How is React different than Angular?

|Area|React|Angular|
|:---:|:---:|:---:|
|ARCHITECTURE|Only the View of MVC|Complete MVC|
|RENDERING|Server-side rendering|Client-side rendering|
|DOM|Uses virtual DOM|Uses real DOM|
|DATA BINDING|One-way data binding|Two-way data binding|
|DEBUGGING|Compile time debugging|Runtime debugging|
|AUTHOR|Facebook|Google|

[[↑] Back to top](#top)


### Explain the purpose of `render()` in React.

- Each React component must have a `render()` mandatorily. 
- It returns a single React element which is the representation of the native DOM component. 
- If more than one HTML element needs to be rendered, then they must be grouped together inside one enclosing tag such as `<form>`, `<group>`, `<div>` etc. 
- This function must be kept pure i.e., it must return the same result each time it is invoked.

[[↑] Back to top](#top)


### What is the significance of keys in React?

- Keys are used for identifying unique Virtual DOM Elements with their corresponding data driving the UI. - They help React to optimize the rendering by recycling all the existing elements in the DOM. 
- These keys must be a unique number or string, using which React just reorders the elements instead of re-rendering them. 
- This leads to an increase in application’s performance.

[[↑] Back to top](#top)












---

# Redux Questions

## Sources & Links:

- [How Does Redux Work?](https://daveceddia.com/how-does-redux-work/)

## Questions

### What is Redux?

- It is a predictable state container for JavaScript applications and is used for the entire applications state management. Applications developed with Redux are easy to test and can run in different environments showing consistent behavior.

[[↑] Back to top](#top)

### What are the advantages of Redux?

- **Predictability of outcome** – Since there is always one source of truth, i.e. the store, there is no confusion about how to sync the current state with actions and other parts of the application.
- **Maintainability** – The code becomes easier to maintain with a predictable outcome and strict structure.
- **Server-side rendering** – You just need to pass the store created on the server, to the client side. This is very useful for initial render and provides a better user experience as it optimizes the application performance.
- **Developer tools** – From actions to state changes, developers can track everything going on in the application in real time.
- **Community and ecosystem** – Redux has a huge community behind it which makes it even more captivating to use. A large community of talented individuals contribute to the betterment of the library and develop various applications with it.
- **Ease of testing** – Redux’s code is mostly functions which are small, pure and isolated. This makes the code testable and independent.
- **Organization** – Redux is precise about how code should be organized, this makes the code more consistent and easier when a team works with it.

[[↑] Back to top](#top)

### What are the three principles that Redux follows?

- **Single source of truth:** The state of the entire application is stored in an object/ state tree within a single store. The single state tree makes it easier to keep track of changes over time and debug or inspect the application.
- **State is read-only:** The only way to change the state is to trigger an action. An action is a plain JS object describing the change. Just like state is the minimal representation of data, the action is the minimal representation of the change to that data. 
- **Changes are made with pure functions:** In order to specify how the state tree is transformed by actions, you need pure functions. Pure functions are those whose return value depend solely on the values of their arguments

[[↑] Back to top](#top)

### Explain the concept of "Single source of truth".

- Redux use the 'Store' for storing the application's entire state - all in one place.
- So for every component, the data that populates those components are all in Store and are updated by the Store for the app.
- The single state tree makes it easier to keep track of changes over time and debug or inspect the application.

[[↑] Back to top](#top)

### List the components of Redux.

- Action - a simple JavaScript object that describes what happened.
    - It usually contains at least two properties: the "type" (for reducers) and the payload or data that it is delivering
- Reducer - a function that determines how the state will change
- Store - the state / object tree of the entire application is saved in Store
- View - simply displays the data of the store


[[↑] Back to top](#top)

### How does data flow through Redux?

- Here's an image describing the flow:

![Redux Data Flow](https://github.com/coolinmc6/front-end-dev/blob/master/assets/redux-data-flow.png)

[[↑] Back to top](#top)

### How are actions defined in Redux?

- Actions are just JavaScript objects that are used by Reducers
- Actions must have a 'type' property that indicates the type of action being performed.
- The type is a string that typically describes what the action is trying to achieve. In the example below, I am trying to change the page to whatever the id of that page is
- Actions also have a "payload" property that is the value that they are trying to pass.
- So, again, actions have two properties:
    + type
    + payload / data
- Actions are created by Action Creators.

```js
// the function itself is the 'action creator'; the JS object being returned is the 'action'
export function changePage(id) {
    return {
        type: CHANGE_PAGE,
        payload: id
    }
}
```


[[↑] Back to top](#top)


### Explain the role of the Reducer.

- Reducers are *pure functions* that specify how the application's state changes in response to an action.
- Reducers take two arguments: the previous state and an action
- They then return a new state based on whatever the action tells it to do
- Below is part of one reducer I created for [Code Assist](https://github.com/coolinmc6/code-assist):

```js
export default function(state = defaultJSNotes, action) {
    switch(action.type) {
        case FETCH_LIBRARY:
            let temp = [];
            if(ENV == 'dev') {
                temp = [...action.payload.data];
            } else {
                temp = [...action.payload.data["code"]];
            }

            // let uniqueTags = [...temp.map(o => o.snipRawTags)].sort((a,b) => a - b)
            let uniqueTags = temp.reduce((acc, val) => acc.concat(val.snipTags), []).sort();
            
            return {
                ...state,
                // library: [...action.payload.data["code"]]
                library: [...temp], 
                uniqueTags: [...uniqueTags]
            }
            
        // OTHER CASES

        default:
            return state;
    }
};
```

- *Link to the reducer:* [Code Assist Reducer](https://github.com/coolinmc6/code-assist/blob/master/src/reducers/code_assist_reducer.js)

- Another important aspect to note is that you can create separate reducer files so that instead of one massive reducer, you can separate the work. To do that, you'll need a function to combine reducers. Here is an example:

```js
import { combineReducers } from 'redux';
import CodeAssistReducer from './code_assist_reducer';
import CodeReducer from './code_editor_reducer'

const rootReducer = combineReducers({   
    code_blocks: CodeAssistReducer,
    my_code: CodeReducer
}); 
    
export default rootReducer;
```


[[↑] Back to top](#top)


### What is the significance of Store in Redux?

- A store is a JavaScript object which can hold the application’s state and provide a few helper methods to access the state, dispatch actions and register listeners. 
- The entire state/object tree of an application is saved in a single store. As a result of this, Redux is very simple and predictable. 
- We can pass middleware to the store to handle the processing of data as well as to keep a log of various actions that change the state of stores. All the actions return a new state via reducers.


[[↑] Back to top](#top)




















