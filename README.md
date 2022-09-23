# Squeak_backend
This is the squeak backend for https://github.com/JesperHagman/Squeak.git

## Table of content
* [TTHFW](#TFFHW)
* [API](#API)
* [Technologies](#Technologies) 
* [Authentification Flow](#authentification-flow)

## TTFHW for developers

``` bash
cd <your-workspace>
mkdir <directory-name>
cd <directory-name>
git clone https://github.com/elovisae/Squeak-backend.git
cd Squeak-backend
npm install
touch .env
code .

```

In the .env file, add the following to connect your mongoose db:


``` javascript
MONGO_URL = <your-mongo-db-connection-string>
```
*More info on how to find your connection string: https://www.mongodb.com/docs/guides/atlas/connection-string/*

Then, to start the server:

``` bash
nodemon server.js
```

## TTFHW for testers

``` bash
cd <your-workspace>
mkdir <directory-name>
cd <directory-name>
git clone https://github.com/elovisae/Squeak-backend.git
cd Squeak-backend
npm install
touch .env
code .

```

In the .env file, add the following to connect your mongoose db:


``` javascript
MONGO_URL = <your-mongo-db-connection-string>
```
*More info on how to find your connection string: https://www.mongodb.com/docs/guides/atlas/connection-string/*

``` bash
npm test 
```
or
``` bash
npm run test-vb
```

## API:
How to find the manual:
``` bash
nodemon server.js
```

In your browser:

`PORT/api-docs  # (Ex: http://localhost:5001/api-docs)`

There you go!
RTFM

## Technologies
- *Heroku* will be used to deploy this server. The server may be found at https://squeak-backend.herokuapp.com/
Visit https://devcenter.heroku.com/ to learn more about heroku 

- *Mongo DB* is used for the database
Visit https://www.mongodb.com/docs/ to learn more about Mongo DB

#### Dependencies:
- Bcrypt
- Cors
- Dotenv
- Express
- Mongoose

#### Dev dependencies:
- Husky
- Nodemon
- Swagger-jsdoc
- Swagger-ui-express
- Jest
- Supertest

