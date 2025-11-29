import taskModel from "../models/task.model.js"
import AppError from "../utils/AppError.js";

export const getAllTaskService = async (userId) => {
    const tasks = await taskModel.find({ owner: userId });
    return tasks;
}

export const createNewTaskService = async (title, description, userId) => {
    const newTask = await taskModel.create({
        title,
        description,
        owner: userId
    });

    return newTask;
}

export const deleteTaskService = async (taskId, userId) => {
    const task = await taskModel.findOneAndDelete({ _id: taskId, owner: userId });

    if (!task) throw new AppError(404, "Task not found or unauthorized");

    return true;
};

export const moveTaskService = async (taskId, status) => {
    const validStatus = ['ToDo', 'InProgress', 'Done'];
    if (!status || !validStatus.includes(status)) throw new AppError(400, "Invalid status");

    const updatedTask = taskModel.findByIdAndUpdate(taskId, { status }, { new: true, runValidators: true });

    if (!updatedTask) throw new AppError(404, "Task not found");

    return updatedTask;
}