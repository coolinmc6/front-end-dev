

### Great FrontEnd

#### Promise.all

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
- [Promise.resolve](https://github.com/coolinmc6/front-end-dev/blob/master/javascript/readme.md#why-would-you-ever-need-to-use-promiseresolve)