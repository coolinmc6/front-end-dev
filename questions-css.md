<table>
	<thead>
		<tr>
			<th colspan="5" style="text-align: center;"><strong>Subjects of Study</strong></th>
		</tr>
		<tr>
			<td colspan="5">The links below are to the parent GitHub repos of completed courses, resources, my own notes, links to articles, etc. about the topics shown below. They are designed to be my "go-to" place for teaching myself the given subject.</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="https://github.com/coolinmc6/analytics">Analytics</a></td>
			<td><a href="https://github.com/coolinmc6/CS-concepts">Computer Science</a></td>
			<td><a href="https://github.com/coolinmc6/design-ux-ui#product-design--development">Product Development</a></td>
			<td><a href="https://github.com/coolinmc6/design-ux-ui">UX / UI Design</a></td>
			<td><strong><a href="https://github.com/coolinmc6/front-end-dev">Front End Development</a></strong></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md">JavaScript Questions & Glossary</a></td>
		</tr>
		<tr>
		    <td></td>
		    <td></td>
		    <td></td>
		    <td></td>
		    <td><em>CSS Questions & Glossary</em></td>
		</tr>
		<tr>
		    <td></td>
		    <td></td>
		    <td></td>
		    <td></td>
		    <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-networking-web.md">Networking Questions & Glossary</a></td>
		</tr>
		<tr>
		    <td></td>
		    <td></td>
		    <td></td>
		    <td></td>
		    <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-accessibility.md">Accessibility Questions & Glossary</a></td>
		</tr>
		<tr>
		    <td></td>
		    <td></td>
		    <td></td>
		    <td></td>
		    <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-react-redux.md">React & Redux Questions</a></td>
		</tr>    	
	</tbody>
</table>

<a name="top"></a>

# CSS Questions



[[↑] Back to top](#top)

### What is the "Box Model" in CSS? Which CSS properties are a part of it?


[[↑] Back to top](#top)

### What are Sass, Less, and Stylus? Why do people use them? How does something like Compass relate to Sass?

- They are CSS preprocessors. They are an abstraction layer on top of CSS. They are a special syntax/language that compile down into CSS. 
- They make managing CSS easier, with things like variables and mixins to handle vendor prefixes (among other things). They make doing best practices easier, like concatenating and compressing CSS.
- Other questions related to these:
	+ What are the differences between Sass, Less and Stylus?
	+ What is Compass?
	+ What are Bourbon, LESSHat, Nib?


[[↑] Back to top](#top)

### What are sprites and why would use them? How do you go about creating them? What are possible alternatives to sprites?

- Here are a few definitions of "sprites":

> CSS Sprites are a means of combining multiple images into a single image file for use on a website, to help with performance.

> The term "sprites" comes from a technique in computer graphics, most often used in video games. The idea was that the computer could fetch a graphic into memory, and then only display parts of that image at a time, which was faster than having to continually fetch new images. The sprite was the big combined graphic.

- Because a sprite is one large image, you need to know "where" the image you want is located on the sprite. Here's an example of how to use one. In this example, we've combined the three separate images of flags into one image. You then set the same `background-image` on several CSS classes and then set the appropriate position and dimensions of the individual classes. Here is an example of the CSS:

```css
.flags-canada, .flags-mexico, .flags-usa {
  background-image: url('../images/flags.png');
  background-repeat: no-repeat;
}

.flags-canada {
  height: 128px;
  background-position: -5px -5px;
}

.flags-usa {
  height: 135px;
  background-position: -5px -143px;
}

.flags-mexico {
  height: 147px;
  background-position: -5px -288px;
}
```

- There are a number of ways to create sprites, one is a node package you can use via Grunt/Gulp/Node called "sprity" ([https://www.npmjs.com/package/sprity](https://www.npmjs.com/package/sprity)).
	+ It looks you install sprity (`npm i sprity -g`) and then generate sprites and the corresponding stylesheet: `sprity ./output-directory/ ./input-directory/*.png`
- You can also Compass, ImageMagick, Sprite Cow, SpritePad and SpriteMe.
- The smaller overall image is, dimensionally, the better. They recommend organizing images into a grid.
- There are a few alternatives to sprites, each with their own benefits and drawbacks:
	+ *Data URIs* - allow you to embed the image data directly into a stylesheet
		* to learn more: [https://css-tricks.com/data-uris/](https://css-tricks.com/data-uris/)
	+ *Icon Fonts* - Icon fonts are similar to sprites in that the achieve the same thing: combining multiple images into a single request.
	+ *SVGs* - SVG images can be combined into a sprite as well and used as an icon system. It's a slightly different approach though, utilizing the syntax and strengths of SVG. You may need to think about a fallback system though, as SVG doesn't have as deep of browser support as CSS background-image (which essentially has no browser support issues at all).

- [https://css-tricks.com/css-sprites/](https://css-tricks.com/css-sprites/)

[[↑] Back to top](#top)

### What are some accessibility concerns that come up in CSS?

- Make text readable
	+ 12px is just not good enough anymore. Sites were using 15px - 18px for awhile but now the ideal range is around 18-20px.
		* Recommended article: [Your Body Text is Too Small](https://blog.marvelapp.com/body-text-small/)
	+ Ideal line height is 1.5 despite default line height in browsers being 1.2
- Align text left or right (don't justify)
	+ Despite the attractiveness (for some) of `text-align: justify`, it's considered bad practice.
	+ The uneven spaces between words can harm readability
	+ *CM* - I swore that I read somewhere that said the opposite. I will defer to this article for now but I had this feeling that justify made the site more attractive.
- Define paragraph width: max 65 characters
	+ Designers should strive for line widths of 45-85 characters with 65 characters being the sweet spot
	+ You can use the "ch unit": `p { max-width: 65ch; }`
- Use content in speudo elements cautiously

- **Sources**
	- [https://developer.mozilla.org/en-US/docs/Learn/Accessibility/CSS_and_JavaScript](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/CSS_and_JavaScript)
	- [https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939](https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939)

[[↑] Back to top](#top)


### Explain to me what's going on in this CSS selector:

```css
[role=navigation] > ul a:not([href^=mailto]) {

}
```

- **Condensed Answer:** This selects anchor links that are not email links that are decedents of an unordered list that is the direct child of any element with a role attribute of 'navigation'.
- **Bulleted Answer**
	+ (1) The first selector is `[role=navigation]` but it doesn't specifically pick any particular tags. So it is *ANY* element with a role attribute of "navigation"
	+ (2) The `>` means that the `ul` is a direct child. So right now, I am looking at all `ul` elements that are a direct child of *ANY* element that has a role attribute of "navgation"
	+ (3) The `ul a` means that the anchor element is a direct descendant of the `ul` - that means any anchor inside the `ul`
	+ (4) The `a:not()` means we will want anchor elements that are NOT whatever is inside the parens
	+ (5) `[href^=mailto]` I don't entirely understand but I know that `mailto` is for email addresses so this means that the anchor tags can't be email links
	+ Putting everything together, we know that this selector applies to (3) anchor elements that are (4/5) NOT email links but are (3) direct descendants of any unordered list that is a (2) direct child of (1) ANY element with a role attribute of "navigation"

[[↑] Back to top](#top)

### What is cross-browser testing?

> Cross browser testing is the practice of making sure that the web sites and web apps you create work across an acceptable number of web browsers.

- Developers need to make sure that not does their project work but that it works for all users, no matter their browser, device, or any assistive tools they're using.
- This doesn't mean necessarily achieving 100% perfectly workign across all browsers but the goal is to get "an acceptable number of web browsers"
- **Why do cross-browser issues occur?**
	+ sometimes browsers have bugs but most work to follow today's standards
	+ some browsers have different levels of support for technology features
	+ some devices have constraints that cause a website to run slowly or display badly

[[↑] Back to top](#top)

### Explain cross-browser testing.

- MDN recommends testing your website on virtual machines

### What tools do you use for cross-browser testing?



- Sources:
	- [MDN: Cross Browser Testing](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing)

[[↑] Back to top](#top)

### What is responsive design all about?

- It's about making websites work wherever the web is. Different devices with different sizes and different capabilities. Responsive design is about taking one code base and making it work for all of them. Part of that is media queries and different visuals. Part of that is different resources (e.g. different JavaScript to handle touch vs click or different images to accommodate the screen).

[[↑] Back to top](#top)


### What's the difference between Flexbox and Grid?


- Source: [https://css-tricks.com/quick-whats-the-difference-between-flexbox-and-grid/](https://css-tricks.com/quick-whats-the-difference-between-flexbox-and-grid/)

[[↑] Back to top](#top)

### To Grid or to Flex?


- Source: [https://css-irl.info/to-grid-or-to-flex/](https://css-irl.info/to-grid-or-to-flex/)

[[↑] Back to top](#top)

### What is SVG? What are the benefits of SVG?

- SVG stands for Scalable Vector Graphics and is used to define *vector-based graphics* for the Web.
- SVG is a W3C recommendation
- SVG defines the graphics in XML format
- Here are some of the advantages of using SVG of other formats like `.jpg` or `.gif`:
	+ SVG images can be created and edited with any text editor
	+ SVG images can be searched, indexed, scripted, and compressed
	+ SVG images are scalable
	+ SVG images can be printed with high quality at any resolution
	+ SVG images are zoomable
	+ SVG graphics do NOT lose any quality if they are zoomed or resized
	+ SVG is an open standard
	+ SVG files are pure XML
- You can create SVG images with any text editor but it's often more convenient to create SVG images with a drawing program like [Inkscape](https://inkscape.org/)

[[↑] Back to top](#top)

### Can you give an example of an @media property other than screen?

- Yes, there four types of `@media` properties (including *screen*):
	+ `all` - for all media type devices
	+ `print` - for printers
	+ `speech` - for screenreaders that "reads" the page out loud
	+ `screen` - for computer screens, tablets, smart-phones etc.

```css
@media print {
  body {
    color: black;
  }
}
```



[[↑] Back to top](#top)

### Describe what a “reset” CSS file does and how it’s useful. Are you familiar with normalize.css? Do you understand how they differ?


[[↑] Back to top](#top)

### What is Tweening?

1. It is the short form for in-betweening.
2. It is the process of generating intermediate frames between two images.
3. It gives the impression that the first image has smoothly evolved into the second one.
4. It is an important method used in all types of animations.
5. In CSS3, Transforms(matrix,translate,rotate,scale etc) module can be used to achieve tweening.

[[↑] Back to top](#top)

### What is the use of CSS sprites?

1. A web page with large number of images takes a longer time to load. This is because each image separately sends out a http request.
2. The concept of CSS sprite helps in reducing this loading time for a web page by combining various small images into one image. This reduces the numbers of http request and hence the loading time.

[[↑] Back to top](#top)



[[↑] Back to top](#top)

### What is contextual selector?

- Contextual selector specifies a specific occurrence of an element. It is a combination of many selectors that are separated by white spaces. In this only the element that matches the specified element will be used not all the elements.

```css
td p code {
	color: #000000;
}
```



[[↑] Back to top](#top)

### What is the parent-child selector?

- Parent-child selector represents the direct relationship between parent element and child element. It is created by using two or more (~) tilde separated selectors. 

```css
body ~ p {
	background-color: red;
	color: #ff00ff;
}
```



[[↑] Back to top](#top)

### Explain CSS Animations. 

> The `animation` property in CSS can be used to animate many other CSS properties such as color, background-color, height, or width. Each animation needs to be defined with the `@keyframes` at-rule which is then called with the animation property.

- Here is a simple example:

```css
@keyframes pulse {
  0%, 100% {
    background-color: yellow;
  }
  50% {
    background-color: red;
  }
}
/* assign to element */
.box {
  height: 100px;
  width: 100px;
  animation: pulse 4s infinite linear;
}
```

- The above code shows the animation short-hand. Here the animation sub-properties:
	+ `animation-name`: declares the name of the `@keyframes` at-rule to manipulate.
	+ `animation-duration`: the length of time it takes for an animation to complete one cycle.
	+ `animation-timing`-function: establishes preset acceleration curves such as ease or linear.
	+ `animation-delay`: the time between the element being loaded and the start of the animation sequence.
	+ `animation-direction`: sets the direction of the animation after the cycle. Its default resets on each cycle.
	+ `animation-iteration`-count: the number of times the animation should be performed.
	+ `animation-fill-mode`: sets which values are applied before/after the animation. For example, you can set the last state of the animation to remain on screen, or you can set it to switch back to before when the animation began.
	+ `animation-play-state`: pause/play the animation.
- Here are those sub-properties broken out:

```css
@keyframes stretch {
  /* declare animation actions here */
}

.element {
  animation-name: stretch;
  animation-duration: 1.5s; 
  animation-timing-function: ease-out; 
  animation-delay: 0s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
  animation-play-state: running; 
}

/*
  is the same as:
*/

.element {
  animation: 
    stretch 		/* animation-name */
    1.5s		/* animation-duration */
    ease-out 		/* animation-timing-function */
    0s 			/* animation-delay */
    alternate 		/* animation-direction */
    infinite 		/* animation-iteraction-count */
    none 		/* animation-fill-mode */
    running; 		/* animation-play-state */
}
```

- The table below shows the sub-property and possible values for each:

|Sub Property|Potential Values|
|:---:|:---|
|animation-timing-function|ease, ease-out, ease-in, ease-in-out, linear, cubic-bezier(x1, y1, x2, y2) (e.g. cubic-bezier(0.5, 0.2, 0.3, 1.0))|
|animation-duration|Xs or Xms|
|animation-delay|Xs or Xms|
|animation-iteration-count|X|
|animation-fill-mode|forwards, backwards, both, none|
|animation-direction|normal, alternate|
|animation-play-state|paused, running, running|

- You should consider performance but there are certain combinations that can be animated safely:
	+ `transform: translate()`
	+ `transform: scale()`
	+ `transform: rotate()`
	+ `opacity`

- [https://css-tricks.com/almanac/properties/a/animation/](https://css-tricks.com/almanac/properties/a/animation/)

### Describe floats and how they work.



[[↑] Back to top](#top)

### What are the different ways to visually hide content (and make it available only for screen readers)?



[[↑] Back to top](#top)

### Explain how a browser determines what elements match a CSS selector.



[[↑] Back to top](#top)

### Describe pseudo-elements and discuss what they are used for.



[[↑] Back to top](#top)

### What's the difference between a relative, fixed, absolute and statically positioned element?


[[↑] Back to top](#top)

### How does Flexbox work?


[[↑] Back to top](#top)

### How does CSS Grid work?




- Sources & Notes:
	+ [CSS Advanced Layouts with Grid (course notes)](https://github.com/coolinmc6/front-end-dev/tree/master/css/CSS-advanced-layouts-with-grid)

[[↑] Back to top](#top)

### How does Z index function?


- [https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/css-questions.md#describe-z-index-and-how-stacking-context-is-formed](https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/css-questions.md#describe-z-index-and-how-stacking-context-is-formed)


[[↑] Back to top](#top)


### What are some CSS Frameworks?

1. Bootstrap
2. Materialize CSS
3. Bulma
4. Semantic UI

[[↑] Back to top](#top)

### What is CSS Architecture? What are BEM, OOCSS, SMACSS? How are they similar/different?

- BEM
- OOCSS
- SMACSS

### What is graceful degradation?



[[↑] Back to top](#top)

### What is progressive enhancement?



[[↑] Back to top](#top)

### Why is `@import` only at the top? 



[[↑] Back to top](#top)

### What's the difference between "resetting" and "normalizing" CSS? Which would you choose, and why?

- **Resetting** - Resetting is meant to strip all default browser styling on elements. For e.g. margins, paddings, font-sizes of all elements are reset to be the same. You will have to redeclare styling for common typographic elements.
- **Normalizing** - Normalizing preserves useful default styles rather than "unstyling" everything. It also corrects bugs for common browser dependencies. Here is a full list of bullets for Normalize.css
	+ **Normalize.css preserves useful defaults rather than "unstyling" everything.** For example, elements like sup or sub "just work" after including normalize.css (and are actually made more robust) whereas they are visually indistinguishable from normal text after including reset.css. So, normalize.css does not impose a visual starting point (homogeny) upon you. This may not be to everyone's taste. The best thing to do is experiment with both and see which gels with your preferences.
	+ **Normalize.css corrects some common bugs that are out of scope for reset.css.** It has a wider scope than reset.css, and also provides bug fixes for common problems like: display settings for HTML5 elements, the lack of font inheritance by form elements, correcting font-size rendering for pre, SVG overflow in IE9, and the button styling bug in iOS.
	+ **Normalize.css doesn't clutter your dev tools.** A common irritation when using reset.css is the large inheritance chain that is displayed in browser CSS debugging tools. This is not such an issue with normalize.css because of the targeted stylings.
	+ **Normalize.css is more modular.** The project is broken down into relatively independent sections, making it easy for you to potentially remove sections (like the form normalizations) if you know they will never be needed by your website.
	+ **Normalize.css has better documentation.** The normalize.css code is documented inline as well as more comprehensively in the GitHub Wiki. This means you can find out what each line of code is doing, why it was included, what the differences are between browsers, and more easily run your own tests. The project aims to help educate people on how browsers render elements by default, and make it easier for them to be involved in submitting improvements.
- Here is [Normalize.css](https://github.com/necolas/normalize.css)
- 


[[↑] Back to top](#top)

### What is CSS?

- CSS stands for Cascading Style Sheets
- CSS is a standard for applying style to HTML elements. This styling includes margins, positioning, fonts, colors, and so forth. The styling can apply to the complete document or be granular and apply to a specific element. 
- Theoretically, the use of CSS promotes the separation of content and design, allowing the designer to focus on how a Web application will look while the developer(s) concentrate on the structure and functionality.
- The main part of CSS is a rule. A rule consists of a selector (i.e., what will be styled) followed by a declaration (i.e., the style to be applied) that is broken into one or more properties and associated styles. 

```css

/* h1 is the selector, font-size: 24px is the declaration (pretty much everything in the curly braces)*/
h1 {
	font-size: 24px;
}

.red {
	font-weight: bold;
	color: red;
}
```


[[↑] Back to top](#top)

### What are the different variations of CSS?

- The variations for CSS are:
	+ CSS 1
	+ CSS 2
	+ CSS 2.1
	+ CSS 3
	+ CSS 4


## Sources

- [CSS Tricks: Interview Questions](https://css-tricks.com/interview-questions-css/)
- [https://www.careerride.com/Interview-Questions-CSS.aspx](https://www.careerride.com/Interview-Questions-CSS.aspx)
- [github/yangshun: CSS Questions](https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/css-questions.md)