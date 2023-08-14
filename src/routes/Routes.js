import express from "express";
import UserRouter from "./users/route";

const Router = express.Router();

Router.use('/users', UserRouter)

export default Router;