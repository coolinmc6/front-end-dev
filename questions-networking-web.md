<table>
    <thead>
        <tr>
            <th colspan="5" style="text-align: center;"><strong>Subjects of Study</strong></th>
        </tr>
        <tr>
            <td colspan="5">The links below are to the parent GitHub repos of completed courses, resources, my own notes, links to articles, etc. about the topics shown below. They are designed to be my "go-to" place for teaching myself the given subject.</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://github.com/coolinmc6/analytics">Analytics</a></td>
            <td><a href="https://github.com/coolinmc6/CS-concepts">Computer Science</a></td>
            <td><a href="https://github.com/coolinmc6/design-ux-ui#product-design--development">Product Development</a></td>
            <td><a href="https://github.com/coolinmc6/design-ux-ui">UX / UI Design</a></td>
            <td><strong><a href="https://github.com/coolinmc6/front-end-dev">Front End Development</a></strong></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-javascript.md">JavaScript Questions & Glossary</a></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-css.md">CSS Questions & Glossary</a></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><em>Networking Questions & Glossary</em></td>
        </tr>
        <tr>
		    <td></td>
		    <td></td>
		    <td></td>
		    <td></td>
		    <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/questions-accessibility.md">Accessibility Questions & Glossary</a></td>
		</tr>       
    </tbody>
</table>


<a name="top"></a>


# Networking Questions

### How does the Internet work? When I go to [www.cnn.com](https://www.cnn.com/), what happens?

1. First, the browser goes to the DNS Server (DNS = Domain Name System) to find the real address (IP address) that the website is on
2. The browser then sends an HTTP request to the server asking for a copy of the files that make up that website (`.html`, `.css`, `.js`, `.png`, etc.)
    - this message is sent from your computer, the client, to the server across your internet connection via TCP/IP (Transmission Control Protocol/Internet Protocol)
3. If the request is approved by the server, it responds with a `200 OK` message and then starts sending the website's files to the browser as a series of small chunks called "data packets"
4. Your browser then assembles the small chunks into a complete website and displays it to you
    - *Note:* if you were to open the HTML file you get in a text editor, you'd get the text version of it. 

- Sources:
    - [White Paper: How Does the Internet Work?](http://web.stanford.edu/class/msande91si/www-spr04/readings/week1/InternetWhitepaper.htm) -> great resource. I should read and take notes.

[[↑] Back to top](#top)

### What exactly happens when you browse a website in your browser?

**Version #1**

- Browser splits what you type (the URL) into a hostname and a path.
- Browser forms an HTTP request to ask for the data at the given hostname and path.
- Browser performs DNS lookup to resolve the hostname into an IP address.
- Browser forms a TCP/IP connection to the computer specified via the IP address. (This connection is actually formed out of many computers, each passing the data along to the next.)
- Browser sends the HTTP request down the connection to the given IP address.
- That computer receives the HTTP request from the TCP/IP connection and passes it to the web server program.
- Web server reads the hostname and path and finds or generates the data that you've asked for.
- Web server generates an HTTP response containing that data.
- Web server sends that HTTP response back down the TCP/IP connection to your machine.
- Browser receives the HTTP response and splits it into headers (describing the data) and the body (the data itself).
- Browser interprets the data to decide how to display it in the browser - typically this is HTML data that specifies types of information and their general form.
- Some of the data will be metadata that specifies further resources that need to be loaded, such as style sheets for detailed layout, or inline images, or Flash movies. This metadata is specified again as a URL, and this whole process repeats for each one until all are loaded.

**Version #2**

- The first step is the DNS (Domain Name Server) lookup. It uses the DNS servers specified in your network settings (or given to you by DHCP) to lookup the top domain (`cnn.com`) and then ask that domain's nameserver for the IP address of the subdomain specified (`www.cnn.com`).
- After it has the IP address, your browser begin communications with the web server. This is done using the specified protocol (which usually defaults to HTTP 1.1). A 'GET' request for `/` is made to the server, which responds with the HTML document contents and the appropriate headers (which tell the browser of the document's content-type, HTML, and other information). Then the browser parses the document and finds any URLs which it needs to embed in the page (like images or linked stylesheets) and does GET requests on each of those.
- The browser also usually automatically makes a GET request for `/favicon.ico` (to display the little CNN icon next to the site title).
- Your browser will also likely specify in its request headers that it wants the response content to be compressed, using the gzip algorithm. This makes the file download much smaller, if the server supports it. This is all transparent to you, even though it's like downloading a ZIP file and unzipping it.
- When you reload the page, your browser checks if that page is already cached in your system, and if so, it does an HTTP request just for the header of the document, and checks its modified date. If this date is later than its cached copy, it requests the full document contents again and refreshes the page. Otherwise it just uses your local copy.


- Sources:
    - [https://superuser.com/questions/31468/what-exactly-happens-when-you-browse-a-website-in-your-browser](https://superuser.com/questions/31468/what-exactly-happens-when-you-browse-a-website-in-your-browser)

[[↑] Back to top](#top)

### Describe the process from the time you type in a website's URL to it finishing loading on your screen.

- When I enter a website's URL, in the transport layer, it will ask a local DNS what is the IP of the provided URL. We know the IP of the local DNS server by the DHCP protocol, when a node connects to internet and gets an IP address.
- After that, a browser will try to establish a TCP connection with a server having the retrieved IP by 3-way handshake. When it establishes a TCP connection, the browser will form an HTTP request containing an HTTP header and body.
- After the HTTP request is sent and the server responds with an HTTP response, the browser will parse the HTTP response header and body, and will render the website. If the document contains additional assets, the browser will create HTTP requests for the assets and send them like above.

[[↑] Back to top](#top)

### What is the Internet?

> The Internet is a global system of interconnected computer networks that use the Internet protocol suite (TCP/IP) to link several billion devices worldwide. It is a network of networks that consists of millions of private, public, academic, business, and government networks of local to global scope, linked by a broad array of electronic, wireless, and optical networking technologies. The Internet carries an extensive range of information resources and services, such as the inter-linked hypertext documents and applications of the World Wide Web (WWW), electronic mail, telephony, and peer-to-peer networks for file sharing.

[[↑] Back to top](#top)

### What is TCP/IP?

> Transmission Control Protocol and Internet Protocol are communication protocols that define how data should travel across the web. This is like the transport mechanisms that let you place an order, go to the shop, and buy your goods. In our example, this is like a car or a bike (or however else you might get around).

[[↑] Back to top](#top)

### What is DNS?

- DNS stands for Domain Name System but the servers that handle DNS requests are called Domain Name Servers.

> Domain Name Servers are like an address book for websites. When you type a web address in your browser, the browser looks at the DNS to find the website's real address before it can retrieve the website. The browser needs to find out which server the website lives on, so it can send HTTP messages to the right place. This is like looking up the address of the shop so you can access it.

- As the definition above indicates, Domain Name Servers are required to find the *real* address for a website. The attractive URL in your browser address box isn't the *real* address. The *real* address is actually something that looks like this: `63.245.215.20` called an IP Address.
- Domain Name Servers return these IP addresses which represent a **unique** location on the web.

[[↑] Back to top](#top)

### What is HTTP? What are HTTP actions? List all HTTP actions that you know, and explain them.

> The Hypertext Transfer Protocol (HTTP) is an application protocol for distributed, collaborative, hypermedia information systems. HTTP is the foundation of data communication for the World Wide Web

> Hypertext Transfer Protocol is an application protocol that defines a language for clients and servers to speak to each other. This is like the language you use to order your goods.


- Sources:
    - [MDN: HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) => a lot of good stuff here. I could easily spend two hours going through every single link here

[[↑] Back to top](#top)


### What is CORS?

> Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell a browser to let a web application running at one origin (domain) have permission to access selected resources from a server at a different origin. A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, and port) than its own origin.

> Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.[1] A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos.[2] Certain "cross-domain" requests, notably Ajax requests, are forbidden by default by the same-origin security policy

[[↑] Back to top](#top)

### What is DHCP?



[[↑] Back to top](#top)


### Traditionally, why has it been better to serve site assets from multiple domains?

- It's because browsers usually have limits on the number of concurrent downloads from a domain at a moment. So, serving assets from multiple domains can increase the concurrent level.

[[↑] Back to top](#top)

### What is Long polling, how does it work, and why would you use it? Considering server and client resources, what is the main drawback of using long polling? Which HTML5 feature is the best alternative to long polling?

- The HTTP protocol is based on a request/response pattern, which means that the server cannot push any data to the client (i.e., the server can only provide data to the client in response to a client request). 
- **Long polling** is a web application development pattern used to emulate pushing data from server to client. When the long polling pattern is used, the client submits a request to the server and the connection then remains active until the server is ready to send data to the client. The connection is closed only after data is sent back to the client or connection timeout occurs. The client then creates a new request when the connection is closed, thus restarting the loop.
- There are two important drawbacks that need to be considered when using long polling:
  - Long polling requests are not different from any other HTTP request and web servers handle them the same way. This means that every long poll connection will reserve server resources, potentially maxing out the number of connections the server can handle. This can lead to HTTP connection timeouts.
  - Each web browser will limit the maximum number of connections web application can make. This means that your application load time and performance may be degraded.
- In HTML5, a useful alternative to long polling is using a **WebSocket**. A WebSocket is a protocol providing full-duplex communications channels over a single TCP connection. The WebSocket protocol makes possible more interaction between a browser and a web site, facilitating live content and eliminates the need for the long polling paradigm.
- Another potential answer could be **Server-sent DOM Events**. Which is method of continuously sending data from a server to the browser, rather than repeatedly requesting it. However, this HTML5 feature is not supported by Microsoft Internet Explorer, thus making it less attractive solution.

[[↑] Back to top](#top)

### What are the differences between Long-Polling, Websockets and Server-Sent Events?


- Sources:
    - [Stackoverflow: Long-Polling, WebSockets, SSE and Comet](https://stackoverflow.com/questions/11077857/what-are-long-polling-websockets-server-sent-events-sse-and-comet)

[[↑] Back to top](#top)

### Explain the following request and response headers:

**Diff. between Expires, Date, Age and If-Modified-...**


**Do Not Track**


**Cache-Control**


**Transfer-Encoding**


**ETag**


**X-Frame-Options**


[[↑] Back to top](#top)


### Explain the purpose of each of the HTTP request types when used with a RESTful web service.

- The purpose of each of the HTTP request types when used with a RESTful web service is as follows:
    - **GET:** Retrieves data from the server (should only retrieve data and should have no other effect).
    - **POST:** Sends data to the server for a new entity. It is often used when uploading a file or submitting a completed web form.
    - **PUT:** Similar to POST, but used to replace an existing entity.
    - **PATCH:** Similar to PUT, but used to update only certain fields within an existing entity.
    - **DELETE:** Removes data from the server.
    - **TRACE:** Provides a means to test what a machine along the network path receives when a request is made. As such, it simply returns what was sent.
    - **OPTIONS:** Allows a client to request information about the request methods supported by a service. The relevant response header is Allow and it simply lists the supported methods. (It can also be used to request information about the request methods supported for the server where the service resides by using a * wildcard in the URI.)
    - **HEAD:** Same as the GET method for a resource, but returns only the response headers (i.e., with no entity-body).
    - **CONNECT:** Primarily used to establish a network connection to a resource (usually via some proxy that can be requested to forward an HTTP request as TCP and maintain the connection). Once established, the response sends a 200 status code and a “Connection Established” message.

[[↑] Back to top](#top)

### Explain the difference between stateless and stateful protocols. Which type of protocol is HTTP? Explain your answer.

- A **stateless** communications protocol treats each request as an independent transaction. It therefore does not require the server to retain any session, identity, or status information spanning multiple requests from the same source. Similarly, the requestor can not rely on any such information being retained by the responder.
- In contrast, a **stateful** communications protocol is one in which the responder maintains “state” information (session data, identity, status, etc.) across multiple requests from the same source.
- **HTTP is a stateless** protocol. HTTP does not require server to retain information or status about each user for the duration of multiple requests.
- Some web servers implement states using different methods (using cookies, custom headers, hidden form fields etc.). However, in the very core of every web application everything relies on HTTP which is still a stateless protocol that is based on simple request/response paradigm.

[[↑] Back to top](#top)

### What is HTTP/2?


[[↑] Back to top](#top)

### Describe the key advantages of HTTP/2 as compared with HTTP 1.1.

- HTTP/2 provides decreased latency to improve page load speed by supporting:
    - Data compression of HTTP headers
    - Server push technologies
    - Loading of page elements in parallel over a single TCP connection
    - Prioritization of requests
- An important operational benefit of HTTP/2 is that it avoids the head-of-line blocking problem in HTTP 1.

[[↑] Back to top](#top)


### What is a “MIME type”, what does it consist of, and what is it used for? Provide an example.

- MIME is an acronym for Multi-purpose Internet Mail Extensions. It is used as a standard way of classifying file types over the Internet.
- Web servers and browsers have a defined list of MIME types, which facilitates transfer of files of a known type, irrespective of operating system or browser.
- A MIME type actually has two parts: a type and a subtype that are separated by a slash (/). For example, the MIME type for Microsoft Word files is `application/msword` (i.e., type is `application` and the subtype is `msword`).

[[↑] Back to top](#top)

### What’s the difference between GET and POST?

- Both are methods used in HTTP requests. Generally it is said that GET is to download data and PUT is to upload data. But we can do both downloading as well as uploading either by GET/POST.

**GET:**

- If we are sending parameters in a GET request to the server, then those parameters will be visible in the URL, because in GET, parameters are append to the URL. So there’s a lack of security while uploading to the server.
- We can only send a limited amount of data in a GET request, because the URL has its max limit and we can not append a long data string to the URL.

**POST:**


- If we are using POST then we are sending parameters in the body section of a request. If we send data after using encryption in the body of an http request, it’s quite a bit more secure.
- We can send a lot more data using POST.
Note: GET is faster in the case of just getting data using a static API call in cases where we don’t have to pass any parameters.


[[↑] Back to top](#top)

## Links

- [MDN: HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [Toptal: Web/Networking Interview Questions](https://www.toptal.com/web/interview-questions)
- [Guru99 Networking Interview Questions](https://www.guru99.com/networking-interview-questions.html)
- [https://www.geeksforgeeks.org/commonly-asked-computer-networks-interview-questions-set-1/](https://www.geeksforgeeks.org/commonly-asked-computer-networks-interview-questions-set-1/)
- [https://www.sanfoundry.com/computer-network-questions-answers/](https://www.sanfoundry.com/computer-network-questions-answers/)
- [https://www.softwaretestinghelp.com/networking-interview-questions-2/](https://www.softwaretestinghelp.com/networking-interview-questions-2/)
- [https://www.educba.com/computer-network-interview-questions/](https://www.educba.com/computer-network-interview-questions/)
- [https://www.educba.com/networking-interview-questions/](https://www.educba.com/networking-interview-questions/)
- [https://www.educba.com/network-security-interview-questions/](https://www.educba.com/network-security-interview-questions/)

[[↑] Back to top](#top)