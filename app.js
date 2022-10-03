const express = require("express");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");

const registerLoginRoute = require("./routes/registerLogin");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API for Squeak",
      description: "Information about the API and the valid HTTP methods",
      version: "0.0.0 ",
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocument = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api/auth", registerLoginRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);


module.exports = app;
