import db from "@/lib/db";
import { workspace } from "@/lib/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";

export const workspacesRouter = new Elysia().use(clerkPlugin()).guard(
  {
    beforeHandle({ auth, error }) {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }
    },
  },
  (app) =>
    app.group("/workspaces", (app) =>
      app
        .get("/", async () => {
          const data = await db.query.workspace.findMany();
          return data;
        })
        .get(
          "/:id",
          async ({ params: { id }, error }) => {
            const data = await db.query.workspace.findFirst({
              where: eq(workspace.workspaceId, id),
            });
            if (!data) {
              return error(404, "Not Found");
            }
            return data;
          },
          {
            params: t.Object({
              id: t.String(),
            }),
          },
        )
        .post(
          "/",
          async ({ body: { name, joinCode }, auth }) => {
            const [data] = await db
              .insert(workspace)
              .values({ name, userId: auth?.userId as string, joinCode })
              .returning();
            return data;
          },
          {
            body: t.Object({
              name: t.String(),
              joinCode: t.String(),
            }),
          },
        )
        .delete(
          "/",
          async ({ body: { idList } }) => {
            const data = await db.delete(workspace).where(inArray(workspace.workspaceId, idList)).returning();
            return data;
          },
          {
            body: t.Object({
              idList: t.Array(t.String(), { minItems: 1 }),
            }),
          },
        )
        .patch(
          "/:id",
          async ({ params: { id }, body: { name }, auth, error }) => {
            const [data] = await db
              .update(workspace)
              .set({ name })
              .where(and(eq(workspace.userId, auth?.userId as string), eq(workspace.workspaceId, id)))
              .returning();
            if (!data) {
              return error(404, "Not Found");
            }
            return data;
          },
          {
            params: t.Object({
              id: t.String(),
            }),
            body: t.Object({
              name: t.String(),
            }),
          },
        ),
    ),
);
