[Home][home] | [Jest Testing][jest-testing]

[home]: https://github.com/coolinmc6/front-end-dev
[jest-testing]: https://github.com/coolinmc6/front-end-dev/tree/master/jest

# Jest Testing

## Jest Testing: Course Notes

<table>
  <thead>
    <tr>
      <th>Section</th>
      <th>Notes</th>
      <th>Status</th>
    </tr>
  <thead>
  <tbody>
    <tr>
      <td><a href="https://frontendmasters.com/courses/testing-practices-principles/">JavaScript Testing Practices and Principles</a></td>
      <td>TBD</td>
      <td><strong>Complete</strong></td>
    </tr>
    Next: https://frontendmasters.com/courses/testing-react/
  </tbody>
</table>

## Snippets

- Here is an example in Vue of using `it.each` to test multiple cases:

```js
describe('ribbonColor', () => {
  it.each([
    ['elite', 'red'],
    ['preferred', 'blue'],
    ['advantage', 'yellow'],
  ])('if status is %s returns %s', (status, expected) => {
    wrapper.setProps({ myChoiceStatus: status });

    expect(wrapper.vm.ribbonVariant).toBe(expected);
  });
});
```