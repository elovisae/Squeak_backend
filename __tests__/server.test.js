const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const PORT = 5001;

let server = app;

beforeAll((done) => {
  server = app.listen(PORT, (err) => {
    console.log("Server is running on " + PORT);
    if (err) return done(err);
    done();
  });
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("connected to mongoDB"))
    .catch((err) => console.log(err));
});

afterAll(async () => {
  // await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  await mongoose.disconnect();
  await server.close();
});

describe("When testing post API", () => {
  describe("given GET /api/posts", () => {
    it("should return status 200", () => {
      container = request(server);
      container
        .get("/api/posts")
        .expect(200)
        .expect("Content-type", "application/json; charset=utf-8")
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body[0]._id).toBeDefined();
          expect(res.body[0].title).toBeDefined();
          expect(res.body[0].username).toBeDefined();
          expect(res.body[0].desc).toBeDefined();
        });
    });
  });
});

describe("When testing post API", () => {
  describe("given POST /api/posts", () => {
    it("should return status 200", () => {
      const testPost = {
        title: "hitle",
        desc: "This is the content",
        username: "jondoe1",
      };
      container = request(server);
      container
        .post("/api/posts")
        .send(testPost)
        .expect(200)
        .expect("Content-type", "application/json; charset=utf-8")
        .expect(200, /title/)
        .expect(function (err, res, done) {
          if (err) return done(err);
          else console.log(res.body);
          done();
        });
    });
  });
});
