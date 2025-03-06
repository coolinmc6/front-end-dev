---
title: Apollo Client for Web Deep Dive
---

# Apollo Client for Web: In-Depth Exploration of Key Concepts

Here are 7 key concepts about Apollo Client (the GraphQL client for web)
with simple explanations and code examples.

## Cache Normalization and Storage


Apollo Client uses a **normalized cache** (by default, an `InMemoryCache`) to store GraphQL data. Normalization means objects are stored by unique identifiers, so data isn't duplicated. Each object is flattened in the cache and referenced by an ID, which helps Apollo update and share data efficiently. By default, Apollo uses an object’s `__typename` and `id` (or `_id`) fields to form a unique cache key (e.g., an object of type `Comment` with `id: 5` is stored under key `Comment:5`). If your schema uses a different primary key field, you can configure the cache’s `typePolicies` to specify which field(s) identify objects.

**Cache structure example**: Suppose we query a book and its author. Apollo will normalize and store the data by type and ID:


```jsx
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Book: { keyFields: ["isbn"] }  // use ISBN as the unique identifier for Book
    }
  })
});

// Query for a book and its author
client.query({
  query: gql`
    query GetBook {
      book(isbn: "9780143127550") {
        isbn
        title
        author {
          id
          name
        }
      }
    }
  `
}).then(result => {
  console.log(result.data);
  console.log(client.extract()); // view raw normalized cache
});
```

When this query resolves, `result.data` might be returned as a nested JS object, but internally 
`client.extract()` would show a normalized cache shape. For example:

```js
{
  "ROOT_QUERY": {
    "book({\"isbn\":\"9780143127550\"})": { "__ref": "Book:9780143127550" }
  },
  "Book:9780143127550": {
    "isbn": "9780143127550",
    "title": "The Book Title",
    "author": { "__ref": "Author:123" }
  },
  "Author:123": {
    "id": "123",
    "name": "Author Name"
  }
}
```

Here, the `Book` and `Author` objects are stored once, and the `ROOT_QUERY` field points to them by reference. This normalization enables cache deduplication and easy cache updates. For instance, if another query returns the same `Author:123`, Apollo will merge it rather than create a duplicate entry.

## Fetching Policies and Cache Interactions

Fetch policies control how Apollo uses the cache versus the network when executing queries. The right policy helps balance performance (using cached data) with freshness (getting updated data). Apollo Client supports several fetch policies​:

- `cache-first` (default): Check the cache first. If all data for the query is present, return it from cache; otherwise fetch from the network​. This minimizes network requests but might show stale data if cache is outdated.
- `network-only`: Always fetch from the network and update the cache, skipping any cached result​.
Ensures freshest data but ignores cached data (no fast offline/read).
- `cache-and-network`: Return data from the cache immediately (if available) and simultaneously send a network request to update the cache​. The UI gets a quick response from cache and then refreshes when the network data arrives.
- `cache-only`: Only read from the cache. If the data isn't in cache, an error is thrown (useful for requiring preloaded data)​
- `no-cache`: Always fetch from the network and do not store the result in the cache​.
This is used when you don't want to cache a particular query’s data.
- `standby`: The query is not actively executed; intended for use with things like React Suspense or placeholder components (rarely used in most apps)​

**Usage example**: You can specify fetch policy in the query options. In React with hooks:

```jsx
const { data, loading } = useQuery(GET_DOGS, { fetchPolicy: 'cache-and-network' });
```

In this example, Apollo will try to quickly return any cached `GET_DOGS` data and also fetch the latest data from the server, updating the UI when the network response returns. A `network-onl`y or `no-cache` policy might be used on a refresh action to bypass stale cache. Using fetch policies smartly can improve perceived performance by avoiding unnecessary network calls while keeping data reasonably up-to-date​

## Reactive Variables and Local State Management

Apollo Client can manage local UI state, removing the need for external state libraries in many cases. **Reactive variables** (introduced in Apollo Client 3) are a mechanism to store local state outside of the GraphQL cache, but still have Apollo track and react to changes​. A reactive variable is like a special writable store: when its value changes, any active query or component that uses that variable will automatically update.

### Creating and using a reactive variable

```jsx
import { makeVar, useReactiveVar, gql, useQuery } from '@apollo/client';

// 1. Create a reactive variable for local state (e.g., a shopping cart array)
export const cartItemsVar = makeVar([]);  // initial value is an empty array

// 2. Use the reactive variable in a local state query or directly in a component
// Approach A: Use useReactiveVar hook to directly get updates
function CartIcon() {
  const cartItems = useReactiveVar(cartItemsVar);
  return <span>Cart items: {cartItems.length}</span>;
}

// Approach B: Incorporate reactive var into Apollo local state via type policies or field read functions (optional advanced usage)

// 3. Modify the reactive variable somewhere in the app (e.g., add an item)
function addToCart(productId) {
  // get current value, add new item, update var
  cartItemsVar([ ...cartItemsVar(), productId ]);
}
```

In this example, `cartItemsVar` holds a list of product IDs in the cart. The `CartIcon`` component calls useReactiveVar(cartItemsVar)` to subscribe to its value. Whenever `cartItemsVar` is updated (such as by calling `cartItemsVar(newValue))`, any component using `useReactiveVar` will re-render with the new value​. Reactive vars can hold any JavaScript data (objects, arrays, primitives) and aren't limited by GraphQL schema types​.

You can also use reactive variables with Apollo's local cache by defining client-only fields that read from them. For example, you might have a client-only GraphQL field `isLoggedIn` that returns the value of a reactive var. But often, using `useReactiveVar` directly is simpler for local state that doesn't need the GraphQL syntax.

**Why use reactive variables?** They integrate local state with Apollo’s reactivity. For instance, you could replace something like a global Redux store for simple cases. Apollo’s cache + reactive vars can manage both remote (server) state and client-only state in one place. Because reactive vars trigger updates to queries that depend on them, you can mix local and remote data seamlessly in a single query if needed. This makes Apollo Client a one-stop solution for state management in GraphQL apps.

## Subscriptions and Real-Time Data

GraphQL **subscriptions** enable real-time data push from the server to the client (often over WebSockets). Apollo Client can handle subscriptions by establishing a WebSocket connection and merging incoming data into the cache or directly providing it to your UI. Under the hood, Apollo uses a special link (transport) for subscriptions (such as `WebSocketLink` or `GraphQLWsLink`) and a mechanism to route subscription operations to that link while others use HTTP.

**Client setup for subscriptions**: Typically, you configure Apollo Client with both an HTTP link (for queries/mutations) and a WebSocket link (for subscriptions), using Apollo’s `split` function to direct each GraphQL operation to the correct link. For example:

```jsx
import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// HTTP link for queries and mutations
const httpLink = new HttpLink({ uri: 'https://example.com/graphql' });

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://example.com/graphql',  // WebSocket endpoint
}));

// Route requests to WS link if they are subscription, otherwise to HTTP link
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink
);

// Apollo Client using split link and cache
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});
```

In the code above, `split` checks each operation: if it's a `subscription` operation, it uses `wsLink`, otherwise it uses `httpLink​`. This setup ensures subscriptions go through a WebSocket connection. The `graphql-ws` library (via `GraphQLWsLink`) is a modern implementation for subscriptions.

**Using subscriptions in React**: Apollo provides a React Hook `useSubscription` to easily subscribe to data in components:

```jsx
import { gql, useSubscription } from '@apollo/client';

const NEW_MESSAGE_SUB = gql`
  subscription OnNewMessage($chatId: ID!) {
    messageAdded(chatId: $chatId) {
      id
      content
      sender
    }
  }
`;

function ChatRoom({ chatId }) {
  const { data, loading, error } = useSubscription(NEW_MESSAGE_SUB, {
    variables: { chatId }
  });

  if (loading) return <p>Waiting for new messages...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const newMessage = data?.messageAdded;
  return <p>New message: {newMessage.content} from {newMessage.sender}</p>;
}
```

When this component mounts, Apollo will open (or reuse) the WebSocket and listen for the `messageAdded` subscription. Each time a new message is pushed from the server, the `data` in `useSubscription` updates, triggering a re-render with the new message. Apollo automatically handles reconnecting on connection loss and manages the socket’s lifetime (it stays open as long as there are active subscriptions).

**Alternative approach**: You can also integrate subscriptions with queries using `subscribeToMore`. For example, after running a query for a list of comments, you can call `subscribeToMore` to listen for new comments and merge them into the list. This is useful to keep an existing query result updated in real-time​. However, for many cases, using `useSubscription` directly is simpler.

## Optimistic UI Updates

Optimistic UI updates let your app feel snappy by *optimistically* assuming a mutation will succeed and updating the UI **before** the server responds. Apollo Client supports this via the `optimisticResponse` option on mutations. You provide the most likely response data for the mutation; Apollo will temporarily insert that data into the cache and update the UI immediately, then reconcile with the real response when it arrives​.

**How it works:** When you call a mutation with `optimisticResponse`, Apollo will:
1. **Write** the optimistic result to the cache immediately (using a temporary entry separate from the “real” data)​. Make sure to include enough fields (especially the `id` and `__typename` of changed objects) in the optimistic response so Apollo knows how to normalize it​.
2. **Update queries/UI** that depend on this data instantly. Components re-render as if the mutation succeeded (no waiting on network)​.
3. When the actual response comes back, Apollo replaces the optimistic data with the real data (or removes it if the mutation failed), then updates the UI again​. If the real response matches the optimistic one, the user sees no change – the update was seamless.

**Optimistic update example**: Imagine a mutation to add a new todo item to a list. We can optimistically add the todo to our cache:

```jsx
const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

const [addTodo] = useMutation(ADD_TODO, {
  optimisticResponse: {
    addTodo: {
      id: -1,               // temporary ID
      __typename: "Todo",
      text: "Write optimistic UI section",
      completed: false
    }
  },
  update(cache, { data }) {
    // This update function runs for both optimistic and real responses.
    // On optimistic, data.addTodo is the fake item; on real, it's the real item.
    if (!data?.addTodo) return;
    const newTodo = data.addTodo;
    // Read current list from cache
    const existing = cache.readQuery({ query: GET_TODOS });
    // Write back the new list with the new todo added
    if (existing) {
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          todos: [...existing.todos, newTodo]
        }
      });
    }
  }
});

// Using the mutation (e.g., on form submit):
addTodo({ variables: { text: "Write optimistic UI section" } });
```

In this code, as soon as `addTodo` is called, the optimistic response is written. The `update` function will be called with `data.addTodo` being our optimistic todo, so the cache is updated to include it in the `GET_TODOS` list. The UI will show the new todo instantly. When the actual server response returns, Apollo will call `update` again with the real `data.addTodo` (which will have a real `id` from the server). Apollo replaces the optimistic entry with the real one (merging by matching IDs). If the server returns an error, Apollo will remove the optimistic item from the cache so the UI can revert.

**Key point**: The shape of `optimisticResponse` must exactly match the shape of the actual mutation response (partial is okay, but include fields you need for UI). Notably, include the same IDs/typenames that the server would, so Apollo knows what cache entries to create or update​. Apollo won't permanently save optimistic data if the mutation fails – it's only a UI placeholder.

This approach greatly improves UX, making the app feel responsive. Use it for actions like toggling a like button, creating items, etc., where you have a high confidence of success. Just be sure to handle errors (e.g., show a message or undo the UI change if it fails).

## Pagination and Lazy Queries
Fetching paginated data (e.g., pages of list results or infinite scroll) is a common use case. Apollo Client provides tools to manage pagination either via its fetchMore API or by configuring the cache to merge pages.

**Basic pagination with `fetchMore`**: After running an initial query, you can call `fetchMore` to retrieve the next page and merge it with existing results. For example, an offset-based pagination:

```jsx
const GET_FEED = gql`
  query GetFeed($offset: Int!, $limit: Int!) {
    feed(offset: $offset, limit: $limit) {
      id
      content
    }
  }
`;

function FeedList() {
  const { data, loading, fetchMore } = useQuery(GET_FEED, {
    variables: { offset: 0, limit: 10 }
  });

  if (!data) return <p>Loading...</p>;

  const loadMore = () => {
    fetchMore({
      variables: { offset: data.feed.length, limit: 10 },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        // Merge the previous and new results
        return {
          ...prevResult,
          feed: [...prevResult.feed, ...fetchMoreResult.feed]
        };
      }
    });
  };

  return (
    <div>
      {data.feed.map(item => <FeedItem key={item.id} content={item.content} />)}
      <button onClick={loadMore} disabled={loading}>Load more</button>
    </div>
  );
}
```

Here, the initial query loads the first 10 feed items. The `loadMore` function calls `fetchMore` with a new offset (the current list length) to get the next page. The `updateQuery` callback tells Apollo how to merge the `fetchMoreResult` with the existing data​. In this case, we concatenate the new feed items to the existing array. Apollo then updates the cache and the UI with the combined list. This approach works for **infinite scrolling** or "Load more" buttons. The `fetchMore` call returns a Promise, so you could also await it or handle loading states accordingly.

**Cursor-based pagination:** If your GraphQL API uses cursors (like Relay-style `cursor` and `hasNextPage` in a `pageInfo`), the approach is similar – you pass the `after` (cursor) in variables and fetch more pages. The merge logic would append new items. Apollo Client 3 can simplify cursor pagination via **field policies**. For example, Apollo provides a helper `relayStylePagination()` to automatically merge pages of a Relay connection. You can set this in your cache’s typePolicies so Apollo knows how to merge results for that field without needing manual `updateQuery` each time.

```js
// Example: using relayStylePagination for a "comments" field in Query
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        comments: relayStylePagination(),  // automatically handles cursor-based merging
      }
    }
  }
});
```

With such a policy, calling `fetchMore` on a `comments` query that returns a connection will automatically merge new results to the existing ones. If not using the helper, you can define a custom merge function in typePolicies to achieve the same effect (the Apollo docs provide examples of merging logic for cursor pagination)​.

**Lazy queries**: By default, Apollo executes a query as soon as your component renders (if using useQuery). **Lazy queries** allow you to delay execution until a specific event (like a user action) triggers it. Apollo’s `useLazyQuery` hook returns a tuple: 
`[executeQuery, { data, loading, error }]` instead of immediately running. You call `executeQuery()` manually to fire the query​.

**Example of useLazyQuery:**

```jsx
const SEARCH_BOOKS = gql`query SearchBooks($term: String!) { books(search: $term) { title author } }`;

function BookSearch() {
  const [searchBooks, { data, loading, error }] = useLazyQuery(SEARCH_BOOKS);

  const onSearch = (term) => {
    searchBooks({ variables: { term } });
  };

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      {loading && <p>Searching...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <BookResults list={data.books} />}
    </div>
  );
}
```

In this example, `SEARCH_BOOKS` will only execute when `searchBooks()` is called (e.g., when the user submits a search). This is useful for on-demand queries or expensive operations that you don't want to run on every render. It’s also handy in combination with pagination: you might use a lazy query to fetch the next page when the user scrolls near the bottom, rather than pre-fetch everything.

**Summary:** Pagination can be handled by `fetchMore` (with manual merging or using Apollo’s cache merge policies). Lazy queries (`useLazyQuery`) give you control over when to run a query. Combining these, you could implement infinite scroll by waiting for a user scroll event (lazy trigger) to call `fetchMore` for the next page.

## Error Handling and Retry Logic

GraphQL operations may fail due to network issues or server errors, so robust error handling is important. Apollo Client provides mechanisms to handle errors both at the operation level (per query/mutation) and globally via links. It also offers a retry link to automatically retry failed requests.

**Handling GraphQL errors vs network errors**: In Apollo:
- **GraphQL errors** (errors in the response, e.g., validation or resolver errors) appear in the 
`error.graphQLErrors` array of your `useQuery`/`useMutation` result.
- **Network errors** (like a 500 response or no response) appear in `error.networkError`.

By default, Apollo will treat any GraphQL errors as making the whole operation errored (and `data` will be undefined). If you want to access partial data even when GraphQL errors occur, you can set an 
**error policy**. For example, `useQuery(MY_QUERY, { errorPolicy: 'all' })` will let you get `data` and `error.graphQLErrors` together​. You might use this to render what data is available alongside error messages.

**Example of errorPolicy:**

```jsx
const { data, error } = useQuery(GET_PARTIAL_DATA, { errorPolicy: 'all' });
if (error) {
  console.log("GraphQL Errors:", error.graphQLErrors);
}
if (data) {
  // will have data even if some errors occurred
}
```

In most cases, you'll handle errors in UI by showing a message or fallback UI when `error` is set from `useQuery` or `useMutation`. For mutations, you can also use the Promise rejection or the `onError` option in the `useMutation` hook.

**Global error handling with Apollo Link**: Apollo Link allows you to define middleware for all requests. The **Error Link** (`@apollo/client/link/error`) lets you intercept errors for logging or custom logic​. For example, you can log errors or perform specific actions like redirect to a login on authentication error:

```jsx
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error] ${message}, Location: ${locations}, Path: ${path}`);
      // Example: if unauthorized, you might reset store or redirect
      if (message.includes("Unauthorized")) redirectToLogin();
    });
  }
  if (networkError) {
    console.error(`[Network error] ${networkError}`);
  }
});
```

You attach this `errorLink` when creating the Apollo Client by concatenating it with your HTTP link. This ensures every operation goes through the error link. The error link function can inspect `graphQLErrors` and `networkError`. It even has access to the operation and a `forward` function – by returning `forward(operation)` you can retry the request. For instance, on an authentication error, you might refresh a token and retry the request​.

**Retry logic**: Apollo provides a built-in **RetryLink** (`@apollo/client/link/retry`) that automatically retries failed operations (particularly network failures). You can configure it with options like number of attempts and delay/backoff strategy. For example:

```jsx
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';

const retryLink = new RetryLink({
  delay: { initial: 300, max: 10000, jitter: true },  // start at 300ms, exponential backoff up to 10s, randomize
  attempts: { max: 5, retryIf: (error, _operation) => !!error }  // try up to 5 times on error
});

const client = new ApolloClient({
  link: retryLink.concat(new HttpLink({ uri: '/graphql' })),
  cache: new InMemoryCache()
});
```

In this setup, if a network request fails, the RetryLink will wait 300ms and try again, doubling the delay each time (with some jitter to avoid many clients thundering the server at once)​. It will stop after 5 attempts by default. The `retryIf` function here retries on any error; you could customize it to only retry on certain conditions. This is easier than writing manual retry code for each query.

**Example scenario**: If the user is offline or the server is down, networkError occurs. With RetryLink, Apollo will automatically keep retrying in the background. If the user comes back online within the max retry time, the request may succeed without throwing an error in the UI at all. This improves resilience.

Here is a quick summary of Apollo Client's error handling:
- Use `error` object from hooks for simple UI feedback.
- Use `errorPolicy` if you need to handle partial data responses​
- Use an `onError` link for global handling (logging, custom redirects, etc.)​
- Use `RetryLink` to automatically retry transient errors with backoff, improving the reliability of network calls.

## Apollo Links

### Introduction to Apollo Links
- Apollo Client links are modular components (functions) that customize the flow of data between 
a web app's Apollo Client and the GraphQL server.
- You can think of links as a middleware pipeline for GraphQL operations (queries,
mutations, subscriptions)​. Each link in the chain can inspect, modify, or act on a
request before it is sent, and likewise handle the response after it returns.
- By default, Apollo Client uses a built-in HTTP link to send requests over HTTP​,
but the link system lets you swap in different behavior or add extra capabilities (such
as authentication, error handling, batching, etc.) by composing multiple links.
- In a link chain, the operations flow from one link to the next (**order is important**)
with the last link in the chain being the **terminating link** which actually sends the link
- When instantiating your ApolloClient, you would include it there:

```js
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`[GraphQL errors]:`, graphQLErrors);
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// Notice that httpLink is last
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache()
});
```

### Creating a Custom Logging Link
- before I go too far into Apollo Links, I want to show how we'd build a custom link.
By now, it's clear that **Apollo Links** are something a bit different. It's not just
some helper function, they have a specific format. The two examples above use `@apollo/client`
functions `onError` and `HttpLink`. 
- Let's create a basic custom link that uses a generic analytics library `@/lib/analytics`
to log events. Here are the basic steps:
  - import the required modules (again - we need `ApolloLink` from `@apollo/client`)
  - create the new ApolloLink instance
  - Log the relevant details
  - Forward the request
  - Include the link the Apollo Client setup

```js
// #1. Required Imports
import { ApolloLink } from "@apollo/client";
import { logEvent } from "@/lib/analytics"; // Fake custom module to log events

// #2. Create the ApolloLink instance
export const loggingLink = new ApolloLink((operation, forward) => {
  const startTime = Date.now(); 

  const { operationName, variables, query } = operation;
  const operationType = query.definitions[0].operation; // "query", "mutation", "subscription"

  // #3. Log the relevant details
  logEvent("GraphQL Operation Sent", {
    operationName,
    operationType,
    variables
  });

  // #4. Forward the request
  return forward(operation).map((response) => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Log the response details
    logEvent("GraphQL Operation Completed", {
      operationName,
      operationType,
      duration, // Log execution time
      success: !response.errors, // Determine if the operation succeeded
      errors: response.errors || null, // Capture any errors
    });

    return response; // Pass the response along the chain
  });
});
```
- And then in our instantiation of ApolloClient:

```js
const client = new ApolloClient({
  link: from([loggingLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
```
:::tip[Code Note]

This is probably not best practice, especially if `logEvents` is async. I just wanted to show an example of ApolloLink.

:::