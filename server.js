const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5001;

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

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
