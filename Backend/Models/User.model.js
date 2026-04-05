import { Schema,model } from "mongoose";
const userSchema=new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20
},
email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    age: {
        type: Number,
        min: 18,
        max: 90
    },
    confirmEmail: {
    type: Boolean,
    default: false, 
},

},{timestamps:true,versionKey:false})
export const userModel=model("User",userSchema)