import request from "supertest";
import { app, db } from "../index";

afterAll(async (done) => {
  await db.getRepo().close();
  app.getServer().close();
  done();
});

describe("Products Routes", () => {
  it("Get all Products", async (done) => {
    const res = await request(app.getApp()).get("/api/product/findAll");
    expect.assertions(3);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.status).toBe(200);
    done();
  });
  it("404 Not Found products", async (done) => {
    const res = await request(app.getApp()).get("/api/product/find");
    expect.assertions(2);
    expect(res.body.length).not.toBeDefined();
    expect(res.status).toBe(404);
    done();
  });
});

describe("Categories Routes", () => {
  it("Get all Categories", async (done) => {
    const res = await request(app.getApp()).get("/api/category/findAll");
    expect.assertions(3);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.status).toBe(200);
    done();
  });
  
});
