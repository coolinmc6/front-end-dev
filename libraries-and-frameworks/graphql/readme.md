[Back](https://github.com/coolinmc6/front-end-dev#front-end-development)
<a name="top"></a>

# GraphQL

## GraphQL: Course Notes

<table>
  <thead>
    <tr>
      <th>Course</th>
      <th>Notes</th>
      <th>Status</th>
    </tr>
  <thead>
  <tbody>
    <!-- <tr>
      <td><a href="https://frontendmasters.com/courses/testing-practices-principles/">JavaScript Testing Practices and Principles</a></td>
      <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/jest/fem-testing-practices-principles.md">Notes</a></td>
      <td><strong>Complete</strong></td>
    </tr> -->
  </tbody>
</table>

[[↑] Back to top](#top)

## Notes

- GraphQL at its simplest is about asking for specific fields on objects.
- the structure of your request matches the structure/shape of the response
- you can alias fields in a query so that you can query the same field with
different arguments
- Fragments are reusable units of fields that can be included in multiple
queries. They allow us to split complicated data requirements into smaller
chunks that can be reused across queries.

```graphql
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

- A query, mutation, or subscription is called an **operation type** and the name that follows
it is the **operation name**
- Learning to write queries (or other operations) also involves using variables. Here is
an example:

```graphql
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```
variables:
```json
{
  "episode": "JEDI"
}
```
**Note:** _what you don't see here is HOW to do that in JavaScript._
- A **directive** is a feature in GraphQL that allows you to conditionally include or exclude
fields. Here's an example:

```graphql
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```
variables:
```json
{
  "episode": "JEDI",
  "withFriends": true
}
```
- If I had to read what the query above is, this is what I'd say:
> The query, **Hero**, takes two variables: `$episode` of type `Episode` and `$withFriends` of type
`Boolean` which is required denoted by the `!`. `hero(episode: $episode)` is the root field being
queried and will return the `name` of the hero and their `friends` if the `$withFriends` boolean
is true.
- and here is what the data might look like:
```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```
- another variant of `@include(if: Boolean)` is `@skip(if: Boolean)` which will skip the field if
the condition is true
- inline fragments are used to conditionally include fields based on the type of a field. So in the
example below, if the `hero` is a `Droid`, the `primaryFunction` field will be included in the
response; if it's a human, the `height` field will be included:

```graphql
query HeroForEpisode($episode: Episode!) {
  hero(episode: $episode) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
```
- you can also request meta fields like `__typename` which will return the type of the object

**Finished [queries and mutations](https://graphql.org/learn/queries/), do
[schemas and types](https://graphql.org/learn/schema/) next.**



## GraphQL Questions

**Explain the core differences between GraphQL and REST.**
Look for explanations on how GraphQL allows clients to request exactly what they need, how it can
aggregate data from multiple sources, and the differences in how data is accessed and modified
(using queries, mutations, and subscriptions in GraphQL).

**How does GraphQL improve performance for client applications?**
Expect insights on reduced over-fetching and under-fetching of data, fewer
network requests due to aggregated queries, and the ability to tailor responses
to the needs of the client.

**Can you describe the process of setting up a GraphQL client with a popular**
**framework like React, Vue, or Angular?**
Look for familiarity with libraries
such as Apollo Client or Relay, setting up the GraphQL client, connecting to a
GraphQL API, and handling state management.

**How do you handle authentication and authorization in a GraphQL API?**
Candidates should discuss methods for securing a GraphQL API, including
token-based authentication (like JWT) and how authorization logic can be
integrated into the GraphQL server (e.g., schema directives, resolver
functions).

**What are some challenges you might face when integrating GraphQL into an existing project and how would you overcome them?** 
Answers could include
dealing with legacy systems, migrating from RESTful services to GraphQL,
performance implications, and strategies for incrementally adopting GraphQL.

**Explain the concept of Schema Definition Language (SDL) in GraphQL.** 
Expect explanations on how SDL is used to define the shape of data available through a
GraphQL API, including types, queries, mutations, and subscriptions.

**How do you optimize GraphQL queries to improve performance and reduce load on the server?**
Look for strategies like query batching, caching, persisting
queries, using DataLoader for batching and caching database requests, and
avoiding N+1 queries.

**Discuss the role of resolvers in a GraphQL server and how you might implement them.**
Candidates should explain how resolvers provide the mechanism for
fetching the data for a specific field in the schema, how they can be composed
to retrieve data from various sources, and considerations for performance and
error handling.

**How can you implement real-time functionality in a GraphQL application?**
Expect discussions on using subscriptions in GraphQL, setting up a WebSocket
connection for real-time updates, and considerations for scaling real-time
functionality.

**What tools and techniques do you use for testing GraphQL APIs?**
Look for familiarity with tools like Apollo's GraphiQL, Postman, or Insomnia for manual
testing, as well as approaches for unit and integration testing of GraphQL
queries, mutations, and subscriptions.
