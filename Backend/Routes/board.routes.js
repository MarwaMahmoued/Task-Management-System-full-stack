import { Router } from "express";
import { createBoard, deleteBoard, getALLBoards, getBoardsById, updateBoard } from "../Controllers/board.controllers.js";
import{auth}from"../middlewares/auth.middleware.js"


const boardRouter=Router();
boardRouter.post("/",auth,createBoard);
boardRouter.get("/",auth,getALLBoards);
boardRouter.get("/:id",auth,getBoardsById);
boardRouter.put("/:id",auth,updateBoard);
boardRouter.delete("/:id",auth,deleteBoard);
export default boardRouter;