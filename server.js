const app = require("./app");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const PORT = process.env.PORT || 5001;

const express = require("express");
app.use("/images", express.static(path.join(__dirname, "/images")));
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file uploaded");
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
