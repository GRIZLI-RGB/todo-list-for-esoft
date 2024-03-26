import Task from "./../models/task.model.js";

const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.findAll();
		return res.json(tasks);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getTaskById = async (req, res) => {
	const taskId = req.params.id;

	try {
		const task = await Task.findByPk(taskId);
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		return res.json(task);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createTask = async (req, res) => {
	const { title, description, due_date, priority, accountable_id } = req.body;
	const userId = req.user_id;

	try {
		const newTask = await Task.create({
			title,
			description,
			due_date,
			priority,
			creator_id: userId,
			accountable_id
		});

		return res.status(201).json(newTask.toJSON());
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateTaskById = async (req, res) => {
	const taskId = req.params.id;
	const { title, description, due_date, priority, status, accountable_id } = req.body;

	try {
		const task = await Task.findByPk(taskId);
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		await task.update({
			title,
			description,
			due_date,
			priority,
			status,
			accountable_id,
		});

		return res.json(task.toJSON());
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export default { getAllTasks, getTaskById, createTask, updateTaskById };
