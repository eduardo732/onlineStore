import express from "express";
import http from "http";
import cors from "cors";
import env from "../config/env";
import morgan from "morgan";
import path from "path";
import index from "../routes/index.route";
import product from "../routes/product.route";
import category from "../routes/category.route";

export class App {
  private app: express.Application;
  private port: number;
  private server!: http.Server;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.middlewares();
    this.routes();
  }

  getApp(): express.Application {
    return this.app;
  }

  getServer(): http.Server {
    return this.server;
  }

  middlewares(): void {
    // this.app.use(cors());
    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type"
      );
      next();
    });
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(morgan("dev"));
    this.app.use("/", express.static(path.join(process.cwd(), "/public/")));
    
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

  listen() {
    this.server = this.app.listen(this.port);
    console.log(`
      ################################################
      🛡️  Server listening on port: ${this.port} 🛡️
      ################################################
        `);
  }
}
