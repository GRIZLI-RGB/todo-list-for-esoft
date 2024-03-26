import User from "./../models/user.model.js";

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();
		return res.json(users);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

const getUserById = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.json(user);
	} catch (err) {
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

export default { getAllUsers, getUserById, updateUserById };
