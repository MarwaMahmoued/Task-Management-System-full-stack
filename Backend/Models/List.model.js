import { Schema, model } from "mongoose";
const listSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,


  },tasks: [{
    type: Schema.Types.ObjectId,
    ref: "Task"
  }]
},
{timestamps:true});
export const listModel=model("List",listSchema);
