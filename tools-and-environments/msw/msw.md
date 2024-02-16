<a name="top"></a>

# MSW

# Table of Contents

# Links
- [MSW Docs - Getting Started](https://mswjs.io/docs/getting-started)
- [MSW Docs - v1](https://v1.mswjs.io/docs/)

# Setup Story

**Introduction**

I setup MSW in a personal repo and it took much longer than I would've liked but mostly because of issues related
to MSW 2.X. It looks like a lot of people online are struggling to add it to their projects. As a quick note
on my experience starting with MSW 2.0, I was getting a bunch of errors related to native Node functions that
MSW tried to fix with a polyfill. I tried a bunch of different setups and it still wasn't working. I ended up
just deciding to use MSW 1.X and then after that, it was much easier to make progress. Here is a quick summary
of setting up MSW 1.X.

**Installation and Directory Setup**

Installing the package is pretty easy, nothing exciting there. The next step is to create your mocks directory
which I decided to put into `/test/mocks`. So this is what my directory structure looks like after setup:

```plaintext
|--src
|  |--test
|     |--mocks
|        |--handlers
|           |--user-handlers.ts
|           |--index.ts
|        |--server.ts
|        |--browser.ts
```

**MSW Basics**

I'll explain why I did what I did later but there are some initial things to know about the setup. First,
BOTH `server.ts` and `browser.ts` use the handlers. I was thinking that they needed to be different but
what the words `server` and `browser` are referring to are where you'll be using it. If you're using it
in Jest, you'll use the `server.ts` file. If you're using it in the browser, you'll use the `browser.ts`.
With the `browser.ts` file, I'll need to setup a service worker but I didn't do that yet.

**Server Setup**

Even though the next listed step is to setup a mock for an endpoint, because I had already started part
of the process, the real next step (IMO) is to setup the server. It's pretty easy, you just follow the
server setup from the [docs](https://v1.mswjs.io/docs/getting-started/integrate/node) and then you need
to add it to your Jest setup.

**Endpoint Setup and Error Fixing**

After doing that, I can create the mock for the endpoint. This is where I struggled a bit but not
because of anything to actually do with MSW. The issue is that I had already written a test using
Jest to mock the response. I had to remove the mocking of the response and essentially allow MSW
to handle the server response. MSW may need to have better error handling but what I found my issue
to be was that in my base request file (I'm using Axios), on each request, I look for whether the
user has an auth token. The `getAuthToken()` function wasn't returning anything so I needed to mock that
which I now do in my `jest.setup.js` file.

**Using Endpoint**

After finding the issue, creating the mock was easy and was just a matter of emulating the docs. When
compared to Jest, I was just used to mocking the response for a particular endpoint for whatever test
case I'm testing. For MSW, you're creating a mock server so the mock in your list of handlers is how
you will handle the base request for that endpoint. So for my `/sign-up` endpoint, in my `user-handlers.ts`
file, I am handling a successful sign-up. If I want to test a failed sign-up, I need to import the
server and rest modules from msw and then mock them. Here is how I mocked it:

```ts
server.use(
  // eslint-disable-next-line 
  rest.post(USER_APIS.SIGN_UP, (req, res, ctx) => {
    return res(ctx.status(400), ctx.json({ message: 'Invalid email' }))
  })
)
```

So I'm importing `server` from my `server.ts` file and then essentially replacing the current handler
for that endpoint with the one above. I added that code right inside that particular test block.

**A Few Takeaways**

- Even though it is called "Mock Service Worker", given the primary purpose for which I'm using it, it
is best to just think of it as a mock test server. You are setting up the endpoints and responses for
your various test cases. Obviously, it does work in the browser hence "service worker". But for my
own understanding, don't be thrown off by the "service worker" part.
- Setup for 1.X was easy now that I've done it. I think I could do it again and really hit the ground
running.
- I think a good frame to have is that your mock server (or mock service worker) is going to hold the
"good" and working endpoints. All endpoints in that file should probably be working (unless of course
an endpoint should be throwing an error).
- Your `handlers` variable is just a massive array of endpoints and their responses. That's all it is.
When you look at the `server.ts` and `browser.ts` function, they are both just spreading the contents
of that variable into the `setupServer` or `setupWorker` function.
- Your server responses in the test files can be overwritten by using the `rest.use()` function. You
then essentially recreate the response but how you want it.
- From my own experience, error handling may not be perfect so examine your app for possible error
points like, in my case, the base Axios request object.
- I recommend adding an `onUnhandledRequest` function to your server setup. This will help you catch
those requests that aren't being mocked. Here is the example that I used and it goes right in your
`jest.setup.js` file:

```js
beforeAll(() => server.listen({
  onUnhandledRequest(req) {
    console.error(
      'Found an unhandled %s request to %s',
      req.method,
      req.url.href,
    )
  },
}))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

**Next Steps**
- continue writing out tests for personal project - see if there are any other issues or tricks
that I encounter with the `rest` API.
- Play with `graphql` API and make sure you get how that works.

[[↑] Back to top](#top)