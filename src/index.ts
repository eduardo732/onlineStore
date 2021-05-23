import { SqlRepo } from './loaders/mysql';
import { App } from "./loaders/server";

import env from "./config/env";


export const app = new App(env.port);
export const db = new SqlRepo();
    
db.authenticate(app);


