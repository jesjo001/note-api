import express from "express";
import requiresUser from "../../middlewares/requireUserLogin";
import { createTodoHandler, deleteeTodoHandler, getPublicTodosHandler, getSingleTodoHandler, updateTodoHandler } from "../../controllers/todo.controller";
import { todoUpdateValidationRules, todoValidationRules, validate } from "../../middlewares/validation/valdator";
import requireUser from "../../middlewares/requireUserLogin";
const TodoRouter = express.Router();

TodoRouter.use(requireUser)
TodoRouter.post('/create', todoValidationRules(), validate, createTodoHandler);
TodoRouter.get('/gettodo/all', getPublicTodosHandler);
TodoRouter.patch('/update/:id', todoUpdateValidationRules(), validate, updateTodoHandler);

TodoRouter.get('/gettodo/:id', getSingleTodoHandler);
TodoRouter.delete('/gettodo/:id', deleteeTodoHandler);



export default TodoRouter;