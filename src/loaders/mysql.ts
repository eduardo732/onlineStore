import { App } from "./server";
import env from "../config/env";
import { Sequelize } from "sequelize-typescript";

export class SqlRepo {
  private repo: Sequelize;

  constructor() {
    this.repo = new Sequelize(env.db.name, env.db.user, env.db.pass, {
      host: env.db.host,
      dialect: "mysql",
      models: [__dirname + "/src/models/*.model.ts"],
      modelMatch: (filename, member) => {
        return (
          filename.substring(0, filename.indexOf(".model")) ===
          member.toLowerCase()
        );
      },
    });
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
