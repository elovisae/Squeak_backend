const express = require("express");
const app = express();
const PORT = "5001";
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const registerLoginRoute = require("./routes/registerLogin");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

dotenv.config();
app.use(express.json());
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
  console.log("Server is running");
});
