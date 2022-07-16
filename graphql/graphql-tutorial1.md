
# How To GraphQL

Source: https://www.howtographql.com/

## Introduction

- GraphQL is new API standard invented and open-source by Facebook.
- enables declarative data fetching and mutation.
- exposes single endpoint and responds to queries
- more efficient alternative to REST
- GraphQL was needed for mobile usage - to make queries more efficient
- Allows for one API to fit multiple front-ends
- Fast development speed & expectation for rapid feature development
- GraphQL can be used with any programming language
- Netflix open-sourced their solution Falcor

## GraphQL is the better REST
- source: https://www.howtographql.com/basics/1-graphql-is-the-better-rest/
- Great ideas in REST: stateless servers & structured access to resources
- REST is a strict specification - but the concept was wildly interpreted
- GraphQL was developed to cope with the need for more flexibility and efficiency
in client-server communication
- In the example blogging app, to show the user, their posts, and followers, we'd have
three endpoints: `/users/id`, `/users/id/posts`, and `/users/id/followers`
- When making the first request, we'd get all the additional data related to the user that
we don't need
  - similar issue with other endpoints
- with GraphQL, we'd send single request with all the data we need; here's an example request:

```graphql
query {
  user(id: "ascv-1231") {
    name
    posts {
      title
    }
    followers(last: 3) {
      name
    }
  }
}
```
- We are trying to avoid overfetching and underfetching
- GraphQL allows fine-grained info about what data is read by clients
- Enables evolving API and deprecating unneeded API features
- Great opportunities for instrumenting and performance monitoring
- GraphQL uses strong type system to define capabilities of an API
- Schema serves as a contract between the client and the server

## Core Concepts

- source: https://www.howtographql.com/basics/2-core-concepts/
- The Schema Definition Language (SDL) is a language that defines the capabilities of an API.

```graphql
type Person {
  name: String!
  age: Int!
}
```
- `!` means that the field is required

- You can add a relation between types:

```graphql
type Post {
  title: String!
  author: Person!
}

type Person {
  name: String!
  age: Int!
  # update Person type with posts array
  posts: [Post!]!
}
```

- writing data with mutations require the `mutation` keyword
- mutations are used to create, update, and delete data
- here is an example mutation creating a new person:

```graphql
mutation {
  createPerson(name: "John", age: 30) {
    name
    age
  }
}
```
- The GraphQL Schema defines the capabilities of the API by specifying how a 
client can fetch and update data.
- *contract* between server and client
- When writing the schema for an API, there are some special *root* GraphQL types:
  - `Query`: used to fetch data
  - `Mutation`: used to create, update, and delete data
  - `Subscription`: used to listen for changes in data
- The Query Type

```graphql
{
  allPersons {
    name
  }
}

type Query {
  allPersons(last: Int): [Person!]!
}
```
- The Mutation Type

```graphql
mutation {
  createPerson(name: "John", age: 30) {
    id
  }
}

type Mutation {
  createPerson(name: String!, age: Int!): Person
}
```

- The Subscription Type

```graphql
subscription {
  newPerson {
    name
    age
  }
}

type Subscription {
  newPerson: Person!
}
```

Here are some links about the core concepts in GraphQL:
- [GraphQL Server Basics (Part I): GraphQL Schemas, TypeDefs & Resolvers Explained](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e)
- [GraphQL Server Basics (Part II): The Network Layer](https://www.prisma.io/blog/graphql-server-basics-the-network-layer-51d97d21861)
- [GraphQL Server Basics (Part III): Demystifying the info argument in GraphQL resolvers](https://www.prisma.io/blog/graphql-server-basics-demystifying-the-info-argument-in-graphql-resolvers-6f26249f613a)

## Big Picture (Architecture)
- source: https://www.howtographql.com/basics/3-big-picture/
- GraphQL is only a specification
- GraphQL server has one resolver function for each field

