import { Router } from "express";
import { createTask, deleteTask, getTasksByList, updateTask } from "../Controllers/task.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const taskRouter = Router();

taskRouter.post("/", auth, createTask);
taskRouter.get("/:listId", auth, getTasksByList); 
taskRouter.put("/:id", auth, updateTask);
taskRouter.delete("/:id", auth, deleteTask);

export default taskRouter;