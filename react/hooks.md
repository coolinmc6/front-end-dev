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
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/react/react-concepts.md">React Concepts</a></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><em>Hooks</em></td>
        </tr>
    </tbody>
</table>

# Hooks

- Hooks allow you to use React features (like state) without creating a class

```js
import React, { useEffect, useState} from 'react';
```

- First, notice the import statement. You can pick the hooks you want to use. 
The two that I'll probably use the most are `useState` and `useEffect`.
  - `useState` is the state functionality (I use this all the time)
  - `useEffect` replaced the `componentDidMount` and `componentDidUpdate` 
  lifecycle functions

```js
// useState Example
import React, { useState } from 'react';

function FirstHook() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div className="hook-1">
        <em>Count: </em>{count} <span className="gap"></span>
        <button onClick={() => setCount(count + 1)}>Add More</button>
      </div>
    </div>
  )
}

export default FirstHook;
```
- Notice the import statement - I am importing React and destructuring the `useState` function
- My component, FirstHook, is just a counting component. It has its own state and records
how many times a button is clicked. It is a **functional component** - NOT class-based
- The first line in my component is another destructuring to use `useState`: `const [count, setCount] = useState(0)`
- The first variable in the array is the value I want to record, `count`. This is what will be incremented
- The second variable is the setter function for state - it allows me to update the value of `count`. You'll
see how I use `setCount` later
- I am setting that equal to `useState(0)` to initialize the value at 0 for `count`
- Notice how I can now use `count` and `setCount` just like if they were variables or methods of a
class-based component.
- In my component, I added a click handler on the button to set the count variable to its current value
plus 1.
- That is a basic example of hooks; you can see the following key areas:
  - importing the `useState` function
  - initializing the variable and setter function (as well as value for the variable)
  - Using both the variable and setter function
- Here is that same component with some additional hooks: a controlled component that shows a list of a
person's favorite items

```js
import React, { useState } from 'react';

function FirstHook() {

  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [favorites, addFavorite] = useState([])

  return (
    <div>
      <h1>Hook Stuff</h1>
      <div className="hook-1">
        <em>Count: </em>{count} <span className="gap"></span>
        <button onClick={() => setCount(count + 1)}>Add More</button>
      </div>
      <div className="hook-2">
        What are your favorite things? 
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyUp={(e) => {
          if(e.keyCode === 13) {
            addFavorite([...favorites, text])
            setText('')
          }
        }}/>
        <button onClick={() => {
          addFavorite([...favorites, text])
          setText('')
        }
        }>Add It</button>
        <ul>{favorites.map((item, i) => {
          return (
            <li onClick={() => {
              addFavorite(favorites.filter((l, j) => i !== j) )
            }} key={`${item}-${i}`}>{item}</li>
          )})}
          </ul>
      </div>

    </div>
  )
}

export default FirstHook;
```
