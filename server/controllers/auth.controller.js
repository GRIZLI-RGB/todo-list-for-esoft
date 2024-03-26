import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./../models/user.model.js";

const authRegister = async (req, res) => {
	const { first_name, last_name, patronymic, login, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({ first_name, last_name, patronymic, login, password: hashedPassword });

		const token = jwt.sign({ user_id: newUser.id }, process.env.JWT_SECRET_KEY);

		res.json({ ...newUser.toJSON(), token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Registration failed" });
	}
};

const authLogin = async (req, res) => {
	const { login, password } = req.body;

	try {
		const user = await User.findOne({ where: { login } });

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(400).json({ message: "Invalid password" });
		}

		const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET_KEY);

		res.json({ ...user.toJSON(), token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Login failed" });
	}
};

export default { authRegister, authLogin };
