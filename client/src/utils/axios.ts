import axios from "axios";

const baseURL = import.meta.env.MODE === "production" ? "http://copyright-chu.ru/api" : "http://localhost:8000/api";

const instance = axios.create({
	baseURL,
});

export default instance;
