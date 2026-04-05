import { Schema, model } from "mongoose";
const boardSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
 
lists: [{
    type: Schema.Types.ObjectId,
    ref: "List" 
}],
},{timestamps:true});
export const boardModel = model("Board", boardSchema);
