import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const workspace = pgTable("workspaces", {
  workspaceId: uuid("workspace_id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  joinCode: text("join_code").notNull(),
});
