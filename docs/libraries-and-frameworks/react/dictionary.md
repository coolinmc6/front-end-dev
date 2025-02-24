---
title: React Dictionary
description: Basic definitions and explanations of React's terms
---

# React Dictionary

### Hydration

**Hydration** is a process in React where the client-side JavaScript takes over the static HTML that was rendered by the server. This process is crucial for server-side rendering (SSR) applications, where the initial HTML is generated on the server and sent to the client. When the client-side JavaScript loads, it "hydrates" the static HTML by attaching event listeners and making the page interactive.

#### Why "Hydration" and Not "Refresh"?
*Hydration* specifically refers to the process of making a static HTML page interactive by attaching JavaScript behaviors. It implies that the HTML already exists and needs to be "brought to life" with JavaScript.

*Refresh* generally means reloading the entire page or content, which is not the case with hydration. Hydration does not reload the content but enhances it with interactivity.

#### Hydration in Different Libraries

##### Next.js Hydration
In Next.js, hydration refers to the same process as in React. Next.js uses server-side rendering to generate HTML on the server. When this HTML is sent to the client, the React components are hydrated to make the page interactive. Next.js handles this process seamlessly, ensuring that the initial load is fast and the page becomes interactive quickly.

##### React Router Hydration
React Router itself does not directly deal with hydration. However, in the context of a React application using React Router, hydration still refers to the process of making the server-rendered HTML interactive. When a React application with React Router is server-side rendered, the hydration process will also involve attaching the routing logic to the static HTML, ensuring that navigation within the app works as expected.
