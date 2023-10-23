# Random Thoughts Roughly Organized

### CSS

- CSS Processing

### Web Fundamentals

- How do you read the Network tab in Chrome DevTools? What is it showing?

**RESTful APIs**

- RESTful APIs are built to facilitate the front-end to back-end connection with some best practices
- you can try deploying the API under a dedicated domain name like `https://api.domain.com` or `https://example.com/api/`
- You can also version the api like this: `https://api.example.com/v1/`
- Each path, or URL, is an endpoint that contains a resource that you want. So for zoos, animals, and employees, the endpoints
would look like this:
  - `https://api.example.com/v1/zoos`
  - `https://api.example.com/v1/animals`
  - `https://api.example.com/v1/employees`
- The HTTP verbs then correspond to what you are trying to do:
  - GET = SELECT
  - POST = CREATE
  - PUT = UPDATE
  - PATCH = UPDATE
  - DELETE = DELETE
- Here are some examples of what how it would work using the above api:
  - GET `/zoos`: List all zoos
  - POST `/zoos`: Create a new zoo
  - GET `/zoos/ID`: Get information of a specified zoo
  - PUT `/zoos/ID`: Update the information of a specified zoo (provide all the information of the zoo)
  - PATCH `/zoos/ID`: Update the information of a specified zoo
  - DELETE `/zoos/ID`: delete a zoo
  - GET `/zoos/ID/animals`: List all animals in a specified zoo
  - DELETE `/zoos/ID/animals/ID`: delete the specified animal from a specified zoo
