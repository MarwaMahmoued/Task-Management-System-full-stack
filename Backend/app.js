import "dotenv/config";
import cors from 'cors';
import express from "express";
import { dbConnection } from "./Database/dbConnection.js";
import authRouter from "./Routes/auth.routes.js";
import boardRouter from "./Routes/board.routes.js";
import listRouter from "./Routes/list.routes.js";
import taskRouter from "./Routes/task.routes.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.use(authRouter);
app.use("/board", boardRouter);
app.use("/list", listRouter);
app.use("/task", taskRouter);

// Database Connection
dbConnection;

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: "Error",
        error: err.message
    });
});

app.listen(port, (error) => {
    if (error) {
        console.log("Server error:", error);
    } else {
        console.log(`The Server is running on port: ${port}`);
    }
});