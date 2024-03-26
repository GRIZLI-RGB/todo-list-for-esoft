import express from "express";

import taskController from "../controllers/task.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const taskRouter = express.Router();

taskRouter.get(
	"/tasks",
	authMiddleware,
	taskController.getAllTasks,
	// #swagger.tags = ['Задачи']
	// #swagger.summary = 'Получить все задачи'
);

taskRouter.get(
	"/task/:id",
	authMiddleware,
	taskController.getTaskById,
	// #swagger.tags = ['Задачи']
	// #swagger.summary = 'Получить задачу по ID'
);

taskRouter.post(
	"/task",
	authMiddleware,
	taskController.createTask,
	// #swagger.tags = ['Задачи']
	// #swagger.summary = 'Создать задачу'
);

taskRouter.patch(
	"/task/:id",
	authMiddleware,
	taskController.updateTaskById,
	// #swagger.tags = ['Задачи']
	// #swagger.summary = 'Редактировать задачу'
);

export default taskRouter;
