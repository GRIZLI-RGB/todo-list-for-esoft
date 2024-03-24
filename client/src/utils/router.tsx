import { Outlet, createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Tasks from "../pages/Tasks";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <NotFound />,
	},
	{
		path: "/auth",
		element: <Outlet />,
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
		element: <Tasks />,
	},
]);

export default router;
