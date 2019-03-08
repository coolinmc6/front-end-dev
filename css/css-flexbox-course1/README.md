<a name="top"></a>
# Advanced Responsive Layouts with CSS Flexbox

- CSS Flexible Boxes => find MDN link
- Autoprefixer
- Modernizer

## Chapter 2. Flexbox-Powered Menus

### Using Flexbox to control single-level menu layout

- First, we covered a couple cool basic items. We started with a mobile-friendly layout where each item is a block-level item (100% width of containe). By simply adding `display: flex` to their parent container, they fit neatly next to each other.
- So flex goes on the parent element
- Next, we looked at `justify-content` and there are a couple cool properties to know. Take a look at the CSS below:

```css
/* Styles for Single Level Menu */
@media screen and (min-width: 30em) {
    
    .single-nav ul {
        display: flex;
        justify-content: flex-start;
        justify-content: flex-end;
        justify-content: space-around;
        flex-wrap: wrap;
    }

}
```

- `flex-start` is the start of the flexbox. That is the default so it goes left-to-right 
- `flex-end` is the end of the flexbox (right-to-left)
- `space-around` is cool - the items are spaced equally inside the container
- If you want the elements themselves to grow to take up more space, use the following:

```css
@media screen and (min-width: 30em) {
    
    /* CODE */

    .single-nav li {
        flex: 1 0 auto;
        text-align: center;
    }
}
```
- Now, regardless of `justify-content`, the elements will grow to fit the width of the container
- `flex: 1 0 auto;` = grow by a factor of 1, shrink by a factor of 0, and basis width to auto.
    - if there's available space, grow to fill the space; if not, wrap around (as opposed to shrinking)

[[↑] Back to top](#top)

### Using Flexbox to control advanced menus

- To understand this section completely, you have to look at the HTML. This is how it is laid out: `nav.advanced-nav` > `ul` > `li` > `a` > (`div.icon` + `div.button-text`)
- We end up putting `display: flex` on **most** of the elements (`ul`, `li`, `a`), but we don't necessarily know that at the outset
- `flex-wrap` allows the flex items to wrap around the row as opposed to being hidden from view when you manually resize the window
- We have used the `flex` property a lot and I'm only two videos in. Again, this is what you are saying when you specify `flex: 0 0 1.5em;` - grow by 0, shrink by 0, and never fall below 1.5em in width.
- the `flex` property is short-hand for three properties:
    - `flex-grow`
    - `flex-shrink`
    - `flex-basis`
    - ...and according to [CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), **it is recommended that you use the shorthand property**

[[↑] Back to top](#top)

### Using Flexbox to control multilevel menus with dropdowns




[[↑] Back to top](#top)

### Creating a social media menu



[[↑] Back to top](#top)

### Using Flexbox to control multiple menus



## Chapter 3. Responsive Card Layouts

- The code below is pretty neat as it creates that typical card layout that you like with standard heights of each element in a row. Flexbox does that for you automatically.

```css
.cards {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}

.card {
    flex: 0 1 calc(33% - 1em);
    /* width: calc(33% - 1em); */
}
```

- First, we set the parent container to `display: flex` and wrap the content with `flex-wrap: wrap`. The `justify-content: space-between;` ensures that the cards are not right up against each other.
- Next, we size the cards. Our styling above dictated that each card take up the full width. Using the short-hand that I learned, we know that: `flex: 0 1 calc(33% - 1em);` means that the content flex-shrinks by a factor 0 (**read:** no shrinking), it flex-grows by a factor of 1, and its flex-basis is 1/3 of the width minus 1em (I guess like a minimum width)
    - notice the width is put in there as a fallback that achieves essentially the same thing


[[↑] Back to top](#top)

## Chapter 4. Holy Grail Layout




[[↑] Back to top](#top)

## Chapter 5. Handling Control to the User

[[↑] Back to top](#top)

## Chapter 6. Putting It All Together


[[↑] Back to top](#top)