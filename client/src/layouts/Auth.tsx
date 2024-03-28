import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AuthLayout() {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === "/auth") {
			navigate("/auth/login");
		}
	}, [location.pathname]);

	return <Outlet />;
}
