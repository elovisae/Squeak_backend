const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5001;

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const registerLoginRoute = require("./routes/registerLogin");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

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
mongoose
  .connect(
    process.env.MONGO_URL,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", registerLoginRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
