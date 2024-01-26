import { Database } from "./database.js";
import { randomUUID } from "node:crypto"; // UUID => UNIQUE UNIVERSAL ID
import { buildRoutePath } from "./utils/build-route-path.js";
import { errorObj } from "./utils/errors.js";

const database = new Database();
const currentDate = new Date().toJSON().slice(0, 10);

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;
      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body || {};
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: currentDate,
        updated_at: currentDate,
      };
      database.insert("tasks", task);
      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const fields = ["title", "description"];
      const notUpdate = ["completed_at", "created_at"];
      const data = { updated_at: currentDate };

      fields.forEach((field) => {
        req.body[field]
          ? (data[field] = req.body[field])
          : notUpdate.push(field);
      });

      const result = database.update("tasks", id, data, notUpdate);
      return result
        ? res.writeHead(404).end(errorObj.replace(":id", id))
        : res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;
      const notUpdate = ["title", "description", "created_at"];
      const data = { updated_at: currentDate, completed_at: currentDate };

      const result = database.update("tasks", id, data, notUpdate);
      return result
        ? res.writeHead(404).end(errorObj.replace(":id", id))
        : res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const result = database.delete("tasks", id);
      return result
        ? res.writeHead(404).end(errorObj.replace(":id", id))
        : res.writeHead(204).end();
    },
  },
];
