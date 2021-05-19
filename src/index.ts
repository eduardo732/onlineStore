import { SqlRepo } from './loaders/mysql';
import { App } from "./loaders/server";

import env from "./config/env";

function main() {
    const app = new App(env.port);
    const db = new SqlRepo();
    db.authenticate(app);
}


main();
