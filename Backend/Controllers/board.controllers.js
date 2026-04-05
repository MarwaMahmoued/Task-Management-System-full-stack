import { boardModel } from "../Models/Board.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { listModel } from "../Models/List.model.js";
import { taskModel } from "../Models/Task.model.js";

//  Create Board
export const createBoard = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const creatorId = req.user.id; 

    const newBoard = await boardModel.create({
        title, 
        description,
        createdBy: creatorId
    });

    res.status(201).json({ message: "Board created! ", newBoard });
});

//  Get All Boards
export const getALLBoards = asyncHandler(async (req, res) => {
    const boards = await boardModel.find({ createdBy: req.user.id })
        .populate("createdBy", "name email -_id") 
        .populate({
            path: "lists",
            model: "List",
            populate: {
                path: "tasks", 
                model: "Task"
            }
        });
    
    res.status(200).json({ "Boards": boards });
});

//  Get Board By Id
export const getBoardsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const board = await boardModel.findById(id)
        .populate("createdBy", "name email")
        .populate({
            path: "lists",
            model: "List", 
            populate: {
                path: "tasks",
                model: "Task" 
            }
        });
    
    if (!board) {
        return res.status(404).json({ message: "Board is not found" });
    }
    
    res.status(200).json({ board });
});
//  Update Board
export const updateBoard = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { description, title } = req.body;
    
    const updateBoard = await boardModel.findOneAndUpdate(
        { _id: id, createdBy: req.user.id },
        { title, description },
        { new: true }
    ).populate("createdBy", "name email -_id");

    if (!updateBoard) {
        return res.status(403).json({ message: "Board not found or unauthorized" });
    }
    
    res.status(200).json({ message: "Board updated successfully!", updateBoard });
});

//  Delete Board
export const deleteBoard = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedBoard = await boardModel.findOneAndDelete({ 
        _id: id, 
        createdBy: req.user.id 
    });

    if (!deletedBoard) {
        return res.status(403).json({ message: "Board not found or unauthorized" });
    }


    await listModel.deleteMany({ boardId: id });
    await taskModel.deleteMany({ boardId: id });
    
    res.status(200).json({ message: "Board and all its contents deleted successfully!" });
});