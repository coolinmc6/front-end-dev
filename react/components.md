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
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/react/">React Concepts</a></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><em>Components</em></td>
        </tr>
    </tbody>
</table>

# Components

## Functional Components

- Functional components are just functions. But there are a number of ways that you can write a functional
component.

### Version #1: ES5 and Props Object

```js
import React from 'react';

function Button(props) {
  return (
    <button className={props.className} onClick={props.handleClick}>{props.text}</button>
  )
}

export default Button;
```

### Version #2: ES6 and Props Object

- This is just like the above version with some ES6 syntax...but only so far.

```js
const Button = (props) => {
  return (
    <button className={props.className} onClick={props.handleClick}>{props.text}</button>
  )
}

export default Button;
```

### Version #3: ES6 and In-Function Destructured Props

- ES6 syntax with the variables you need destructured. It's one step further than Version #2 but could be improved upon

```js
const Button = (props) => {
  const { handleClick, className, text } = props;
  return (
    <button className={className} onClick={handleClick}>{text}</button>
  )
}

export default Button;
```

### Version #4: ES6 and Destructured Props

- Like Version #3 but we are structuring the variables and handler **inside** the argument parens

```js
const Button = ({ handleClick, className, text }) => (
  <button className={className} onClick={handleClick}>{text}</button>
)

export default Button;
```

### Version #5: ES6 and Export Default Anonymous Function

- This is a super slimmed down version where you don't need to actually name the function.
This works when you have one function you are exporting and you can *name* the component in the 
file that you are importing it.

```js
export default ({ handleClick, className, text }) => (
  <button className={className} onClick={handleClick}>{text}</button>
)
```

## Class-Based Components


