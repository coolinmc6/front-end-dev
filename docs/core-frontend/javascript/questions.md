# Questions

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

### Promise.all

https://www.greatfrontend.com/questions/javascript/promise-all

```js
/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(array) {
  if (!array.length) return []
  let resolvedCount = 0;
    const resolvedPromises = [];
    
    return new Promise((resolve, reject) => {
      array.map((promise, index) => {
        Promise.resolve(promise).then(value => {
          resolvedCount++
          resolvedPromises[index] = value

          if (resolvedCount === array.length) {
            return resolve(resolvedPromises)
          }
        })
        .catch(reject);
      })
    })
}
```