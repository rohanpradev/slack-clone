import { workspacesRouter } from "@/app/api/[[...route]]/workspaces";
import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api" }).use(workspacesRouter);

export const GET = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;

export type App = typeof app;
