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
	</tbody>
</table>

<a name="top"></a>

# CSS Questions



[[↑] Back to top](#top)

### What is the "Box Model" in CSS? Which CSS properties are a part of it?


[[↑] Back to top](#top)

### What are Sass, Less, and Stylus? Why do people use them? How does something like Compass relate to Sass?

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

### What tools do you use for cross-browser testing?



- Sources:
	- [MDN: Cross Browser Testing](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing)

[[↑] Back to top](#top)

### What is responsive design all about?


[[↑] Back to top](#top)


### What's the difference between Flexbox and Grid?


- Source: [https://css-tricks.com/quick-whats-the-difference-between-flexbox-and-grid/](https://css-tricks.com/quick-whats-the-difference-between-flexbox-and-grid/)

[[↑] Back to top](#top)

### To Grid or to Flex?


- Source: [https://css-irl.info/to-grid-or-to-flex/](https://css-irl.info/to-grid-or-to-flex/)

[[↑] Back to top](#top)

### What are the benefits of SVG?


[[↑] Back to top](#top)

### Have you ever created a print stylesheet for a website?



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




[[↑] Back to top](#top)

### How does Z index function?


- [https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/css-questions.md#describe-z-index-and-how-stacking-context-is-formed](https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/css-questions.md#describe-z-index-and-how-stacking-context-is-formed)


[[↑] Back to top](#top)

### What is graceful degradation?



[[↑] Back to top](#top)

### What is progressive enhancement?



[[↑] Back to top](#top)

### Why is `@import` only at the top? 



[[↑] Back to top](#top)

### What's the difference between "resetting" and "normalizing" CSS? Which would you choose, and why?


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