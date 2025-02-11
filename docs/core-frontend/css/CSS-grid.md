# CSS Grid

### Introduction

- Flexbox is one-dimensional, CSS Grids is two-dimensional
  Flexbox vs. CSS Grids - https://github.com/coolinmc6/front-end-dev/blob/master/assets/flexbox-vs-css-grids.png - fix asset path

```css
.wrapper {
  display: grid;
  grid-template-columns: 70% 30%;
}
```

- with the above styling, it creates two columns: one 70% and the other 30%
- It alternates divs so if there are only two, there will be only those two divs. If there are more, the 70-30 patterns continues. So div #1 is 70%, div #2 is 30%, div #3 is 70%, div #4 is 30%, and that continues all the way down
- Notice how the large div with only the word "Hey" is the same height as the text-heavy div to its right. The word "Hey" is in the third div so it gets 70% of the width
  CSS Grid Example 1 - https://github.com/coolinmc6/front-end-dev/blob/master/assets/css-grid-example1.png - fix asset path

```css
.wrapper {
  display: grid;
  /*grid-template-columns: 1fr 2fr 1fr;*/
  grid-gap: 1rem;
  /*grid-template-columns:repeat(3, 1fr);*/
  grid-template-columns: repeat(3, 1fr);
  /*grid-auto-rows: 120px;*/
  grid-auto-rows: minmax(100px, auto);
}
```

- You can set the width of the columns using the `fr` syntax instead of setting percentages
  - `grid-template-columns: 70% 30%;` was okay without margins and padding but if you added a gap using `grid-gap: 1rem;` it made the width of the entire row go beyond 100%
  - Using `grid-template-columns: 1fr 1fr 1fr` allows you to create 3 equally spaced columns
  - You can also do `grid-template-columns:repeat(3, 1fr);` to achieve the same effect
  - If you don't want equally-spaced columns, you can set each width as you want: `grid-template-columns: 1fr 2fr 1fr;`
- As I said above, you can add a gap using `grid-gap: 1rem;`
- You can set the height with `grid-auto-rows: 120px;`
  - if there is a chance that you'll have differently-sized items, `grid-auto-rows:minmax(100px, auto);` allows you to set a minimum height and maximum height

### Links

- [CSS Grid Examples (Multiple)](https://codepen.io/coolinmc6/pen/qBENKMK)
