
# CSS Grid

- Flexbox is one-dimensional, CSS Grids is two-dimensional\

![Flexbox vs. CSS Grids](https://github.com/coolinmc6/front-end-dev/blob/master/assets/flexbox-vs-css-grids.png)

```css
.wrapper {
	display: grid;
	grid-template-columns: 70% 30%;
}
```

- with the above styling, it creates two columns: one 70% and the other 30%
- It alternates divs so if there are only two, there will be only those two divs. If there are more, the 70-30 patterns continues. So div #1 is 70%, div #2 is 30%, div #3 is 70%, div #4 is 30%, and that continues all the way down
- Notice how the large div with only the word "Hey" is the same height as the text-heavy div to its right. The word "Hey" is in the third div so it gets 70% of the width

![CSS Grid Example 1](https://github.com/coolinmc6/front-end-dev/blob/master/assets/css-grid-example1.png)