import jwt from "jsonwebtoken";

import User from "./../models/user.model.js";
import Task from "../models/task.model.js";

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			include: [
				{ model: User, as: "manager" },
				{ model: Task, as: "created_tasks" },
				{ model: Task, as: "accountable_tasks" },
			],
		});
		return res.json(users);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

const getUserByToken = async (req, res) => {
	const { token } = req.params;

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
		const userId = decodedToken.user_id;

		const user = await User.findByPk(userId, {
			include: [
				{ model: User, as: "manager" },
				{ model: Task, as: "created_tasks" },
				{ model: Task, as: "accountable_tasks" },
			],
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json(user.toJSON());
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: err.message });
	}
};

const updateUserById = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		await user.update(req.body);
		return res.json(user.toJSON());
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

export default { getAllUsers, getUserByToken, updateUserById };
