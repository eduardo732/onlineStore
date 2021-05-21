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
    });
    this.intit();
  }

  intit() {
    this.repo.addModels([Product]);
    this.repo.addModels([Category]);
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
