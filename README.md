# Front End Development

This repo has been converted to a Docusaurus site to make it easier to actually use. Much of this readme will be
dedicated to actually maintaining this repo with links and content moved to the docs folder.

This is where I'm serving it: [Front End Dev](https://coolinmc6.github.io/front-end-dev/)

## Getting Started

**Development**
```sh
npm run start
```

**Deployment**
All pushes to master runs the deployment to GH Pages. They recommend building it locally and then serving it
to ensure that it will work.

```sh
# build it
npm run build

# serve the built site
npm run serve
```

## Next Steps
- Move the most used items into the appropriate folders
- Figure out (and document) how to use images
- clean-up old docs - there are a bunch that are unused

## Updating Old Documents to Docusaurus Docs

**Docusaurus Needs Markdown**
- A lot of the old files used some html to create tables or links to other content in the repo.
I don't need to do that anymore so if there's a failure when moving old docs into the `docs` folder,
it's probably something like that.

**Create __category__.json files**
- These files allow you to give user friendly titles for your directories. Here is the basic format:

```json
{
  "label": "Label in Sidebar",
  "position": 3, // where it shows up
  "link": {
    "type": "generated-index",
    "description": "Description"
  }
}
```
- To position a markdown file, you can use this:

```
---
sidebar_position: 1
---
```


Notes and resources for front end development (with some backend and other stuff too).

- https://github.com/coolinmc6/analytics
- https://github.com/coolinmc6/CS-concepts
- https://github.com/coolinmc6/design-ux-ui#product-design--development
- https://github.com/coolinmc6/design-ux-ui
- https://github.com/coolinmc6/front-end-dev
- https://github.com/coolinmc6/front-end-dev/blob/master/data-visualization.md

**I'm in the middle of cleaning up this repo so expect some broken links.**

## Languages and Frameworks

**Links may be broken**

[<img height="65" style="max-height: 65px;" src="./assets/logos/javascript-logo3.png"/>](https://github.com/coolinmc6/front-end-dev/tree/master/core-frontend/javascript)[<img height="65" style="max-height: 65px;" src="./assets/logos/nodejs-logo.png" />](https://github.com/coolinmc6/front-end-dev/tree/master/other-languages/nodejs)[<img height="65" style="max-height: 65px;" src="./assets/logos/python-logo2.jpeg" />](https://github.com/coolinmc6/front-end-dev/tree/master/other-languages/python)&nbsp;&nbsp;&nbsp;[<img height="65" style="max-height: 65px;" src="./assets/logos/react-logo2.png" />](https://github.com/coolinmc6/front-end-dev/tree/master/libraries-and-frameworks/react)[<img height="65" style="max-height: 65px;" src="./assets/logos/vue-logo.png" />](https://github.com/coolinmc6/front-end-dev/tree/master/libraries-and-frameworks/vue)&nbsp;&nbsp;&nbsp;[<img height="65" style="max-height: 65px;" src="./assets/logos/typescript-logo.png" />](https://github.com/coolinmc6/front-end-dev/tree/master/core-frontend/typescript)

## Web Technology

[<img height="65" style="max-height: 65px;" src="./assets/logos/css3-logo.png"  />](https://github.com/coolinmc6/front-end-dev/tree/master/css)[<img height="65" style="max-height: 65px; padding-left: 15px" src="./assets/logos/netlify-logo3.png" />](https://github.com/coolinmc6/front-end-dev/tree/master/tools-and-environments/netlify)

## Testing

[<img height="65" style="max-height: 65px;" src="./assets/logos/jest-logo2.png" />](https://github.com/coolinmc6/front-end-dev/tree/master/jest)&nbsp;&nbsp;&nbsp;[<img height="65" style="max-height: 65px; padding-left: 15px" src="./assets/logos/playwright-logo.png" />](https://github.com/coolinmc6/front-end-dev/tree/master/playwright)

## Tools and Libraries

[<img height="65" style="max-height: 65px;" src="./assets/logos/git-logo.png" />](https://github.com/coolinmc6/front-end-dev/tree/master/git)[<img height="65" style="max-height: 65px" src="./assets/logos/markdown-logo.png" />](https://github.com/coolinmc6/front-end-dev/tree/master/markdown)&nbsp;&nbsp;&nbsp;[<img height="65" style="max-height: 65px; padding-left: 15px" src="./assets/logos/vscode-logo.jpeg" />](https://github.com/coolinmc6/front-end-dev/tree/master/vscode)[<img height="65" style="max-height: 65px;" src="./assets/logos/graphql-logo.png" />](https://github.com/coolinmc6/front-end-dev/tree/master/graphql)[<img height="65" style="max-height: 65px; padding-left: 15px" src="./assets/logos/storybook-logo.png" />](https://github.com/coolinmc6/front-end-dev/tree/master/storybook)