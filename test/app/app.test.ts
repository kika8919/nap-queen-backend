import { expect } from "chai";
import supertest from "supertest";
import { createServer } from "../../src/config/express";

describe("Server and API Unit Testing", async () => {
  const app = createServer();
  let generatedBlogPostId: string;

  before(() => {});

  after(() => {
    process.exit(0);
  });

  it("GET /health should return a 200 status code", async () => {
    const res = await supertest(app).get("/health");
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("UP");
  });

  it("CORS test - Incorrect host should return a 500 status code", async () => {
    const res = await supertest(app)
      .get("/health")
      .set("Origin", "http://customhost.com");
    expect(res.status).to.equal(500);
    expect(JSON.parse(res.text).errors.message).to.equal("Not allowed by CORS");
  });

  it("GET /api/invalid-path should return a 404 status code", async () => {
    const res = await supertest(app).get("/api/invalid-path");
    expect(res.status).to.equal(404);
  });

  describe("Blog Post API", async () => {
    // CREATE POSTS
    it("POST /api/posts should return joi validation error", async () => {
      const requestBody = {
        name: "Sample Resource",
        title: "test title",
        category_id: "6539fec48da5f370d72a508a",
        content: "This is a sample resource.",
      };
      const res = await supertest(app).post("/api/posts").send(requestBody);
      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("errors");
      expect(res.body.errors).to.have.property("message");
    });

    it("POST /api/posts should return 400 status code for wrong category_id", async () => {
      const requestBody = {
        title: "test title",
        category_id: "6539fec48da5f370d72a508b",
        content: "This is a sample resource.",
      };
      const res = await supertest(app).post("/api/posts").send(requestBody);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error");
      expect(res.body.error).to.be.equal("Invalid category_id");
    });

    it("POST /api/posts should return 200 status code", async () => {
      const requestBody = {
        title: "test title",
        category_id: "6539fec48da5f370d72a508a",
        content: "This is a sample resource.",
      };
      const res = await supertest(app).post("/api/posts").send(requestBody);
      generatedBlogPostId = res.body._id;
      expect(res.status).to.equal(200);
      expect(res.body.title).to.be.equal(requestBody.title);
      expect(res.body.content).to.be.equal(requestBody.content);
      expect(res.body.category_id).to.be.equal(requestBody.category_id);
    });

    // GET LATEST POSTS
    it("GET /api/posts/latest with incorrect apikey should return 200 status code", async () => {
      const res = await supertest(app)
        .get("/api/posts/latest")
        .set("x-api-key", "wrongApiKey");
      expect(res.status).to.equal(403);
      expect(res.body).to.have.property("error");
      expect(res.body.error).to.be.equal("Invalid API key");
    });

    it("GET /api/posts/latest with correct apikey should return 200 status code", async () => {
      const res = await supertest(app)
        .get("/api/posts/latest")
        .set("x-api-key", process.env.API_KEY! || "apikeysecret");
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.be.equal(true);
      expect(res.body.length).to.be.greaterThanOrEqual(1);
      expect(
        res.body.filter((post: any) => post.id == generatedBlogPostId).length
      ).to.be.equal(1);
    });

    // GET ALL POSTS
    it("GET /api/posts should return a 200 status code", async () => {
      const res = await supertest(app).get("/api/posts");
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      expect(res.body.length).to.be.greaterThanOrEqual(1);
    });

    // GET POST BY ID
    it("GET /api/posts/:id with invalid objectId should return a 500 status code", async () => {
      const res = await supertest(app).get("/api/posts/aaaa0181460f107ce5dddd");
      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("errors");
      expect(res.body.errors).to.have.property("message");
      expect(res.body.errors.message).to.equal('"id" must be a valid mongo id');
    });

    it("GET /api/posts/:id should return a 200 status code", async () => {
      const res = await supertest(app).get(`/api/posts/${generatedBlogPostId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("_id");
      expect(res.body._id).to.equal(generatedBlogPostId);
    });

    // UPDATE POST
    it("PUT /api/posts/:id  with incorrect id should return 'post with input id not found'", async () => {
      const requestBody = {
        title: "test title",
        content: "This is a sample resource.",
      };
      const res = await supertest(app)
        .put(`/api/posts/6539fec48da5f370d72a508a`)
        .send(requestBody);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.be.equal("post with input id not found");
    });

    it("PUT /api/posts/:id should return joi validation error for missing title", async () => {
      const requestBody = {
        // missing title
        content: "This is a sample resource.",
      };
      const res = await supertest(app)
        .put("/api/posts/6539fec48da5f370d72a508a")
        .send(requestBody);
      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("errors");
      expect(res.body.errors).to.have.property("message");
    });

    it("PUT /api/posts/:id should return 200 status code", async () => {
      const requestBody = {
        title: "test title",
        content: "This is a sample resource.",
      };
      const res = await supertest(app)
        .put(`/api/posts/${generatedBlogPostId}`)
        .send(requestBody);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("_id");
      expect(res.body._id).to.be.equal(generatedBlogPostId);
      expect(res.body.title).to.be.equal(requestBody.title);
      expect(res.body.content).to.be.equal(requestBody.content);
    });

    // DELETE POST
    it("DELETE /api/posts/:id with invalid objectId should return a 500 status code", async () => {
      const res = await supertest(app).delete(
        "/api/posts/aaaa0181460f107ce5dddd"
      );
      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("errors");
      expect(res.body.errors).to.have.property("message");
      expect(res.body.errors.message).to.equal('"id" must be a valid mongo id');
    });

    it("DELETE /api/posts/:id with valid objectId should return 200 status code", async () => {
      const res = await supertest(app).delete(
        `/api/posts/${generatedBlogPostId}`
      );
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.be.equal("success");
    });

    it("DELETE /api/posts/:id with valid objectId that is not present in DB, should return 'post with input id not found'", async () => {
      const res = await supertest(app).delete(
        `/api/posts/${generatedBlogPostId}`
      );
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.be.equal("post with input id not found");
    });
  });

  describe("Category API", async () => {
    let generatedCategoryId: string;

    // CREATE CATEGORY
    it("POST /api/category should return 200 status code", async () => {
      const requestBody = {
        category: "test category",
      };
      const res = await supertest(app).post("/api/category").send(requestBody);
      generatedCategoryId = res.body._id;
      expect(res.status).to.equal(200);
      expect(res.body.category).to.be.equal(requestBody.category);
    });

    // GET ALL CATEGORIES
    it("GET /api/category should return a 200 status code", async () => {
      const res = await supertest(app).get("/api/category");
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      expect(res.body.length).to.be.greaterThanOrEqual(1);
    });

    // UPDATE CATEGORY
    it("PUT /api/category/:id should return 200 status code", async () => {
      const requestBody = {
        category: "test category 2",
      };
      const res = await supertest(app)
        .put(`/api/category/${generatedCategoryId}`)
        .send(requestBody);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("_id");
      expect(res.body._id).to.be.equal(generatedCategoryId);
    });

    // DELETE CATEGORY
    it("DELETE /api/category/:id with with valid objectId should return 200 status code", async () => {
      const res = await supertest(app).delete(
        `/api/category/${generatedCategoryId}`
      );
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.be.equal("success");
    });
  });
});
