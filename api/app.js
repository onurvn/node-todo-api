require("dotenv").config();
require("./src/config/db");

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const todoRouter = require("../api/src/routers/todoRouter");

app.use(express.json());

app.use("/api", todoRouter);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port, () => {
    console.log(`Server is running ${port}`);
});