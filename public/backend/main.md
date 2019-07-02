# Documentation of the Backend part

> Deliverable D1

## General group information

| Member n. | Role          | First name | Last Name | Matricola | Email address   |
| --------- | ------------- | ---------- | --------- | --------- | --------------- |
| 1 | Administrator | Alberto Mario | Bellini | 893750 | albertomario.bellini@mail.polimi.it |
| 2 | Member | Luna Alessia | Rota | 895974 | lunaalessia.rota@mail.polimi.it |
| 3 | Member | Gianpaolo | Di Pietro | 899025 | gianpaolo.dipietro@mail.polimi.it |


## Links to other deliverables

- Deliverable D0: the web application is accessible at [this address](https://bobooky.herokuapp.com).
- Deliverable D2: the YAML file containing the specification of the app
  API can be found at [this address](https://bobooky.herokuapp.com/backend/spec.yaml).
- Deliverable D3: the SwaggerUI page of the same API is available at
  [this address](https://bobooky.herokuapp.com/backend/swaggerui).
- Deliverable D4: the source code of D0 is available as a zip file at
  [this address](https://bobooky.herokuapp.com/backend/app.zip).
- Deliverable D5: the address of the online source control repository is
  available [this address](https://github.com/ab3llini/BoBooky). We hereby declare that this
  is a private repository and, upon request, we will give access to the
  instructors.



## Specification
### Web Architecture

> *Describe here, with a diagram, the components of your web application and how
they interact. Highlight which parts belong to the application layer, data layer
or presentation layer.*

![alt text](assets/architecture.png)

Our application is composed by three main components: Application, Data and Presentation layers.

- The **Application Layer** is where the NodeJs server runs and handles all the API requests and serves all the static pages.
We generated our raw server using the swagger tools and from there we started building our application functionality.
We serve everything within the /public directory using the express framework and we handle all API requests using the default swagger router.
Of course we had to implement ourselves all the API Services in order to respond to user requests.
For this purpose we had to use the PostgresSQL nodejs framework to perform queries to our database.
All queries are stored in the /other/db/query.js file and are executed from a database controller invoked by all the API Services.
To provide security we decided to exploit the PassportJS framework and we integrated it with the Swagger Security module in order to 
restrict access to certain API requests such as those who request private and/or sensible information such as private addresses or wishlists.

- The **Data Layer** consists of a PostgreSQL database deployed on our Heroku VM instance. 
It is invoked by the NodeJS PostgreSQL Driver running on the application server and responds to all the queries with the requested data.
It has been filled with data coming from the publicly available dataset GoodBooks10K ([available on github](https://github.com/zygmuntz/goodbooks-10k)). 
The data has been first fully processed with Python scripts in order to filter out missing values, descriptions and much more. 
In the end our DB consists of approximately 700 books and 75 authors with plenty of genres, themes, images, descriptions and much more.
Furthermore, in order to create a reasonable amount of events, we run scripts to create them randomly. We wanted them to have realistic descriptions 
though and for this reason we exploited [OpenAI's GPT-2 Model](https://openai.com/blog/better-language-models/) to produce them given our randomly generated context.
We will dive into the database schema details later on in this document.

- Finally the **Presentation Layer** consists of what the user see and interact with. It is made up by all the pages located within the /public folder and acts as the front-end layer of the application.
Throughout our asynchronous front-end api interface (/public/lib/utils/api.js) we make requests to the Application Layer and, once provided with the responses, we render content on the screen.
In order to have a much clear URL schema we decided to name every HTML file in our project structure as index.html within it's relative folder. 
This way we can navigate through the website by never seeing an url ending with .html since the browser will look automatically for the index in every folder.

> *How did you ensure that HTML is not rendered server side?*

Our backend has been developed using NodeJs and it's purpose it to serve static pages and handle API requests by interacting with the database.
For this reason we do not perform any kind of rendering on the server side and all HTML is rendered directly within the browser of the user.
We have created many HTML components (located in /public/components) that are loaded with jQuery once the scripts are executed and are not injected by the server.
Thereby we do not perform any kind of remote rendering as many other web services do.
Components such as the navbar, footer, dynamic page content (such as search results) and many more are loaded dynamically 
using a collection of tools that we have developed ourselves (public/lib/js/utils/template_loader.js).


### API

#### REST compliance

> *Describe here to what extent did you follow REST principles and what are the
reasons for which you might have decided to diverge. Note, you must not describe
the whole API here, just the design decisions.*

We followed the REST principles as much as possible and we tried to separate as much as possible the client from the server.
With our architecture the code on the client side can be changed at any given time without affecting the code written on the server.
This ensures scalability and modularity between the two: as long as each side knows what format of messages to send to the other, they can be kept modular and separate.
Furthermore with with our RESTFul architecture we can have multiple clients making requests to the server and ensuring they all get the same responses.
Nevertheless we ensured the statelessness of our API Interface since neither the client nor the server need to know the other's state in order to work properly.
Messages are exchanged atomically: to each request corresponds a response that does not depend on previous requests.


#### OpenAPI Resource models

> *Describe here synthetically, which models you have introduced for resources.*

For the API resources we have created different models in order to provide a complete and accurate specification:
- **User**: All information about the user that we need to send to the application server in order to register the new user.
A part of this model is used also for instance in the reviews in order to display the name of the person that wrote that review
- **Address**: All the shipping information about the user such as the information for the location of an event.
- **Book**: This one contains all the information about one book with also the list of genres, themes and the complete
information about the user that wrote the book.
- **Genre**
- **Theme**
- **Author**: All the information about an author with a short bio
- **Review**: Can be a book review or an author review and has the title, description, and rating about one of the users
- **Order**: Contains the information about a past order with the shipping address
- **Event**: Contains the name, location and description of the event with also the author and the book that will be presented at the event
- **Cart**: Contains the list of books with the quantity that the current user has inside his cart

### Data model

> *Describe with an ER diagram the model used in the data layer of your web
   application. How these map to the OpenAPI data model?*

![alt text](assets/ER.png)

## Implementation

### Tools used

For what concerns implementation tools we have widely adopted the following ones:

- JetBrain's **WebStorm**: HTML, JS, CSS developing. Great tool with plenty of support for debugging code.
- JetBrain's **DataGrip**: PostgreSQL database design and organization, query development and data injection.
- JetBrain's **PyCharm**: Python scripting to preprocess data, inject data into the database and creation of events using GPT-2
- **Restlet Studio**: Online OpenAPI IDE used to design our API and generating the YAML specification.
- **Swagger Editor**: Onlien tool provided by swagger to convert the YAML file into the base NodeJS server.
- **SourceTree** : Application to help ourselves working with git forks, merges and general VCS operations.


### Languages
- **SCSS**: Extension of the css language that we used with SASS preprocessor in order to ease the styling of web pages. 
We chose to adopt this programming language for its simplicity
in organizing the code with the help of variables, math expression, helpers and so on. with SCSS we are able to write
more flexible, structured and readable code. 
- **CSS**: Web page styling
- **HTML** : Web page skeleton structure.
- **JavaScript**: General purpose scripting.
- **jQuery**: Fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal
and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API. With jQuery we can write
less code for the same operation that we generally have done with the usual javascript language.
We used it whenever possible as javascript superset to make API calls, frontend session handling and web page logic.

### Framweokrs

#### Backend:
- **NodeJS**: Is the RunTime environment of our backend application
- **Express**: This is our core web application framework that we have chosen for its minimality and simplicity.
- **Express-session**: We used this framework for building session middleware in order to do different pre-processing
on the incoming requests for different pages.
- **Body-parser**: We used this framework for extracting the body portion of an incoming POST or PUT request and parsing
the json into java objects.
- **PassportJS**: With passport we managed all the authentication phase, we built a login strategy (passport-local strategy)
that makes usage of username and password authentication and with this framework we can provide an encrypted
cookie for the user session.
- **Swagger-tools**: With this framework we can integrate our openAPI specification into the backend server application.
swagger tools takes care of reading and parsing the Swagger specification file, create the handlers for the different
requests, parsing and checking the body schemas and so on.
- **pg**: This framework is used for manage the connection to the database and to execute query and fetch data
for the api implementation

#### Frontend:
- **Bootstrap** : Twitter's bootstrap helped us developing a responsive, mobile-first web application. It saved us hours of development of responsive design features thanks to its amazing grid system.
- **Font-Awesome:** Used for most of the icons present in the web app. Allowed us to treat icons as text by changing size and color on the fly.
- **Multislider**: Used for making carousels in the some pages. Freely available [here](https://www.multislider.info/)



### Discussion

> *How did you make sure your web application adheres to the provided OpenAPI specification?*

Our web application is built using swagger-tools and express. All the handlers for the http request to the api section
are created automatically starting from the API specification document. The body of all the request is parsed by the tool
itself and is checked against the model inside the specification, in this way we can ensure a complete match between
application server and API specification.

> *Why do you think your web application adheres to common practices to partition
the web application (static assets vs. application data)*

Our application has a collection of static assets (such as pages) that are served whenever requested to the user. 
Application data is handled by jQuery scripting and integrated in these static pages as javascript module imports.
Data is totally decoupled from static pages. It is not stored within any HTML file or in any other form.
Data is entirely served from our Application Server & Database by complying to our RESTFul interface with specific requests.
These requests are packed inside specific javascript modules that are then imported into web pages and executed by the Client JavaScript VM.
These modules do not contain any form of static data but provide only a neat and extensible mean to communicate with the Server through our API.

> *Describe synthetically why and how did you manage session state, what are the
state change triggering actions (e.g., POST to login etc..).*

The sessions are managed by the framework passport-js. 
The framework provides multiple authentication strategies and we chose to adopt the classic username/password schema.
Upon POST login requests, the backend server performs a series of operations to check if the username and the slated SHA256 hash match a user in our database.
If there is a match it means that the user has entered valid credentials and the authentication procedure can continue.
The next step is to create an HTTP Secure cookie that is then sent back to the client. 
Each subsequent request made by the user embeds automatically this HTTP Secure cookie giving the possibility to the user 
to reach his personal area and make data-sensitive requests. 
These HTTP Secure cookies are extremely safe and cannot be read or edited in any way from any JavaScript script.
For this very reason our session are very robust and safe, ensuring data integrity and privacy protection.
This cookie has a predefined timeout and when it expires (or when the user sends a logout request) it is automatically deleted resulting in the user being logged out.

Furthermore its worth highlighting that, upon successful login, we set a cookie even from the front end side 
(i.e. a cookie that is created and managed by javaScript) to store non-sensitive information such as username, email and birth-date for rendering purpose only.
This latter cookie is not responsible in any way for authenticating the user or making any request and cannot be used to exploit our security scheme.

> *Which technology did you use (relational or a no-SQL database) for managing
the data model?*

We have used __PostgreSQL__ that is a relational SQL database. 
For the sake of simplicity, scalability and integration we adopted the freely available Heroku PostgreSQL database.
It integrates seamlessly with our application since it is stored on Heroku as well. 
Furthermore, since both servers (application + database) are running on the same VM instance, 
there is no need to use internet for the application server to communicate with the database.
Instead all queries are performed within the same local network (probably Heroku uses linux VMs with unix sockets) resulting in faster performances.

## Other information

### Task assignment

> *Describe here how development tasks have been subdivided among members of the
group*


- Alberto Mario Bellini worked both on the backend and on the frontend of the application.
For what concerns the backend he helped developing the OpenAPI specification (50%) and implemented 30% of the queries to the database.
He focused then his attention on how to integrate PassportJS with the application and how to perform user authentication.
He had to deal with cookies and PassportJS Integration and later he had to bind the user session with the API Specification to secure the queries.
In order to achieve the latter task he implemented the swagger security layer and bound it with the PassportJS authentication strategy.
For what concerns the frontend side of the application Alberto implemented the core (html skeletons, scss style and script implementation) of most of the pages (70%) 
created by our designer. 
It was anyway a synergy since small refinements were made even by other components of the group to the page that he had developed in the first place.
Alberto took care even of developing a series of utilities for interacting with the API Interface and others to load HTML components and handle user session.

- Gianpaolo Di Pietro worked both on the frontend and backend of the application.
For the backend part he wrote the API specification (5% of the time) and he implemented most of the queries in order to map
the specification to the database update and fetch queries (65% of the time). In addition he implemented the middleware application
and the login and authentication functionality of the website (5% of the time).
For what concerns the frontend Gianpaolo implemented some of the web pages in all of their component (html schema, scss style and
javascript implementation) and all the script necessary to communicate with the backend application (20% of the time).
He also wrote some python script for preprocess all the data about the books, authors and events that we have in the
database and upload them using SQL queries (5% of the time).



### Analysis of existing API

The first API specification that inspired our is the Swagger Petstore, an example API that is provided by the swagger editor.
With this example we have seen how a specification is composed, it's main components, how to define a request of different
types (POST, GET, PUT, DELETE, ...), how to declare which request has to be secure, how to define a security schema and
how to define the structure for the body of the request, all the parameters inside url, header and query, and how to define
the different response type for the request.

We then took great inspiration from the OpenAPI Initiative [GitHub repository](https://github.com/OAI) for things such as 
guidelines for naming projects, tools, or organizations and more. We then explored a bit the [examples](https://github.com/OAI/OpenAPI-Specification/tree/master/examples) 
available within the repository to get our first impression on the work we were going to be doing.

We finally built the API specification with the help of [RestLet Studio](https://studio.restlet.com/) that provides a user-friendly
interface and a template for writing the specification. This one speeds up the writing process of the application and in
this way we were sure that the API was properly written.  


### Learning outcome

> *What was the most important thing all the members have learned while developing this part of the project, what questions remained unanswered, how you will use what you've learned in your everyday life?*
  
 - __Alberto Mario Bellini__ learned the principles and the state of the art standards for making a fully working websites. He had used web technologies in the past but 
 never had the possibility to adopt a proper OpenAPI Specification in order to interact with the backend. This is something that he will carry in his personal toolbox forever.
 Furthermore he learnt the power of NodeJS and it's flexibility when it comes to deploying a web application. Its seamless interaction with all the components is just majestic and he will definitely use it again in the future.
 Nevertheless he discovered the robustness of the bootstrap framework and the incredible things that you can achieve with it. It is intuitive and simple to use, but at the same time you can use it 
 to build professional applications ready to be deployed in real life. It saves you countless hours of work and debugging and is a must-know framework when it comes to web developing.
 
 
 - __Gianpaolo Di Pietro__ learned how is a website structured, what are the main components and how to make them communicating together.
 The most important thing that he learned is how to define and properly implement an API that works through http requests,
 This one can be used not only in website but every time that 2 applications have to exchange data.
 He also learned what is NodeJS, how to use this framework to build a powerful application server with no mach effort from the
 coding point of view.
 Finally he discovered the elasticity and potentiality of the bootstrtap framework, how to build websites that are beautiful,
 and responsive to different screen sizes, how to manage the communication between the application server, the database and
 the front-end application.