import request from "supertest";
import { app, db } from '../index';


describe("Products Routes", () => {
  afterAll(() => {
    db.close();
  });
  it("Show all Products", async done => {
     const res = await request(app.get).get("/api/product/findAll");
     expect(res.status).toBe(200);
     done();
  });
});
