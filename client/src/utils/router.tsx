import { createBrowserRouter } from "react-router-dom";

import Guard from "../components/Guard";
import NotFound from "../pages/NotFound";
import Tasks from "../pages/Tasks";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import AuthLayout from "../layouts/Auth";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <NotFound />,
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
			},
		],
	},
	{
		path: "/tasks",
		element: (
			<Guard>
				<Tasks />
			</Guard>
		),
	},
]);

export default router;
