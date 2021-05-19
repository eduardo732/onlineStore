import express from "express";
import env from "../config/env";
import morgan from 'morgan';
import index from "../routes/index.route";
import product from "../routes/product.route";
import category from "../routes/category.route";

export class App {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(morgan('dev'));
  }
  routes(): void {
    /// Routes
    this.app.use(env.api.prefix, index);
    this.app.use(env.api.prefix, product);
    this.app.use(env.api.prefix, category);

    /// catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      const err: any = new Error("Not Found");
      err["status"] = 404;
      next(err);
    });

    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(err.status || 500);
        res.json({
          errors: {
            message: err.message,
          },
        });
      }
    );
  }

  async listen() {
    await this.app.listen(this.port);
    console.log(`
      ################################################
      🛡️  Server listening on port: ${this.port} 🛡️
      ################################################
        `);
  }
}