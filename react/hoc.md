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
            <td><em>HOCs</em></td>
        </tr>
    </tbody>
</table>

# Higher Order Components (HOCs)

- Higher Order Component definition from React docs:

> A higher-order component (HOC) is an advanced technique in React for reusing component logic. 
> HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.

- HOC's often have some descriptor in their name. For example, `withAuth()` suggests
that the component passed will receive the `withAuth()` props and, presumably, require
authentication for users to view.

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

### Authentication Higher Order Component

- In this example, we are going to look at how you could (theoretically) wrap a protected page
or some page that requires authorization/authentication. To do that we

```js
// withAuthentication.js
import React, { Component } from 'react';

const withAuthentication = (WrappedComponent) => {
  class HOC extends Component {
    constructor(props) {
      super(props);
    }
    
    componentDidMount() {
      if(!this.props.authenticated) {
        console.log("not logged in - you would be moved out")
      }
    }
    componentDidUpdate() {
      if(!this.props.authenticated) {
        console.log("not logged in - you would be moved out")
      }
    }
    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }

  return HOC;
}

export default withAuthentication;
```
```js
// ProtectedPage.js
import React from 'react';

import withAuthentication from './withAuthentication';

const ProtectedPage = (props) => {
  const { authenticated, setAuth } = props;

  return (
    <div>
      <h1>Protected Page</h1>
      {authenticated ? (
        <div>
          
          <button onClick={() => setAuth(false)}>Logout</button>
          <br/>
          <h2>Protected Stuff</h2>
        </div>
      ) : (
        <div>
          You are not logged in.<br/>
          <button onClick={() => setAuth(true)}>Login</button>
        </div>
      )}
    </div>
  )  
}

const WrappedComponent = withAuthentication(ProtectedPage)

export default WrappedComponent;
```

- **Authentication HOC**
  - In this example, there is an outer functional component called `withAuthentication` that takes
  a component that you want to have wrapped. In the parentheses, it is called `WrappedComponent`.
  - Inside the functional component, we create a new class-based component called `HOC`.
  - There are two lifecycle methods, `componentDidMount()` and `componentDidUpdate()`. In both
  of these, we look at the `authenticated` property of the component. Presumably, if `false`, 
  the user would be kicked off the page
  - In the `render` method, we are simply return the Wrapped Component with the props spread.
  - Lastly, we return the `HOC` component
- **ProtectedPage**
  - Notice that after importing the HOC, it is a pretty standard functional component
  - Near the bottom of the page, I create my `WrappedComponent`. Here is the code:
  `const WrappedComponent = withAuthentication(ProtectedPage)`. So I'm now wrapping my page in
  the authentication HOC.
- In my main page, I can then just use my ProtectedPage however I want. `<ProtectedPage setAuth={setAuth} authenticated={authenticated}/>`


