import request from "supertest";
import { app, db } from "../index";

beforeAll((done) => done());
afterAll(() => {
  db.close();
});
describe("Products Routes", () => {
  it("Show all Products", async (done) => {
    const res = await request(app.get).get("/api/product/findAll");
    expect(res.status).toBe(200);
    done();
  }, 10000);
});
