
# CSS Grid

- Flexbox is one-dimensional, CSS Grids is two-dimensional

```css
.wrapper {
	display: grid;
	grid-template-columns: 70% 30%;
}
```

- with the above styling, it creates two columns: one 70% and the other 30%
- It alternates divs so if there are only two, there will be only those two divs. If there are more, the 70-30 patterns continues. So div #1 is 70%, div #2 is 30%, div #3 is 70%, div #4 is 30%, and that continues all the way down