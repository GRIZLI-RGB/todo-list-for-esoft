import axios from "./axios";

import { TTask } from "./types";

/* [AUTH] */

export const authRegister = async (
	first_name: string,
	last_name: string,
	patronymic: string,
	login: string,
	password: string,
) => {
	return await axios.post(`/auth/register`, { first_name, last_name, patronymic, login, password });
};

export const authLogin = async (login: string, password: string) => {
	return await axios.post(`/auth/login`, { login, password });
};

/* [USERS] */

export const getUsers = async () => {
	return await axios.get(`/users`);
};

export const getUserByToken = async (token: string) => {
	return await axios.get(`/user/${token}`);
};

/* [TASKS] */

export const getTaskById = async (id: number) => {
	return await axios.get(`/task/${id}`);
};

export const createTask = async (data: Partial<TTask>) => {
	return await axios.post(`/task`, data);
};

export const updateTask = async (id: number, data: Partial<TTask>) => {
	return await axios.patch(`/task/${id}`, data);
};
