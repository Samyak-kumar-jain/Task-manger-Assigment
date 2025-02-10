require('dotenv').config();
const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectToDb = require("./Utils/db.js")
const TaskRouter = require("./Routes/taskRoutes.js")
const path = require("path") ;

const app = express();
const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN || "https://task-manger-jr3n.onrender.com",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
    credentials: true,   
}))

const port = process.env.PORT || 5000;

// Connect to the database
console.log("🔄 Attempting to connect to the database...");

connectToDb();

app.use("/api/v1/task",TaskRouter);

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get('*', (_,res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
    console.log(`🚀 Server is up and running on port ${port}`);
});







