
import mongoose from "mongoose";
const dbUrl = process.env.MONGO_URL;
export const dbConnection = mongoose.connect(dbUrl)
    .then(() => console.log("Connected to Database "))
    .catch((error) => console.log("Database connection error:", error));