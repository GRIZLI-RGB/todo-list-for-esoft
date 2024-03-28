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
    // #swagger.security = [{ "bearerAuth": [] }]
);

taskRouter.get(
	"/task/:id",
	authMiddleware,
	taskController.getTaskById,
	// #swagger.tags = ['Задачи']
	// #swagger.summary = 'Получить задачу по ID'
    // #swagger.security = [{ "bearerAuth": [] }]
);

taskRouter.post(
	"/task",
	authMiddleware,
	taskController.createTask,
	// #swagger.tags = ['Задачи']
	// #swagger.summary = 'Создать задачу'
    // #swagger.security = [{ "bearerAuth": [] }]
);

taskRouter.patch(
	"/task/:id",
	authMiddleware,
	taskController.updateTaskById,
	// #swagger.tags = ['Задачи']
	// #swagger.summary = 'Редактировать задачу'
    // #swagger.security = [{ "bearerAuth": [] }]
);

export default taskRouter;
