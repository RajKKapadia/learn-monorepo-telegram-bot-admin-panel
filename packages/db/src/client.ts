import { appConfig } from "@repo/config";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const { Pool } = pg;

const pool = new Pool({
    connectionString: appConfig.database.url
});

export const db = drizzle(pool, { schema });

export type DbClient = typeof db;
