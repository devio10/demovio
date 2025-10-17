import "dotenv/config";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
const sqlite = new Database(process.env.DB_FILE_NAME!);
import * as schema from "$lib/server/db/schema";

export const db = drizzle(sqlite, { schema });
