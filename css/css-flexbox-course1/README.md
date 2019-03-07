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

[[↑] Back to top](#top)

## Chapter 4. Holy Grail Layout

[[↑] Back to top](#top)

## Chapter 5. Handling Control to the User

[[↑] Back to top](#top)

## Chapter 6. Putting It All Together


[[↑] Back to top](#top)