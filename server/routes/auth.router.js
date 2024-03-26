import express from "express";

import authController from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post(
	"/auth/register",
	authController.authRegister,
	// #swagger.tags = ['Авторизация']
	// #swagger.summary = 'Регистрация'
);

authRouter.post(
	"/auth/login",
	authController.authLogin,
	// #swagger.tags = ['Авторизация']
	// #swagger.summary = 'Вход'
);

export default authRouter;
