---
title: Next.js Home
---

# Next.js Notes

### Site Rendering
**Source:** https://vercel.com/blog/how-to-choose-the-best-rendering-strategy-for-your-app

- I am most interested in understanding the difference between the various strategies. In my head, 
I always think about it as there being two types: Client-Side Rendering (CSR) and Server-Side Rendering
(SSR). And while I've known about or heard about some of the other terms like Static Site Generating (SSG)
and Incremental Static Regeneration (ISR), this article defines them more thoroughly.
- I'm going to discuss this in the way that makes the most sense to me.
- **Client Side Rendering**
  - the best definition is just to think about what gets sent and what doesn't. What gets sent in this
  case is a basic html document and the necessary JavaScript files and then the client builds it / paints
  the screen.
  - the main tradeoff is a slower load because of that initial JavaScript bundle needing to download
  before you fetch the data
  - and SEO isn't great either
- **Server Side Rendering**
  - Again, starting with what gets sent and doesn't get sent, in SSR, the server is generating the full
  HTML for the page.
  - So that initial "fetch" is made already - we are getting the user's information (or whatever else they want)
  and building the page and then sending it to them
  - Consumes more server resources (as expected) but is better for SEO and data load time than client-side fetches
- I understand the difference between these two rendering strategies. These two strategies are better for personalized
information, like a Dashboard or user info page. Keep that in mind
- **Static Site Generation**
  - When I first learned about this, I was just so used to building sites that had personalized information, I almost
  couldn't understand when I'd need this. But there are a ton of sites that have pages that do not change a lot. And
  that is what SSG is great for.
  - SSG prerenders the pages **at build time**, NOT when a user makes a request, so the resulting static HTML files
  can be cached somewhere and then served super quickly. You are essentially a CDN at this point - delivering content
  you've already built.
  - SSG gives you the fastest possible page loads, excellent SEO performance, reduced server load, lower infrastructure
  costs.
  - The obvious drawback is that content updates require a new build. And this doesn't really work with personalized content
  that changes dynamically. Another drawback is if you have a ton of pages, the build time could be quite long.
- **Icremental Static Regeneration**
  - ISR is trying to combine the benefits of SSG & SSR. Static content is updated incrementally either on a predfined
  schedule or some sort of trigger. The user requests a page and if its the first client request, the page is generated
  and cached so that future requests don't need to request that same info. This requires a cache invalidation strategy
  and not all frameworks can handle it - NextJs does do ISR.
  - This is a good balance between server load issues of SSR and the dynamic content issues (staleness, requiring builds
  to update) of SSG.
  - It is more complex to implement and manage.
  - A great example of a site that might need this would be an ecommerce site with potentially millions of different product
  pages.
- **Partial Prerendering**
  - I'm going to skip this for now. This is a Vercel / NextJS thing - I'll wait until I need to learn more about it.

### Script tag in Next.js:

I had some trouble getting a script tag to work in Next.js. Despite numerous examples using the curling braces
inside the script tag, I found the `dangerouslySetInnerHTML` method as a way to try it. That also didn't work
UNTIL I added the `strategy` prop to the `<Script />`. This shouldn't matter but it did...

```tsx
<Script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'GA 4 ID');
      console.log('Google Analytics')
    `
  }} 
  id="google-analytics"
  strategy="afterInteractive"
/>
```

### Hydration Errors

Some good stuff here: https://medium.com/@eric.burel/how-to-get-rid-of-window-is-not-defined-and-hydration-mismatch-errors-in-next-js-567cc51b4a17

### Handling Rewrites for API Calls

For some of my projects, I like to use an express server to make API calls. To avoid CORS and handle
the API calls, I use a rewrite in the `next.config.js` file:

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/:path*",
      },
    ]
  },
}
```
In my web app, I can make the calls to `http://localhost:3000/api/save-data` and in my express
server, I can receive it on `/save-data`.

```mjs
app.post('/save-data', (req, res) => {
  console.log('Saving data...')
  res.send('Data saved!')
})
```

### Hidden Pages

To hide a page on a public site, on NextJs, one way is to just use a redirect. You can
do this in the `next.config.js` file:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: '/hidden-page',
        destination: '/',
        permanent: false,
      },
    ]
  },
}
```

I also like this pattern:

```js
/** @type {import('next').NextConfig} */
const nextConfig = () => {
  const redirects = () => {
    const allRedirects = [];

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
      allRedirects.push({
        source: '/dev-tools',
        destination: '/',
        permanent: true,
      });
    }
    return allRedirects;
  }
  return {
    redirects,
  };
}

module.exports = nextConfig
```



