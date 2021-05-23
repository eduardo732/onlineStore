import { App } from "./server";
import env from "../config/env";
import { Sequelize } from "sequelize-typescript";
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

export class SqlRepo {
  private repo: Sequelize;

  constructor() {
    this.repo = new Sequelize(env.db.name, env.db.user, env.db.pass, {
      host: env.db.host,
      dialect: "mysql",
      pool: {
        max: 3,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });
    this.intit();
  }

  intit() {
    this.repo.addModels([Product, Category]);
  }

  close(): void {
    this.repo.close()
      .then(() => console.log("Db closed"))
      .catch(error => console.log(error));
  }

  authenticate(app: App): void {
    this.repo
      .authenticate()
      .then(() => {
        app.listen();
      })
      .catch((err) => console.error(err));
  }
}
