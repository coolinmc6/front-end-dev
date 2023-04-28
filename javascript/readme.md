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
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/css/">CSS Concepts</a></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/html/">HTML Concepts</a></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><em>JavaScript Concepts</em></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/react/">React Concepts</a></td>
        </tr>
    </tbody>
</table>

# JavaScript

- [ECMAScript History](https://github.com/coolinmc6/front-end-dev/blob/master/javascript/ecmascript-history.md)
- [Snippets](https://github.com/coolinmc6/front-end-dev/blob/master/javascript/snippets.js) - cool snippets
- [Zustand](https://github.com/coolinmc6/front-end-dev/blob/master/javascript/zustand.md)


## Promises

### Why would you ever need to use Promise.resolve()?

`Promise.resolve()` is a static method that returns a Promise object that is resolved with a given value.
Here are a few scenarios where Promise.resolve() might be useful:

1. When you need to return a Promise object that is immediately resolved with a certain value:

```js
function getUserData(userId) {
  if (cache.has(userId)) {
    return Promise.resolve(cache.get(userId)); // return resolved Promise
  } else {
    return fetchUserData(userId); // return Promise from a network request
  }
}
```
- in this scenario, we as a developer know that we're getting back a Promise. This allows us to not have
to write separate logic

2. When you want to create a Promise object from a non-promise value:

```js
function doSomething() {
  const value = someSyncOperation();
  return Promise.resolve(value); // return a Promise resolved with the value
}
```

3. When you want to create a Promise object from a thenable object (i.e. an object with a `.then()` method):

```js
function doSomething() {
  const thenable = {
    then(resolve, reject) {
      // some async operation here
      setTimeout(() => {
        resolve('done');
      }, 1000);
    }
  };
  return Promise.resolve(thenable); // return a Promise resolved with the thenable
}
```
