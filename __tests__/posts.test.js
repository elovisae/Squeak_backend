const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const PORT = process.env.TESTPORT || 5002;

let server = app;

beforeAll((done) => {
  server = app.listen(PORT, (err) => {
    if (err) return done(err);
    done();
  });
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err));
});

afterAll(async () => {
  // await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  await mongoose.disconnect();
  await server.close();
});

describe("When testing post API", () => {
  describe("given GET /api/posts", () => {
    it("should return status 200", async () => {
      container = request(server);
      await container
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
  describe("given GET /api/posts/{id}", () => {
    it("should return status 200", async () => {
      const testId = "6319f2c56b62b8cd9b11135f";
      container = request(server);
      await container
        .get(`/api/posts/${testId}`)
        .expect(200)
        .expect("Content-type", "application/json; charset=utf-8")
        .then((res) => {
          expect(res.body._id).toEqual(testId);
          expect(res.body.title).toEqual("Post title");
          expect(res.body.title).not.toEqual("bla bla bla");
          expect(res.body.username).toEqual("jondoe1");
          expect(res.body.desc).toEqual("This is the content");
        });
    });
  });
});

describe("When testing post API", () => {
  describe("given GET /api/posts?user={username}", () => {
    it("should return status 200", async () => {
      const testUser = "jondoe1";
      container = request(server);
      await container
        .get(`/api/posts?user=${testUser}`)
        .expect(200)
        .expect("Content-type", "application/json; charset=utf-8")
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBeGreaterThan(0);
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
    it("should return status 200", async () => {
      const random = Math.floor(Math.random() * 10000000000).toString(36);
      const testPost = {
        title: random,
        desc: "This is the content",
        username: "jondoe1",
      };
      container = request(server);
      await container
        .post("/api/posts")
        .send(testPost)
        .expect(200)
        .expect("Content-type", "application/json; charset=utf-8")
        .then((res) => {
          expect(res.body._id).toBeDefined();
          expect(res.body.title).toEqual(testPost.title);
          expect(res.body.desc).toEqual(testPost.desc);
          expect(res.body.username).toEqual(testPost.username);
        });
    });
  });
});

describe("When testing post API", () => {
  describe("given DELETE /api/posts/{id} without being logged in", () => {
    it("should return status 401", async () => {
      const testID = "6329b78bc4e08d7d04a555de";
      container = request(server);
      await container.delete(`/api/posts/${testID}`).expect(401);
    });
  });
});
