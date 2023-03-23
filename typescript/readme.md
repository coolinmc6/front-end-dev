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
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/javascript/">JavaScript Concepts</a></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><em>TypeScript</em></td>
        </tr>
    </tbody>
</table>

# TypeScript

**Links:**

- [https://www.youtube.com/watch?v=gp5H0Vw39yw](https://www.youtube.com/watch?v=gp5H0Vw39yw)

## Notes

### Interface vs Type

- Both `interface` and `type` can be used to define custom types, but they are different.
There's a table below that tries to sum up the differences.


<table>
  <thead>
    <tr>
      <th>Interface</th>
      <th>Type</th>
      <th>Use / Concept / Functionality</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>:white_check_mark:</td>
      <td>:x:</td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>


###

In TypeScript, the angle brackets `<` `>` are used for type parameterization and are called "angle bracket syntax" or "type parameter syntax". They are also sometimes referred to as "generic syntax" or "generic type syntax".

Type parameterization allows you to define generic types that can work with different data types, providing type safety while keeping code flexible and reusable.

The angle bracket syntax is commonly used in TypeScript when defining generic types for collections such as arrays, sets, and maps, as well as for functions that can operate on multiple data types. For example, you might use angle bracket syntax when defining an array of strings: 

```ts
const myArray: Array<string> = ['hello', 'world'];`
```