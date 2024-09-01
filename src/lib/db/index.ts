import * as schema from "@/lib/db/schema";
import { env } from "@/utils/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(env.DATABASE_URL_POOL);
const db = drizzle(sql, { schema });

export default db;
