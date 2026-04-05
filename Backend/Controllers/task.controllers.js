import { taskModel } from "../Models/Task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { listModel } from "../Models/List.model.js";

//  Create Task

export const createTask = asyncHandler(async (req, res) => {
    const { title, description, listId, boardId, assignedTo, deadline, status } = req.body;

   
    const newTask = await taskModel.create({
        title,
        description,
        listId,
        boardId,
        assignedTo,
        createdBy: req.user.id,
        deadline,
        status: status || "To Do" 
    });

    await listModel.findByIdAndUpdate(
        listId, 
        { $push: { tasks: newTask._id } }, 
        { new: true }
    );

    res.status(201).json({ message: "Task Created!", newTask });
});

//get task
export const getTasksByList = asyncHandler(async (req, res) => {
    const { listId } = req.params;
    
    
    let { page, limit, status } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10; 
    const skip = (page - 1) * limit;

    
    let filter = { listId };
    if (status) filter.status = status;

    const tasks = await taskModel.find(filter)
        .limit(limit)
        .skip(skip)
        .populate("createdBy", "name email")
        .populate("assignedTo", "name")
        .populate("listId", "title");

    const totalCount = await taskModel.countDocuments(filter);

    res.status(200).json({ 
        message: "Success",
        results: tasks.length,
        page,
        totalCount,
        tasks 
    });
});

//  Update Task
export const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedTask = await taskModel.findOneAndUpdate(
        { _id: id, createdBy: req.user.id },
        req.body, 
        { new: true }
    );

    if (!updatedTask) {
        return res.status(403).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task Updated!", updatedTask });
});

//  Delete Task
export const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await taskModel.findOne({ _id: id, createdBy: req.user.id });

    if (!task) {
        return res.status(403).json({ message: "Unauthorized or Task not found" });
    }

    
    await taskModel.findByIdAndDelete(id);

    
    await listModel.findByIdAndUpdate(task.listId, {
        $pull: { tasks: id } 
    });

    res.status(200).json({ message: "Task Deleted successfully!" });
});