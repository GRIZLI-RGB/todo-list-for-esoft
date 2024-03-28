export type TUser = {
	id: number;
	first_name: string;
	last_name: string;
	patronymic: string;
	login: string;
	password: string;
	manager_id: number | null;
	is_manager: boolean;
	createdAt: Date;
	updatedAt: Date;
    accountable_tasks: TTask[]
    created_tasks: TTask[]
};

export type TTask = {
	id: number;
	title: string;
	description: string;
	due_date: Date;
	priority: "high" | "medium" | "low";
	status: "completed" | "in_progress" | "to_be_executed" | "canceled";
	creator_id: number;
	accountable_id: number;
	createdAt: Date;
	updatedAt: Date;
};
