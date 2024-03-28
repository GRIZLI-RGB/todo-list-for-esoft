import axios from "axios";

const baseURL = import.meta.env.MODE === "production" ? "http://copyright-chu.ru/api" : "http://localhost:8000/api";

const instance = axios.create({
	baseURL,
});

instance.interceptors.request.use(
	config => {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

export default instance;
