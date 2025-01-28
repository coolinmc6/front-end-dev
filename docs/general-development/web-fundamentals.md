---
title: Web Fundamentals
sidebar_position: 1
---

# Web Fundamentals

## Web Performance and Optimization

### Core Web Vitals

- **Metrics**: Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS)
  - **Largest Contentful Paint (LCP)**: Measures the time it takes for the largest visible content (like an image or a block of text) to load. Ideal threshold: under 2.5 seconds.
  - **First Input Delay (FID)**: Measures the delay between a user's first interaction (e.g., click or tap) and the browser's response. Ideal threshold: under 100 milliseconds.
  - **Cumulative Layout Shift (CLS)**: Measures how much visual content shifts unexpectedly. Ideal threshold: less than 0.1.

**Questions:**

1. What does LCP measure, and what is its ideal threshold?  
   **Answer**: LCP measures the time it takes for the largest visible content to load, ideally under 2.5 seconds.
2. What metric captures how quickly a browser responds to a user's interaction?  
   **Answer**: First Input Delay (FID), with an ideal threshold of under 100 milliseconds.
3. What does CLS measure, and what value indicates good performance?  
   **Answer**: CLS measures unexpected visual shifts, with a good value being less than 0.1.

- **Tools**: Google Lighthouse, WebPageTest
  - **Google Lighthouse**: An open-source tool to analyze and improve the performance, accessibility, and SEO of web pages.
  - **WebPageTest**: A free tool to measure and diagnose web performance issues with advanced testing options like custom scripts and server selection.

**Questions:**

1. Name two tools that can be used to measure and analyze Core Web Vitals.  
   **Answer**: Google Lighthouse and WebPageTest.
2. Which tool provides advanced options like custom scripts and server selection?  
   **Answer**: WebPageTest.

### Optimizing Resource Delivery

- **Preloading and Prefetching Strategies**: Techniques to load resources in advance, improving perceived performance. Preloading prioritizes critical resources, while prefetching fetches resources likely to be used soon.
- **HTTP/2 Multiplexing**: Enables multiple requests to be sent simultaneously over a single connection, reducing latency.

**Questions:**

1. What is the difference between preloading and prefetching?  
   **Answer**: Preloading prioritizes critical resources for immediate use, while prefetching fetches resources likely to be used in the near future.
2. What does HTTP/2 multiplexing achieve?  
   **Answer**: It allows multiple requests to be sent simultaneously over a single connection, reducing latency.

### Optimized Compression Techniques

- **Gzip, Brotli Compression**: Methods to reduce the size of text-based files like HTML, CSS, and JavaScript, improving load times.
- **Minification of JS, CSS**: The process of removing unnecessary characters from code (e.g., whitespace, comments) to reduce file size.

**Questions:**

1. Name two compression techniques used to reduce the size of text-based files.  
   **Answer**: Gzip and Brotli.
2. What is minification, and why is it used?  
   **Answer**: Minification removes unnecessary characters from code to reduce file size and improve load times.

### Optimizing Assets

- **Lazy Loading Images and Videos**: A technique to defer loading non-critical images/videos until they are needed, reducing initial page load time.
- **Efficient Font Loading and Subsetting**: Ensuring only required font characters are loaded and using font-display properties to prevent invisible text during font loading.

**Questions:**

1. What is lazy loading, and how does it help performance?  
   **Answer**: Lazy loading defers loading non-critical images/videos until needed, reducing initial page load time.
2. How can font loading be optimized?  
   **Answer**: By loading only required font characters (subsetting) and using font-display properties to prevent invisible text during loading.

### Using Web Workers & Service Workers

- **Offloading Tasks with Web Workers**: Web Workers run scripts in background threads, improving UI responsiveness by offloading heavy computations.
- **Caching with Service Workers**: Service Workers cache assets and enable offline access, improving load times and reliability for repeat visits.

**Questions:**

1. What is the purpose of Web Workers?  
   **Answer**: To run scripts in background threads, improving UI responsiveness by offloading heavy computations.
2. How do Service Workers improve web performance?  
   **Answer**: By caching assets and enabling offline access, which improves load times and reliability for repeat visits.

## Client-Side Storage

### Local Storage

- **Definition**: Stores persistent key-value pairs in the browser with no expiration date. Useful for saving small amounts of data (e.g., user preferences).
- **Size Limits and Use Cases**: Limited to ~5MB. Suitable for lightweight, non-sensitive data.

**Questions:**

1. What type of data is stored in Local Storage?  
   **Answer**: Persistent key-value pairs with no expiration date.
2. What is the approximate size limit for Local Storage?  
   **Answer**: Around 5MB.

### Session Storage

- **Definition**: Stores key-value pairs for the duration of the session. Data is cleared when the tab is closed.
- **Differences Between Local and Session Storage**: Session Storage is temporary, while Local Storage persists across sessions.

**Questions:**

1. When is data in Session Storage cleared?  
   **Answer**: When the tab is closed.
2. How does Session Storage differ from Local Storage?  
   **Answer**: Session Storage is temporary and cleared when the session ends; Local Storage persists indefinitely.

### IndexedDB

- **Definition**: A low-level API for storing large amounts of structured data. Supports complex querying.
- **IndexedDB Transactions**: Ensures atomicity when performing read/write operations.

**Questions:**

1. What type of data can IndexedDB handle?  
   **Answer**: Large amounts of structured data with complex querying capabilities.
2. Why are transactions important in IndexedDB?  
   **Answer**: They ensure atomicity for read/write operations.

### Cache API

- **Definition**: Allows storing HTTP responses for offline access and efficient retrieval.
- **Cache Versioning and Updates**: Ensures the correct version of cached resources is served.

**Questions:**

1. What is the purpose of the Cache API?  
   **Answer**: To store HTTP responses for offline use and efficient retrieval.
2. How is cache versioning helpful?  
   **Answer**: It ensures the correct version of cached resources is served.

### Cookies

- **Definition**: Small pieces of data stored in the browser and sent with every HTTP request.
- **Security Features**: Secure, HttpOnly, and SameSite flags enhance security by restricting access and cross-site behavior.

**Questions:**

1. What are cookies used for in web development?  
   **Answer**: Storing small pieces of data sent with HTTP requests.
2. Name one security feature of cookies.  
   **Answer**: The HttpOnly flag prevents JavaScript access to cookies.

## Network Requests

### Fetch API

- **Definition**: A modern interface for making network requests, replacing older technologies like XMLHttpRequest. Supports promises for cleaner asynchronous code.
- **Handling Errors**: Provides built-in error handling using `.catch()` for rejected promises.

**Questions:**

1. What does the Fetch API replace for making network requests?  
   **Answer**: XMLHttpRequest.
2. How does Fetch handle errors?  
   **Answer**: By using promises and `.catch()` for rejected requests.

### Abort Controller

- **Definition**: Allows developers to cancel ongoing network requests, improving performance and handling timeouts.
- **Use Cases**: Useful for canceling slow or unnecessary requests in real-time applications.

**Questions:**

1. What is the purpose of Abort Controller?  
   **Answer**: To cancel ongoing network requests and handle timeouts.
2. Name a common use case for Abort Controller.  
   **Answer**: Canceling unnecessary or slow requests in real-time apps.

### CORS (Cross-Origin Resource Sharing)

- **Definition**: A protocol that allows restricted resources on a web page to be requested from another domain. Controlled via HTTP headers.
- **Preflight Requests**: Sent by the browser to verify permissions before making the actual request.

**Questions:**

1. What is CORS used for?  
   **Answer**: Allowing restricted resources to be requested from another domain.
2. What is a preflight request in CORS?  
   **Answer**: A preliminary request sent to verify permissions before the actual request.

### Short Polling & Long Polling

- **Short Polling**: Sends repeated requests to the server at fixed intervals to check for updates.
- **Long Polling**: Keeps the request open until the server has new information to send, reducing redundant requests.

**Questions:**

1. How does short polling differ from long polling?  
   **Answer**: Short polling sends requests at fixed intervals, while long polling keeps the connection open until updates are available.
2. Which polling method reduces redundant requests?  
   **Answer**: Long polling.

### Web Sockets

- **Definition**: Enables full-duplex communication between client and server over a single persistent connection.
- **Use Cases**: Ideal for real-time applications like chat apps, live notifications, and online games.

**Questions:**

1. What kind of communication do Web Sockets enable?  
   **Answer**: Full-duplex communication between client and server.
2. Name one use case for Web Sockets.  
   **Answer**: Real-time chat applications.

### Server-Sent Events (SSE)

- **Definition**: Allows servers to push updates to the client over a one-way connection using HTTP.
- **Managing EventSource**: Provides a simple API to handle server-sent updates.

**Questions:**

1. What type of communication does SSE support?  
   **Answer**: One-way communication from server to client.
2. What is EventSource used for?  
   **Answer**: Handling server-sent updates.

### REST APIs

- **Definition**: A set of conventions for building scalable and stateless web services. Relies on HTTP methods (GET, POST, PUT, DELETE).
- **Endpoint Design Principles**: Ensure clarity, consistency, and predictability in API endpoints.
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

**Questions:**

1. What are the HTTP methods commonly used in REST APIs?  
   **Answer**: GET, POST, PUT, DELETE.
2. What is a key principle of REST API endpoint design?  
   **Answer**: Clarity and consistency.

### HTTP Headers

- **Cache-Control and Expires Headers**: Control caching behavior, including expiration times for resources.
- **Custom Headers for Authentication**: Allow passing authentication tokens and other custom data in requests.

**Questions:**

1. What do Cache-Control headers do?  
   **Answer**: Control caching behavior and expiration times for resources.
2. Why are custom headers used in HTTP requests?  
   **Answer**: To pass authentication tokens and other custom data.

## Web Security

### Cross-Site Scripting (XSS)

- **Definition**: An attack that injects malicious scripts into trusted websites. These scripts can steal cookies, session data, or other sensitive information.
- **Mitigation Techniques**: Input sanitization, output encoding, and implementing Content Security Policy (CSP).

**Questions:**

1. What is Cross-Site Scripting (XSS)?  
   **Answer**: An attack that injects malicious scripts into trusted websites to steal sensitive data.
2. Name one technique to mitigate XSS.  
   **Answer**: Input sanitization.

### Cross-Site Request Forgery (CSRF)

- **Definition**: An attack where unauthorized commands are executed on behalf of an authenticated user.
- **Mitigation Techniques**: CSRF tokens, SameSite cookies, and verifying request origins.

**Questions:**

1. What is Cross-Site Request Forgery (CSRF)?  
   **Answer**: An attack where unauthorized commands are executed on behalf of an authenticated user.
2. Name a mitigation technique for CSRF.  
   **Answer**: Using CSRF tokens.

### Man-in-the-Middle Attacks (MITM)

- **Definition**: An attack where an adversary intercepts communication between two parties to eavesdrop or alter data.
- **Mitigation Techniques**: HTTPS encryption, SSL/TLS, and certificate pinning.

**Questions:**

1. What is a Man-in-the-Middle (MITM) attack?  
   **Answer**: An attack where communication between two parties is intercepted and potentially altered.
2. How can MITM attacks be mitigated?  
   **Answer**: By using HTTPS and SSL/TLS encryption.

### CORS (Cross-Origin Resource Sharing)

- **Definition**: Ensures secure cross-origin requests and data sharing between web applications by validating HTTP headers.
- **Security Implications**: Prevents unauthorized domains from accessing sensitive resources.

**Questions:**

1. What does CORS validate?  
   **Answer**: HTTP headers to ensure secure cross-origin requests.
2. How does CORS enhance security?  
   **Answer**: By preventing unauthorized domains from accessing sensitive resources.

### Content Security Policy (CSP)

- **Definition**: A security standard to prevent XSS and other code injection attacks by specifying allowed sources of content.
- **Features**: Restricts inline scripts, styles, and external resources to trusted origins.

**Questions:**

1. What is the purpose of Content Security Policy (CSP)?  
   **Answer**: To prevent XSS and other code injection attacks.
2. Name one feature of CSP.  
   **Answer**: Restricts inline scripts to trusted origins.

### Security Headers

- **Strict-Transport-Security (HSTS)**: Enforces the use of HTTPS, preventing protocol downgrade attacks.
- **X-Frame-Options**: Prevents clickjacking by controlling whether a site can be embedded in an iframe.

**Questions:**

1. What does HSTS enforce?  
   **Answer**: The use of HTTPS, preventing protocol downgrade attacks.
2. What is the purpose of X-Frame-Options?  
   **Answer**: To prevent clickjacking by controlling iframe embedding.

## JS Design Patterns

### Singleton Pattern

- Global Shared Instances
- Pros and Cons of Singletons

### Module Pattern

- Encapsulation of Code Logic
- Revealing Module Pattern

### Factory Pattern

- Object Creation without Constructors
- Factory Method Design

### Proxy Pattern

- Intercepting Object Operations
- Use Cases like API Rate Limiting

### Observer Pattern

- Event Listeners and Handlers
- Pub-Sub Pattern in JS

### Prototype Pattern

- Prototypal Inheritance
- Enhancing Performance with Prototypes

## React Design Patterns

### Container/Presentation Pattern

- Separating Logic from UI Components
- Benefits of Reusability

### HOC (Higher-Order Components) Pattern

- Wrapping Components for Shared Logic
- HOC for Authorization and Caching

### Render Props Pattern

- Sharing State and Behavior via Props
- Dynamic Rendering with Render Props

### Provider Pattern

- Context API and Dependency Injection
- Managing Global State with Providers

### Compound Pattern

- Breaking Components into Smaller Units
- Managing Component Relationships

### Rendering Patterns

#### Client-Side Rendering (CSR)

- Performance Challenges and Solutions
- React Hydration in CSR

#### Server-Side Rendering (SSR)

- Initial Load Optimization
- Server-Side Cache Management

#### Static Site Generation (SSG)

- Build-Time Rendering
- SEO Benefits with SSG

#### Static Rendering

- Prerendering Fixed Content
- Deployment Considerations

#### Incremental Static Regeneration (ISR)

- Partial Updates for Static Pages
- Combining SSG and ISR

#### Progressive Hydration

- Loading Critical Content First
- Reducing Initial Load Time

#### Streaming Server-Side Rendering

- Progressive Rendering with React 18
- Streaming for Large Applications

#### React Server Components

- Server-Driven Rendering Model
- Combining RSC with SSR and CSR

#### Selective Hydration

- Hydrating Interactive Components Only
- Improving TTI (Time to Interactive)
