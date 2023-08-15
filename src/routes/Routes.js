import express from "express";
import UserRouter from "./users/route";
import TodoRouter from "./todo/route";

const Router = express.Router();

Router.use('/users', UserRouter)
Router.use("/todo", TodoRouter)

export default Router;