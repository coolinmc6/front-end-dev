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
			<td><strong><em><a href="https://github.com/coolinmc6/front-end-dev">Front End Development</a></em></strong></td>
		</tr>
	</tbody>
</table>

<a name="top"></a>

# Front End Trends

- [2020](#front-end-dev-in-2020)



### Front End Dev in 2020

#### CM's List: 2020

*Note:* these are the top items that I'd like to learn. The items are not based entirely on the front-end developer
predictions but also gaps in my professional knowledge, broader industry trends, and my own personal interests.

**#1. JavaScript and React Testing**

- I want to understand how to setup testing on a project, write effective tests, understand what it means to
achieve "100% coverage". These following libraries / testing frameworks appear to be the most popular
and should have staying power:
  - Jest
  - react-testing-library
  - Cypress
  - Enzyme

**#2. React: Fundamentals and Advanced Features**

- I need to get a better grasp of some of React generally. I haven't kept up with it as much as I'd like.
Concepts like Hooks, Context API, Higher Order Components (pattern), etc.

**#3. Python**

- Python is a popular language used for data science, machine learning, etc; I'd like to get better at it. I've signed up for a number
of online classes so finishing at least 1-2 and coming away with the fundamentals is key.
  - [Courses in Progress](https://github.com/coolinmc6/CS-concepts#targeted-computer-science-courses)
  - [Python Cheat Sheet](https://github.com/coolinmc6/CS-concepts/blob/master/cheat-sheets/python.md)

**#4. React Design Patterns**

- I'd like to learn 10 basic React patterns (HOC being one of them). I've seen some good lists somewhere but I
want to take notes on at least 10; just start the list and if while working I see a goood pattern, I can add 
to it.

**#5. Web Components**

- This seems to be a trend that I should learn more about. I just want to understand why people like it, not
necessarily use it everywhere.

**#6. TypeScript**

- I started a tutorial but stopped because of other career items. I want to learn this and should try
to use this in my next React project.

**#7. Web Fundamentals & Future Questions**

- There is a lot that I don't know about many of these subjects. I need to start going deep on certain
items and on the others that I don't have time to dig into, at least ask the question (record it somewhere)
so that I have the basic frame to come back to. Questions on HTTP, CORS, front-end, CSS, the DOM, whatever - 
write them down in the appropriate repo. This includes future technology like WASM, micro front-end, etc.

[[↑] Back to top](#top)

#### Article Notes: 2020

**[The 2020 Web Developer Roadmap](https://levelup.gitconnected.com/the-2020-web-developer-roadmap-76503ddfb327)**

- *Note:* This isn't really a list of trends but rather things that a web developer in 2020 should learn. Given that I haven't
learned a lot of what's in here, I'm taking away the top items I should focus on for 2020.
- Web Fundamentals
	- articulate difference between HTTP and HTTPS
	- What is HTTP/2? What is HTTP/3?
- Web Security: I want a refresher / notes with links to these areas; I must learn these once, the right away, forever
	- HTTPS
	- CORS
	- Content Security Policy
	- OWASP Security Risks
- Testing Apps
	- **Note:** this is key. I've been meaning to learn testing for awhile but just haven't dug in; 2020 is the year!
	- Jest
	- react-testing-library
	- Cypress
	- Enzyme

[[↑] Back to top](#top)

**[11 Must-Know FrontEnd Trends for 2020](https://blog.bitsrc.io/11-must-know-frontend-trends-for-2020-cea8a629b08)**

- Micro frontends
	- [https://martinfowler.com/articles/micro-frontends.html#InANutshell](https://martinfowler.com/articles/micro-frontends.html#InANutshell)
	- [Bit](https://bit.dev/)
- Atomic Design
- Typescript
- Web Components
	- [7 Tools for Developing Web Components in 2019](https://blog.bitsrc.io/7-tools-for-developing-web-components-in-2019-1d5b7360654d)
	- [9 Web Components UI Libraries You Should Know in 2019](https://blog.bitsrc.io/9-web-component-ui-libraries-you-should-know-in-2019-9d4476c3f103)
- State Management: Redux vs. Context API vs Mobx
- ES Modules
	- [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
- Web Assembly (WASM)

[[↑] Back to top](#top)

**[5 Front-End Predictions and Trends for 2020](https://dev.to/blarzhernandez/5-front-end-predictions-and-trends-for-2020-327o)**

- Micro frontends (an extension of micro-services)
	- [Bit](https://bit.dev/)
- React will continue to dominate
- Web Components
- ES Modules and Dynamic Imports
- JavaScript will continue to dominate
	- Composing software
	- functional programming
	- Promise.allSettled, optional chaining for JavaScript, Object.fromEntries()

[[↑] Back to top](#top)

**[7 FrontEnd JavaScript Trends and Tools You Should Know for 2020](https://hackernoon.com/7-frontend-javascript-trends-and-tools-you-should-know-for-2020-fb1476e41083)**

- Framework Agnostic Web Components
- Future of Framework Wars
	- prediction: the framework that wins is the one that can best play in the native JS ecosytem (read: web components)
- Component isolation, reuse and composition
	- sounds like micro-frontend. This article mentions [Bit](https://bit.dev/), like the previous two articles
- ES Modules and CDN
- State Management at the Component-Level
	- another mention of Context API and Hooks in React
- Styling Components as Composition
	- [5 Ways to Style React Components in 2019](https://blog.bitsrc.io/5-ways-to-style-react-components-in-2019-30f1ccc2b5b)
- GraphQL API clients for data-driven apps
- Component-based design tools
	- Atomic Design; here's a cool article: [Atomic Design With React And Bit: Simplify a Complex UI](https://blog.bitsrc.io/simplify-complex-ui-by-implementing-the-atomic-design-in-react-with-bit-f4ad116ec8db)

[[↑] Back to top](#top)

**[The Latest Trends in Web App Development for 2020: What to Expect from the Industry](https://themindstudios.com/blog/web-app-development-trends/)**

*Back-end Trends*

- HTTP/3
	- CM: what are the differences between HTTP/1, HTTP/2, and HTTP/3? Give me dates, definitions, how it affects developers, and how it affects users.
- GraphQL
	- I've done some work in GraphQL but haven't really had to use it. Not a high priority for me right now.
- Bots and AI
- Nest.js
	- Nest.js is a Node.js framework that allows web developers to build scalable server-side apps.

*Front-end Trends*

- Web Assembly (WASM)
	- Languages currently supported by WebAssembly are C/C++, Elixir, Rust, Python, Go, C#/.Net, and Java
	- It’s also now supported by all major browsers by default, which makes having it under your programmer’s belt a great thing.
- Progressive Web Apps

*JavaScript Trends*

- GatsbyJS
	- Gatsby is a static site generator (SSG). I started learning it a bit ago and I'm not sure I understand its utility yet
	- the article says that it's perfect for generating ecommerce sites
- Single Page Applications (SPAs)
- Vue3
- Svelte.js
	- Unlike Vue, Svelte is a component compiler that runs during build time. This makes it possible to 
	load only the components necessary for displaying your app. You don’t use a virtual DOM when you work with Svelte
- TypeScript
	- it is gaining popularity, is not new, and considered the "future" of JavaScript

*CSS Frameworks*

- Houdini CSS
	- Houdini is a collection of APIs that provide developers access to the CSS Object Model. What this means is
	that if you need styles that aren’t yet available in CSS, there’s no need to overwrite the CSS with JavaScript
- Bulma
	- Bulma is a free open-source CSS framework that offers a range of community-created themes with as few styles as possible
- Tailwind
	- utilizes Atomic CSS
- Motion UI Design
	- In a nutshell, Motion UI means adding action to your website’s pages to help your visitors understand 
	the meaning behind an element — for example, by simply rolling out an explanation when the cursor is hovering over it.

*Other Trends*

- Data security and privacy
- Load speed

[[↑] Back to top](#top)


**Sources:**

- [The 2020 Web Developer Roadmap](https://levelup.gitconnected.com/the-2020-web-developer-roadmap-76503ddfb327)
	- [Developer Roadmaps](https://roadmap.sh/) - great resource and something I should revisit
- [11 Must-Know FrontEnd Trends for 2020](https://blog.bitsrc.io/11-must-know-frontend-trends-for-2020-cea8a629b08)
- [5 Front-End Predictions and Trends for 2020](https://dev.to/blarzhernandez/5-front-end-predictions-and-trends-for-2020-327o)
- [7 FrontEnd JavaScript Trends and Tools You Should Know for 2020](https://hackernoon.com/7-frontend-javascript-trends-and-tools-you-should-know-for-2020-fb1476e41083)
- [The Latest Trends in Web App Development for 2020: What to Expect from the Industry](https://themindstudios.com/blog/web-app-development-trends/)

[[↑] Back to top](#top)
