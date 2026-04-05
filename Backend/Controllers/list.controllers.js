import { listModel } from "../Models/List.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { boardModel } from "../Models/Board.model.js";

//  Create List

export const createList = asyncHandler(async (req, res) => {
    const { title, boardId } = req.body;
    const creatorid = req.user.id;

    const newList = await listModel.create({
        title,
        boardId,
        createdBy: creatorid,
    });

   
    await boardModel.findByIdAndUpdate(boardId, {
        $push: { lists: newList._id } 
    });
    
    res.status(201).json({ message: "List created", newList });
});

//  Get All Lists by Board

export const getAllList = asyncHandler(async (req, res) => {
    const { boardId } = req.params;
    const lists = await listModel
        .find({ boardId })
        .populate("createdBy", "name")
        .populate("cards"); 

    if (lists.length === 0) {
        return res.status(404).json({ message: "No lists found for this board" });
    }

    res.status(200).json({ lists });
});
//  Get List By Id
export const getListById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const list = await listModel
        .findById(id)
        .populate("createdBy", "name")
        .populate("boardId", "title");
        
    if (!list) {
        return res.status(404).json({ message: "List not found!" });
    }

    res.status(200).json({ list });
});

//  Update List
export const updateList = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const updatedList = await listModel.findOneAndUpdate(
        { _id: id, createdBy: req.user.id },
        { title },
        { new: true }
    ).populate("createdBy", "name email -_id");

    if (!updatedList) {
        return res.status(403).json({ message: "Not authorized or List not found" });
    }
    
    res.status(200).json({ message: "List updated successfully!", updatedList });
});

//  Delete List
export const deleteList = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedList = await listModel.findOneAndDelete({ 
        _id: id, 
        createdBy: req.user.id 
    });

    if (!deletedList) {
        return res.status(403).json({ message: "Not authorized or List not found" });
    }
    
    res.status(200).json({ message: "List deleted successfully!" });
});