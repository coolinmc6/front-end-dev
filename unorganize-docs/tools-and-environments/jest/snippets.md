[Home][home] | [topic directory][topic-directory]

[home]: https://github.com/coolinmc6/front-end-dev
[topic-directory]: https://github.com/coolinmc6/front-end-dev/tree/master/jest

<a id="top"></a>

# Snippets

## Unit Testing Functions

- A big part of testing is understanding how to actually use the function. One
tricky part about testing functions, even simple ones, built on-top of 
libraries that you don't understand is that you need to read these docs and
learn.
- Here is an example with a basic Yup schema and then how I tested it:

```ts
import { object, string } from 'yup';

const emailSchema = object().shape({
  email: string()
    .trim()
    .email('Email must be a valid format.')
    .required(`You must have an email to register.`),
});

export default emailSchema;
```
- There are a few things I did of note:
  - first, the `validate()` function is async so I had to use `await` to get the result
  - second, I had to use `abortEarly: false` to get all the errors back. See [here](https://www.npmjs.com/package/yup#validationerrorerrors-string--arraystring-value-any-path-string) for more info
  - third, I used `err: any` to satisfy TypeScript
  - fourth, I don't usually use try-catching in my tests but I had to here to get the errors back. I'm not sure if there is a better way to do this.
  - fifth, if needed, just console.log the response to see how it works. For the valid email example, I just did `console.log(validationResult)` to see what it returned

```ts
import emailSchema from './emailSchema';

describe('emailSchema', () => {
  it('should require an email', async () => {
    const badInput = { email: '' };
    try {
      await emailSchema.validate(badInput, { abortEarly: false });
    } catch (err: any) {
      expect(err.errors.length).toBe(1);
    }
  });

  it('should require a valid email', async () => {
    const badInput = { email: 'invalidemail' };
    try {
      await emailSchema.validate(badInput, { abortEarly: false });
    } catch (err: any) {
      expect(err.errors).toEqual(['Email must be a valid format.']);
    }
  });

  it('should allow valid email formats', async () => {
    const goodInput = { email: 'valid@example.com' };
    const validationResult = await emailSchema.validate(goodInput, { abortEarly: false });
    expect(validationResult).toEqual(goodInput);
  });
});
```

[[↑] Back to top](#top)