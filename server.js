const express = require("express");
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5001;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const registerLoginRoute = require("./routes/registerLogin");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

dotenv.config();
app.use(express.json());
app.use(cors())
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
