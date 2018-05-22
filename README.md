# User Tracker Server

This is a server application to track users. The Application Public Interface has the following features:

- Add user: Add a user to database.
- Add connection: Add connection between users.
- User connections: Retrieve the users connected with the given user.
- Stats: Retrieve the users with the percentage of user connected with each user.

## Tech considerations
To develop the server, I choose Node.js due to  his I/O non-blocking, ideal to applications with a high numbers of I/O. Express.js is the standar framework to build web applications on Node.js

MongoDB is the chosen database. This NoSQL database has been well integrated with Node.js and has a high performance and dinamyc scheme.

## Installation

- Install Node.js 8+ https://nodejs.org/es/download/

- Install MongoDB Community server https://www.mongodb.com/download-center#community

## Deploy
When you has installed Node and MongoDB, we proceed to deploy our server on a local machine.

On Linux, type
~~~
sudo service mongod start
~~~
Acces to project root folder and type
~~~
npm install
npm start
~~~
This start a local server on 3000 port.

## Endpoints
- */adduser/* A post route to add a new user to the database. You must provide a string param called *username* on the body request.

- */addconnection/* A put route to add a connection between two existing user. You must provide two string params on the request body called *username_a* and *username_b*.

- */userconnections/* A get route to retrieve the users connected with the given user. You must provide a string param called *username* on the body request.

- */stats/* A get route to retrieve all users with the percentage of connections about the total number of users.