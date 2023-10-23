

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