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

### What is DHCP?



[[↑] Back to top](#top)


### Traditionally, why has it been better to serve site assets from multiple domains?

- It's because browsers usually have limits on the number of concurrent downloads from a domain at a moment. So, serving assets from multiple domains can increase the concurrent level.



### What are the differences between Long-Polling, Websockets and Server-Sent Events?


### Explain the following request and response headers:

**Diff. between Expires, Date, Age and If-Modified-...**


**Do Not Track**


**Cache-Control**


**Transfer-Encoding**


**ETag**


**X-Frame-Options**


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