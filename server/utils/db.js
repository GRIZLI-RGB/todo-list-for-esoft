import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
	`postgres://${process.env.DB_USER || "postgres"}:${process.env.DB_PASS || "postgres"}@${
		process.env.DB_URL || "localhost"
	}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || "postgres"}`,
);

export default sequelize;