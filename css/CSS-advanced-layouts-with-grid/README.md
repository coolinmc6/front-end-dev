
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

# 2. Planning for Grid Layouts

# 3. Multi-Column Layout

# 4. Full-Bleed Single Column Layout

# 5. Various Card Layouts

# 6. Accessible Off-Screen Navigation Layouts
