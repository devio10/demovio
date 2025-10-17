import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "$lib/server/db/schema";

export const db = drizzle(process.env.POSTGRESQL_DB_URL!, { schema });
