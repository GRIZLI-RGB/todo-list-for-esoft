import { DataTypes } from "sequelize";

import sequelize from "../utils/db.js";

const Task = sequelize.define("Task", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: DataTypes.TEXT,
	due_date: DataTypes.DATE,
	priority: {
		type: DataTypes.ENUM("high", "medium", "low"),
		allowNull: false,
	},
	status: {
		type: DataTypes.ENUM("completed", "in_progress", "to_be_executed", "canceled"),
		defaultValue: "to_be_executed",
	},
});

/* Task.associate = models => {
	Task.belongsTo(models.User, { foreignKey: "creator_id", as: "creator" });
	Task.belongsTo(models.User, { foreignKey: "accountable_id", as: "accountable" });
};
 */
export default Task;
