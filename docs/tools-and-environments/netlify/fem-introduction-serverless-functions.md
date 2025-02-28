---
title: |
  FEM: Introduction to Serverless Functions
---

# Front End Masters: Introduction to Serverless Functions

- [Course Link](https://frontendmasters.com/courses/serverless-functions/)
- [Course Materials](https://github.com/jlengstorf/frontendmasters-serverless)

[[↑] Back to top](#top)

## Introduction

### Overview

- Key items to take away from the course:
  - What does "serverless" mean?
  - How to load data using serverless functions?
  - How to protect private credentials in front-end applications?
  - How to send data to serverless functions?
  - How to save data sent to serverless functions?
  - How to limit access to serverless functions?

## Serverless Functions

```sh
# netlify dev also works
ntl dev
```

- To add functions to Netlify project, you simply create a new folder in your root directory called `functions`.
- Update the `netlify.toml` file to include the following:

```toml
[build]
  functions = "functions"
```
- and then inside `/functions`, you can create a new handler. One example is `movies.js`:

```js
const movies = require('../data/movies.json');

exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(movies)
  }
}
```
- here we are importing a json file and then returning it as a response.
- We can see the page by going to: `http://localhost:8888/.netlify/functions/movies`
- We can also get query parameters. Here is an example of the `movie-by-id.js` file:

```js
const movies = require('../data/movies.json');

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;
  const movie = movies.find(movie => movie.id === id);

  if (!movie) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Movie not found' })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(movie)
  }
}
```

- I also created `colin.js` file to look at the arguments in the handlers function. In general, the two arguments are `event` and `context`. The `event` object contains information about the request, such as the query string parameters, the body, and the headers. 
- The `context` object seems to have some AWS information, such as the `functionName`, `functionVersion`, and `identity`.
- Here is a cleaned up version of what you get in localhost:

```json
{
  "event": {
    "path": "/.netlify/functions/colin",
    "httpMethod": "GET",
    "queryStringParameters": "[Object]",
    "multiValueQueryStringParameters": "[Object]",
    "headers": "[Object]",
    "multiValueHeaders": "[Object]",
    "isBase64Encoded": true,
    "rawUrl": "http://localhost:8888/.netlify/functions/colin",
    "rawQuery": ""
  },
  "context": {
    "done": "[Function]",
    "fail": "[Function]",
    "succeed": "[Function]",
    "getRemainingTimeInMillis": "[Function]",
    "callbackWaitsForEmptyEventLoop": false,
    "functionName": "handler",
    "functionVersion": "1.0",
    "invokedFunctionArn": "[Obscure]",
    "memoryLimitInMB": "98",
    "awsRequestId": "[Obscure]",
    "logGroupName": "Group name",
    "logStreamName": "Stream name",
    "identity": "[Object]",
    "clientContext": "[Object]",
    "_stopped": false
  }
}
```
- this is the end of the section; by this point, we can:
  - add Netlify functions to our project
  - return both a `Hello World!` message and a JSON response
  - access query string parameters to filter that JSON response
  - access the `event` and `context` objects

## API Data

- We created an API Key for the [OMDB API](http://www.omdbapi.com/).
- Here is how we modified our `movies.js` file to use the API:

```js
const { URL } = require('url');
const fetch = require('node-fetch');
const movies = require('../data/movies.json');

exports.handler = async () => {
  const api = new URL('https://omdbapi.com');

  // add the secret API key to the URL
  api.searchParams.set('apikey', process.env.OMDB_API_KEY);

  const promises = movies.map((movie) => {
    // use the movie's IMDB ID to look up details
    api.searchParams.set('i', movie.id);

    return fetch(api)
      .then(response => response.json())
      .then(data => {
        const scores = data.Ratings;

        return {
          ...movie, 
          scores,
        }
      })
  })

  const moviesWithRatings = await Promise.all(promises);

  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithRatings)
  }
}
```

### Rendering API Data

- Remember: `ntl dev` to get started, not `npm run dev`
- this was just a simple example to get show the data

### Getting Setup with Hasura

- **CM NOTE:** the free Heroku tier was deprecated. I might just have to skip the
Hasura / GraphQL stuff. GraphiQL doesn't work with Planetscale so I can either switch
to AWS or skip it.

## Database & Auth

## Use Cases & Q&A