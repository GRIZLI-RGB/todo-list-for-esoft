import express from "express";

import userController from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get(
	"/users",
	authMiddleware,
	userController.getAllUsers,
	// #swagger.tags = ['Пользователи']
	// #swagger.summary = 'Получить всех пользователей'
);

userRouter.get(
	"/user/:token",
	userController.getUserByToken,
	// #swagger.tags = ['Пользователи']
	// #swagger.summary = 'Получить пользователя по токену'
);


userRouter.patch(
	"/user/:id",
	authMiddleware,
	userController.updateUserById,
	// #swagger.tags = ['Пользователи']
	// #swagger.summary = 'Редактировать пользователя по ID'
);

export default userRouter;
