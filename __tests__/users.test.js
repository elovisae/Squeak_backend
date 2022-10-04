const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const PORT = process.env.TESTPORT || 5003;

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

describe("When POSTing to api/auth/login", () => {
  describe("given an email that doesn't exist", () => {
    it("it should give status 400", async () => {
      const user = {
        email: "not@existing.com",
        password: "secret",
      };
      container = request(server);
      await container.post("/api/auth/login").send(user).expect(400);
    });
  });

  describe("given the wrong password", () => {
    it("it should give status 400", async () => {
      const user = {
        email: "jon.doe@some.where",
        password: "wrongPassword",
      };
      container = request(server);
      await container.post("/api/auth/login").send(user).expect(400);
    });
  });
  describe("given the right user and password combo", () => {
    it("it should give status 200", async () => {
      const user = {
        email: "jon.doe@some.where",
        password: "secret",
      };
      container = request(server);
      await container
        .post("/api/auth/login")
        .send(user)
        .expect(200)
        .then((res) => {
          expect(res.body.user).toBeDefined();
          expect(res.body.status).toEqual(200);
          expect(res.body.message).toEqual("Inloggad");
          expect(res.body.loggedIn).toBeTruthy();
        });
    });
  });
});

describe("When testing users API", () => {
  describe("given GET /api/users", () => {
    it("should return status 200", async () => {
      container = request(server);
      await container
        .get("/api/users")
        .expect(200)
        .expect("Content-type", "application/json; charset=utf-8")
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body[0]._id).toBeDefined();
          expect(res.body[0].username).toBeDefined();
          expect(res.body[0].email).toBeDefined();
          expect(res.body[0].password).toBeDefined();
        });
    });
  });

  describe("given GET /api/users/{id}", () => {
    it("should return status 200", async () => {
      const userID = "631aea6027af069a690702bc";
      container = request(server);
      await container
        .get(`/api/users/${userID}`)
        .expect(200)
        .expect("Content-type", "application/json; charset=utf-8")
        .then((res) => {
          expect(res.body._id).toEqual(userID);
          expect(res.body.username).toEqual("jondoe1");
          expect(res.body.email).toEqual("jon.doe@some.where");
        });
    });
  });

  describe("given GET /api/users/{id} with a false ID", () => {
    it("it should return status 404", async () => {
      const userID = "1";
      container = request(server);
      await container.get(`/api/users/${userID}`).expect(404);
    });
  });

  describe("given PUT /api/users/{id}", () => {
    it.skip("should return status 200", async () => {
      const userID = "631aea6027af069a690702bc";
      const user = {
        name: "Jon Doe",
        username: "jondoe1",
        email: "jon.doe@somewhere.se",
        password: "secret",
        phone: "713",
      };
      const token = {
        user: {
          _id: "631aea6027af069a690702bc",
          name: "Jon Doe",
          username: "jondoe1",
          email: "jon.doe@some.where",
          password: "secret",
          phone: "712387383",
          createdAt: "2022-09-09T07:25:20.271Z",
          updatedAt: "2022-09-09T07:25:20.271Z",
          __v: 0,
        },
        status: 200,
        message: "Inloggad",
        loggedIn: true,
      };

      container = request(server);
      await container
        .put(`/api/users/${userID}`)
        .set("Authorization", token)
        .send(user)
        .expect(200)
        .expect("Content-type", "application/json; charset=utf-8");
    });
  });

  describe("given PUT /api/users/{id} without token", () => {
    it("should return status 401", async () => {
      const userID = "6319d202b97e4383784137db";
      const user = {
        name: "Jon Doe",
        username: "jondoe1",
        email: "jon.doe@somewhere.se",
        password: "secret",
        phone: "713",
      };
      container = request(server);
      await container.put(`/api/users/${userID}`).send(user).expect(401);
    });
  });

  describe("given DELETE /api/users/{id} without token", () => {
    it("should return status 401", async () => {
      const userID = "6319d202b97e4383784137db";
      container = request(server);
      await container.delete(`/api/users/${userID}`).expect(401);
    });
  });
});
