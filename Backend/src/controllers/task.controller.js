import { createNewTaskService, deleteTaskService, getAllTaskService, moveTaskService } from "../services/task.service.js";
import AppError from "../utils/AppError.js";
import AppResponse from "../utils/AppResponse.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

export const getUserAllTasks = asyncWrapper(async (req, res) => {
    const user = req.user;

    if (!user) throw new AppError(401, "Unauthorized request");

    const tasks = await getAllTaskService(user._id);

    return res.status(200).json(new AppResponse(200, "Tasks fetched successfully", tasks));
});

export const createNewTask = asyncWrapper(async (req, res) => {
    const { title, description } = req.body;
    const user = req.user;

    if (!title || !description) throw new AppError(400, "All fields are required");
    if (!user) throw new AppError(401, "Unauthorized request");

    const newTask = await createNewTaskService(title, description, user._id);

    return res
        .status(201)
        .json(new AppResponse(201, "Task created successfully", newTask));
});

export const deleteTask = asyncWrapper(async (req, res) => {
    const taskId = req.params.id;
    const user = req.user;

    if (!user) throw new AppError(401, "Unauthorized request");

    await deleteTaskService(taskId, user._id);

    return res
        .status(200)
        .json(new AppResponse(200, "Task deleted successfully", { id: taskId }));
});

export const moveTask = asyncWrapper(async (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;

    if (!taskId || !status) throw new AppError(400, "Invalid request");

    const updatedTask = await moveTaskService(taskId, status);

    return res
        .status(200)
        .json(new AppResponse(200, "Task updated successfully", updatedTask));
});