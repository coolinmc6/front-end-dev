
# CSS: Advanced Layouts with Grid

# Sources to Check Out

- [Grid by Example](https://gridbyexample.com/)
- [MDN: CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
- [CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)
- Some CodePens:
	+ [CSS Grid Basics - 001](https://codepen.io/coolinmc6/pen/NJrQeN)
		* shows some basic grid-template-areas.
	+ [CSS Grid Basics - 002](https://codepen.io/coolinmc6/pen/MxjgWO)
		* basic grid, same design, but with `grid-row` and `grid-column` as opposed to `grid-template-areas`
	+ [CSS Grid Basics - 003](https://codepen.io/coolinmc6/pen/VRKZPZ)
		* same as #002 but with grid-gap.

# 1. CSS Grid: Core Principles

## Terminology

- Grid Container - the element containing a grid, defined by setting `display: grid;`
- Grid Item - the element that is a direct descendant of the grid container
	+ children of these descendants are not affected by the grid
- Grid Line - Grids automatically come with 4 lines: top, bottom, left, right
	+ Left to Right - 1 - X
	+ Top to Bottom - 1 - X
- Grid Cell - the intersection between a grid row and grid column (like a table cell)
- Grid Track - space between two ore more grid lines: Row or Column
- Grid Area - the rectangualr area between several cells
- Grip Gap - the line between the items in the grid. You can create an empty space between grid tracks called a gutter

## Grid Lines and Units

- `grid-template-columns: 50% 50%;` draws gridlines. It takes a list of length values denoting the distance between each line
- you can the `fr` or Fraction Unit - it takes the total available space and divides it by the spaced available
- `minmax()` function defines a size ranger greater than or equal min and less than max
- `repeat()`

## Manual Grid Item Placement
Grid item placement - https://github.com/coolinmc6/front-end-dev/blob/master/assets/css-grid-placement.png - fix asset path

- notice how the styling shows that the item will occupy the columns between lines 2 and 4 and the rows between 2 and 3.
- Once you move one item out of the way, the other items in the grid move up
- Implicit lines - the browser will add rows/columns if you need/specify them
- `span` keyword - used to define how many grid tracks an element should span
	+ `grid-column: 2/2 span;` => starting at line 2, span 2 columns
	+ `grid-column: 2 span;` => span 2 columns (starting at line 1 implied)

## Named Lines

```css
/* Original */
.site {
	display: grid;
	grid-template-columns: 2fr repeat(2, 1fr);
	grid-template-rows: auto 1fr 3fr;
}


/* With Named Lines */
.site {
	display: grid;
	grid-template-columns: [begin-edge] 2fr [halfway] 1fr [quarter] 1fr [end-edge];
	grid-template-rows: auto 1fr 3fr;
}
```

- You aren't naming the *areas*, you are naming the *lines*. Notice how it starts before `2fr`. This naming scheme has a `begin-edge` and `end-edge` with line 2 being called `halfway` and line 3 being called `quarter`
	+ **Note**: the first column (1/2) is twice as big. There isn't a hidden column and that first column just takes up two columns - that first column is just wider. So it starts at line 1 (0%), then line 2 (50%), the line 3 (75%), and line 4 (100%). Each column doesn't have to be equal width

## Grid Areas

- `grid-template-areas` - it is a pplied to a grid container
- allows you to name an area
- Grid areas are pretty powerful and definitely a feature I should play around with. Here is some code showing responsive design with CSS Grid:

```css
.site {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto 1fr 3fr;
	grid-template-areas:
		"title title"
		"main masthead"
		"main sidebar"
		"footer footer";
}

@media screen and (min-width: 600px) {
	.site {
		grid-template-columns: 2fr 1fr 1fr;
		grid-template-areas:
			"title title title"
			"main masthead masthead"
			"main sidebar footer";
	}
}

.masthead {
	grid-area: masthead;
}

.page-title {
	grid-area: title;
}

.main-content {
	grid-area: main;
}

.sidebar {
	grid-area: sidebar;
}

.footer-content {
	grid-area: footer;
}
```

- After this lecture, I took a shot at the "Holy Grail" using CSS Grid. It makes sense and was easy enough to implement. Here is a link: [CodePen: Holy Grail - CSS Grid](https://codepen.io/coolinmc6/full/VRYmPd)
- I like this pattern:

```css
.grid {
	display: grid;
	grid-template-columns: 150px 1fr 150px;
	grid-template-rows: 100px 1fr 100px;
}
```

- the particular heights and widths of the top/bottom and left/right don't really matter. What's really cool is that in those lines of code, I have the basics of the holy grail. I can have a top header and bottom footer of height around 100px AND left/right side-areas of width 150px. That middle area is the content. 

## Grid Gap

- Grid gap can put space between your elements
- `grid-gap` goes on your grid container item

```css
.site {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto 1fr 3fr;
	grid-template-areas:
		"title title"
		"main masthead"
		"main sidebar"
		"footer footer";
	grid-gap: 1em;  /* 1em gap for both columns and rows  */
	grid-column-gap: 1em; /*  1em gap for columns (left and right) */
	grid-row-gap: 1em; /* 1em gap for rows (top and bottom)  */
	grid-gap: 1em 2em; /*  1em gap for rows (top and bottom) 2em gap for columns (left & right) */
}
```


# 2. Planning for Grid Layouts

## CSS Grid Means Rethinking Web Layouts

- CSS grid brings outside-in, two-dimensional layouts to the web browser
- Grid Items
	+ direct first-level descendants of the grid container
	+ second-level descendants need their own grid
	+ subgrids are not supported
	+ resist the urge to "flatten" your HTML elements
- True Grids
	+ The "masonry" layout (think Pinterest) is the opposite of a grid
	+ CSS grid is a true grid with straight lines
- Content Stacking
	+ Any grid item can be placed anywhere on the ground
	+ the includes placing them on top of each other
- Content Order
	+ Any grid item can be placed anywhere on the grid
	+ Manual placement is not impacted by the source order
	+ Make sure visible content order matches the source content order to preserve meaningful communication
- Pure CSS Grids
	+ grids are defined using pure CSS
	+ Grids can be nested inside media queries
	+ Grids can be appliced conditionally
	+ Grids can be added, changed, or removed without affecting the HTML

## Start Layouts with Pen and Paper

- start with small screens and then move up
- Draw gridlines to see where the grid changes from small to large
- Break grid apart to identify where nesting is needed
- Repeat the process for each content model/view
- Resist the urge to make grid frameworks or classic x-column grids

## A New Approach to Backward Compatibility

- Reponsive design has taught us a website does not need to look the same across all viewports and browsers
- Start using CSS Grid today - it **WILL** be the standard, I must learn it now
- Start with the mobile sizing and then progressively enhance experience with CSS Grid for browsers with CSS Grid support
- In 2-3 years any fallback will be irrelevant

# 3. Multi-Column Layout

## Check for Grid Support

```css
@supports (grid-area: auto) {
	
}
```

- Like a media query

## Add a Third Columns for Wider Viewports

- Using CSS Grid can be tricky because the size of your content affects the height of individual rows which means that for your content to adhere to the grid, seemingly random white spaces can pop up
- In video 6 of this section, we see how we must make some tweaks to remove the whitespace.

```css
.masthead {
	grid-column: 1/2;
	grid-row: 1/3;
}
```

- the code above telling the masthead to occupy the cells between column lines 1-2 and between rows 1-2. This is really just a 1x2 cell block
- We added a third row (4th line) to our grid by doing the following:

```css
@media screen and (min-width: 65em) {

	.site {
		grid-template-columns: 15em auto 15em;
	}
	
	.sidebar {
		grid-column: 3/4;
		grid-row: 1/3;
	}

	.colophon {
		grid-column: 1/4;
	}

}
```

- First, we updated our grid container `site` to add the third row of width `15em`
- Next, we updated our sidebar to now occupy that third column (`3/4` meaning between lines 3 and 4). However, given its place in our HTML, it wasn't sitting where we wanted it so we specified that we wanted it to occupy the rows between lines 1-3 (effectively, two rows).
- Lastly, we updated our footer so that it spans the entire width of our grid, not just the first two columns

## Justify the Grid

- A cool technique if we wanted to center the grid:

```css
.site {
	grid-template-columns: 15em minmax(auto, 30em) 15em;
	justify-content: center;
}
```

- What's also cool is the `minmax()` feature to set a min of `auto` and max of `30em`

## Use White Space to Perform Magic

- the last lecture showed a cool CSS Grid trick. Here is a quick explanation but I probably won't use it:

```css
.sidebar {
	display: inherit;
	grid-template-columns: inherit;
	grid-column: 1/4;
	grid-row: 2/3;
	height: 0;
}

.twin:last-of-type {
	grid-column: 3/4;
}
```

- As a reminder, we are trying to essentially split our sidebar content; have one `twin` element on the left and the other on the right. Then, as a part of that, we want our main content to flow up as if there's nothing there. Again, I wouldn't probably use this that frequently but it's kinda cool
- First, we make our sidebar a grid by inheriting the grid structure from the parent `site` element
- Next, we inherit the grid-template-columns
- We set `grid-column: 1/4` so that it occupies the entire width of the grid
- We fix the "height" of the sidebar so that it only occupies one cell between row lines 2 and 3
- Then, we "move" our `twin` element to the other side by setting it to `grid-column: 3/4`, thus occupying the far right cell between column lines 3 and 4
- Lastly, we set height to 0 so that the content below it flows up. The sidebar is showing on both the left and right because of CSS overflow rules.
- You *can* place content below each one if they're in the grid cell below it
- There's a lot going on here...I probably wouldn't use it but it's worth having seen it

# 4. Full-Bleed Single Column Layout

- The first video describes the "challenge": Full-Bleed Single Column Layout
- I didn't know / think that this is difficult but the solution we're going to build is one of several grids stacked on top of each other. Each grid will have the same grid-rules so despite having different content, they will all follow the same general grid and then individual changes can be for each grid that are necessary for their specific content

## 4. Check for Grid Support

```css
@supports( grid-area: auto) {

}
```

- Not to belabor the point but we are doing this, again, to check for grid support. I think this hammers home a good message in general when styling my websites going forward. Start with a mobile layout that works. The mobile layout, though not perfect, IS good enough. Then add CSS grid - most browsers support it so you'll be fine 
- Also, we check for `grid-area: auto` because some older browsers support an older spec for CSS grid that is different. So it might say "yes I support that feature" and not be able to implement the CSS grid.

 -Website Grid Sketch - https://github.com/coolinmc6/front-end-dev/blob/master/assets/website-grid-sketch.png - fix asset path

- the image above shows how you could sketch out what you want to achieve with a particular layout. Notice how different sections have different constraints. The third and fourth row content is constrained to the middle two columns while rows 2, 5, and 6 are "full-bleed". They are still "on" the grid except they occupy columns 1 - 4 or would be between lines 1 and 5

## Create Columns and Position Items

```css
.main-area > *, .colophon {
	display: grid;
	grid-template-columns: 1fr repeat(2, minmax(auto, 25em)) 1fr;
}

.splash-content, .more-content, .buckets ul {
	grid-column: 2/4;
}

.twin, .colophon aside {
	grid-column: span 2;
}

```

- First, I like the format for the `grid-template-columns`. He uses a `1fr` to represent the outside columns and then the middle two columns are the same and are either `auto` or `25em`. Why `25em`? We set the max-width for the content to be `50em` for the mobile layout - to get that "full-bleed" look, we make our middle two columns with most of our content to be that width and then allow everything else to bleed out
- Next, we set our specific items that we want to occupy those middle columns by setting `grid-column: 2/4` (between lines 2 and 4)
- Last, we set our bleed content, each with two items, to `span 2`. Notice the **selectors** we are picking. We are picking the `twins` parent `<section>` or the `colophon` parent `<footer>` element, we are picking the elements *inside* them. We are telling each of them to take up two columns. So now, both of the `twin` elements and both of the `<aside>`s in the `colophon` have that "full-bleed" look

## 4. Make the Grid Responsive

```css
@supports (grid-area: auto) {
	
	@media screen and (min-width: 600px) {
		.site {
			max-width: none;
		}

		.main-area > *,
		.colophon {
			display: grid;
			grid-template-columns: 1fr repeat(2, minmax(auto, 25em)) 1fr;
		}

		.splash-content,
		.more-content,
		.buckets ul {
			grid-column: 2/4;
		}

		.twin,
		.colophon aside {
			grid-column: span 2;
		}
	}
	

}
```

- This is the completed code. I should definitely come back to this as I think I'll be seeing a lot of this. Here are the steps:
	+ Style your "mobile-first" design, that is your default
		* if it's an old browser or doesn't support grid, you'll be fine if they get this
	+ Check for grid `@supports (grid-area: auto){}` and then make your grid styles
	+ Make your grid responsive
		* This exercise really highlighted that there are certain designs that really **cannot work** with two items next to each other. That is why the mobile layout as your default is so necessary AND you can almost always assume that your grid will probably only apply to screens larger than 600px or whatever your limit is.
- **REMEMBER THIS**

# 5. Various Card Layouts

- We first turn each card into a grid:

```css
.card a {
	display: grid;
	grid-template-columns: 6em auto;
	grid-template-rows: 1fr 1fr;
}
```

- Next, we place our items in each card (date, header, meta div) into their respective positions in the grid. We want the date vertically and horizontally centered in the left column and the header and meta div in the right column. Here is how we made those changes:

```css
.card a {
	display: grid;
	grid-template-columns: 6em auto;
	grid-template-rows: 1fr 1fr;
	padding: 0;
	text-align: left;
}

.time {
	grid-column: 1;
	grid-row: 1/3;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.card h2 {
	grid-column: 2;
	grid-row: 1;

}

.meta {
	grid-column: 2;
	grid-row: 2;
}
```

- The placement part of the elements made sense but I wanted to dig into the use of flexbox on the `.time` element. But first, it helps to understand what is in the `.time` div:

```html
<time class="time" datetime="2017-07-24T09:00">
	<div class="month">Jul</div>
	<div class="date">24</div>
</time>
```

- It is a parent `<time>` element with two `<div>`'s inside, a month and day.
- After placing `.time` where we wanted it on the grid, it wasn't centered vertically or horizontally. So we used flexbox to do that:
	- First, by adding `display: flex`, we are enabling flexbox. This puts the two items (month and day) next to each other; not at all what we want.
	- Next, we added `flex-direction: column;` which vertically stacked them. *I need to look this up later to really understand how it works*.
	- Now that we have the vertical placement we want, just needed to vertically and horizontally center them. We do vertical alignment with `justify-content: center;` and horizontal alignment with `align-items: center;`
- We also use flexbox to finish up the work to do a few more things:
	- To make the card take up the full vertical height, we add `display: flex:` to the `.card` element and give the `<a>` element `width: 100%`
	- To make the `<h2>` element "stick" to the bottom of the grid cell, we add `align-self: flex-end` to it

## 5.7 - Change Appearance of Cards with Flex

- One thing he did that was interesting was the changing of the image size to fix the incompatible size. Instead of doing some CSS magic, he cropped the image

## 5.10 - Magazine-style Grid

- Really attractive layout - I should definitely come back to this
- The coolest take away is just how easily you can make an item take up more space. For any `.double` elements, we simply set `grid-row: span 3` and it now takes up 3 rows (vertical space). After tweaking the CSS for the image, we made that really attractive look similar to Twitter moments.

# 6. Accessible Off-Screen Navigation Layouts

## 6.3 - Set-up the Main Grid

- It was a good reminder of how the `grid-template-areas` property works. Remember, you set the layout of the grid with the name of the area and then you pick the divs that get those areas:

```css
.site {
	display: grid;
	grid-template-areas: 
		"header"
		"main"
		"sidebar"
		"footer";
}

.masthead {
	grid-area: header;
}

.main-area {
	grid-area: main;
}

.sidebar {
	grid-area: sidebar;
}

.colophon {
	grid-area: footer;
}


@media screen and (min-width: 76em) {
	.site {
		grid-template-columns: auto 15em;
		grid-template-areas: 
			"header header"
			"main sidebar"
			"footer footer"
		;
	}
}
```

- notice how for the larger screen, we want the `header` to take up both columns, then `main` and `sidebar` each have a column, and then `footer` has the entire width




