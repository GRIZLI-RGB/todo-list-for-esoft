import axios from "./axios";

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

export const getUserByToken = async (token: string) => {
	return await axios.get(`/user/${token}`);
};

/* [TASKS] */