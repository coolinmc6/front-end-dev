
# CSS: Advanced Layouts with Grid


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

![Grid item placement](https://github.com/coolinmc6/front-end-dev/blob/master/assets/css-grid-placement.png)

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


# 4. Full-Bleed Single Column Layout




# 5. Various Card Layouts




# 6. Accessible Off-Screen Navigation Layouts



