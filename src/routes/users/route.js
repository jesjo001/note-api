import express from "express";
import { createUserHandler } from "../../controllers/user.controller";
import { sessionValidationRules, userValidationRules, validate } from "../../middlewares/validation/valdator";
import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from "../../controllers/session.controller";
import requiresUser from "../../middlewares/requireUserLogin";
const UserRouter = express.Router();

UserRouter.post('/create', userValidationRules(), validate, createUserHandler);
//Login route
UserRouter.post('/login', sessionValidationRules(), validate, createUserSessionHandler);


UserRouter.delete('/logout', requiresUser, invalidateUserSessionHandler)
UserRouter.get('/sessions', requiresUser, getUserSessionsHandler )


export default UserRouter;