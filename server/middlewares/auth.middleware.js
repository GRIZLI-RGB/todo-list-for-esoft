import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
	const token = req.headers["authorization"];

	if (!token) {
		return res.status(401).json({ message: "Authorization token is missing" });
	}

	try {
		const decoded = jwt.verify(token.slice(7), process.env.JWT_SECRET_KEY);
		req.user_id = decoded.user_id;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}
};

export default authMiddleware;
