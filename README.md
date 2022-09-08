# Squeak_backend
This is the squeak backend for https://github.com/JesperHagman/Squeak.git

## TTFHW - Get started

``` javascript
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

``` javascript
nodemon server.js
```



