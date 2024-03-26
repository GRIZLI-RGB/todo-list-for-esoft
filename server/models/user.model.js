import { DataTypes } from "sequelize";

import sequelize from "../utils/db.js";

import Task from "./task.model.js";

const User = sequelize.define("User", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	first_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	patronymic: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	login: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	manager_id: {
		type: DataTypes.INTEGER,
		defaultValue: null,
	},
});

User.belongsTo(User, { foreignKey: "manager_id" });

User.hasMany(Task, { foreignKey: "creator_id" });

Task.belongsTo(User, { foreignKey: "creator_id" });

export default User;
