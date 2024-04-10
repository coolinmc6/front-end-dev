

# Next.js Notes

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



