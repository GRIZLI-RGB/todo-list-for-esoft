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
	is_manager: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

User.belongsTo(User, {
	as: "manager",
	foreignKey: "manager_id",
});

User.hasMany(Task, {
	as: "created_tasks",
    foreignKey: "creator_id"
});

User.hasMany(Task, {
	as: "accountable_tasks",
    foreignKey: "accountable_id"
});

Task.belongsTo(User, {
	as: "creator",
    foreignKey: "creator_id"
});

Task.belongsTo(User, {
	as: "accountable",
    foreignKey: "accountable_id"
});

/* User.associate = models => {
	User.hasMany(models.Task, { foreignKey: "creator_id", as: "created_tasks" });
	User.hasMany(models.Task, { foreignKey: "accountable_id", as: "assigned_tasks" });
}; */

export default User;
