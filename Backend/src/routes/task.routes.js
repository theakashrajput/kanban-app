import { Router } from "express";
import { createNewTask, deleteTask, getUserAllTasks, moveTask } from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .get(getUserAllTasks)
    .post(createNewTask);

router.route("/:id")
    .patch(moveTask)
    .delete(deleteTask);

export default router;
