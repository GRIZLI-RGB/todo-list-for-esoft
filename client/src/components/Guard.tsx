import { useNavigate } from "react-router-dom";
import { getUserByToken } from "../utils/api";
import { useEffect, useState } from "react";

const Guard = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();

	const [state, setState] = useState<"loading" | "success" | "error">("loading");

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			getUserByToken(token)
				.then(res => {
					if (res.status === 200) {
						setState("success");
					} else {
						setState("error");
					}
				})
				.catch(err => {
					console.log(err);
					setState("error");
				});
		} else {
			setState("error");
		}
	}, []);

	if (state === "error") {
		navigate("/auth/login");
		return null;
	}

	if (state === "success") {
		return children;
	}
};

export default Guard;
