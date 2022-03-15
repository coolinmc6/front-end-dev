[Back](https://github.com/coolinmc6/front-end-dev)

# Regex

## JavaScript Regex

- A quick and easy way to test a string against a regular expression is with the `test()` method.
- The `test()` method returns a boolean value.
- Here is the format:

```js
// Simple
const string = `The fat cat ran down the street. It was searching for a mouse to eat.`
console.log(/e/g.test(string)) // true

// RegExp object
const regex01 = new RegExp(/e/, 'g');
console.log(regex01.test(string))
```

## Learn Regular Expressions In 20 Minutes
**Video:** https://www.youtube.com/watch?v=rhzKDrUiJVk
- The string used: `The fat cat ran down the street. It was searching for a mouse to eat.`
- The basic format of a regex is:
  - `/pattern/flags`
  - `/` is the start of the regex
  - `/` is the end of the regex
  - the pattern is the part that will be matched
  - the flags are the options that will be used when matching like `g` for global, `i` for case insensitive, etc.
    - the flags are optional
- Flags:
  - `g`: global - is like "match all" whereas without this flag, it will only match the first match
  - `i`: ignore case - will ignore the case of the characters
- The special characters in regex is where it gets more powerful.
- `+`: one or more
  - `/e+/` will match `e` one or more times: so `e` will match with th**e** and str**ee**t. Without the `+`,
  the two e's in "street" would be two separate matches
- `?`: zero or one
  - it makes the character before it "optional". so `/ea?` will match with "the", "street", and "mouse" because
  they have an "e" but it will also match with "eat"
- `*`: zero or more
  - like the `?` operator, but it will match zero or more times. So `/ea*` will match with "searching" but would
  also match with "eaa" or "eaaaa".
  - `/re*` matches with anything that has an "r" but also will match "st**ree**t"
- `.`: any character
  - `/.at/` will match "fat", "cat", and "eat"
- `\w`: word character
  - letters
- `\W`: non-word character
  - `\W` will match with anything that is not a letter
- `\s`: whitespace character
  - `\s` will match with spaces, tabs, newlines, etc.
- `\S`: non-whitespace character
- `\w{4,5}`: word character with a length of 4 or 5
  - you'll notice that a long word like "searching" matches on "searc" and "hing" (on the Regex site)
  - If you wanted only 4-5 character words, I think you'd need to add more specifiers
- `/[fc]at/`: match with "fat" or "cat"
  - `/[fc]at/` will match with "fat" and "cat" but not "eat"
- `()`: capture grouping
- `^`: beginning of string
- `$`: end of string
