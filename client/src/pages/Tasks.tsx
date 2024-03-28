import {
	Flex,
	Box,
	Container,
	Heading,
	Select,
	Divider,
	Modal,
	Text,
	ModalBody,
	ModalFooter,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	Button,
	useDisclosure,
	Input,
	FormControl,
	FormLabel,
	Textarea,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

import Task from "../components/Task";
import Header from "../components/Header";

import { createTask, getTaskById, getUserByToken, getUsers, updateTask } from "../utils/api";
import { TTask, TUser } from "../utils/types";

type TGroupBy = "due_date" | "accountables" | "none";

export default function Tasks() {
	const [user, setUser] = useState<TUser>();
	const [maybeAccountables, setMaybeAccountables] = useState<TUser[]>();

	const [groupBy, setGroupBy] = useState<TGroupBy>("none");

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalMode, setModalMode] = useState<"creation" | "editing">("creation");
	const [idEditedTask, setIdEditedTask] = useState<number>();
	const [creatorIdEditedTask, setCreatorIdEditedTask] = useState<number>();

	const [titleInputTask, setTitleInputTask] = useState("");

	const [taskInModal, setTaskInModal] = useState<Omit<TTask, "id" | "creator_id" | "createdAt" | "updatedAt">>({
		title: "",
		description: "",
		due_date: new Date(),
		status: "to_be_executed",
		priority: "low",
		accountable_id: user?.id || 1,
	});

	useEffect(() => {
		getUserByToken(localStorage.getItem("token") || "").then(response => {
			setUser(response.data);
			getUsers().then(res =>
				setMaybeAccountables(
					res.data.filter((user: TUser) => !user.is_manager || user.id === response.data.id),
				),
			);
		});
	}, []);

	const handleCreateTask = () => {
		if (user) {
			const { title, description, due_date, priority, accountable_id } = taskInModal;

			createTask({
				title: title || "Задача",
				description: description || "Описание",
				due_date,
				priority,
				accountable_id,
			}).then((_: any) => {
				getUserByToken(localStorage.getItem("token") || "").then(response => {
					setUser(response.data);
					getUsers().then(res =>
						setMaybeAccountables(
							res.data.filter((user: TUser) => !user.is_manager || user.id === response.data.id),
						),
					);
				});
			});
		}
	};

	const handleResetEnters = () => {
		if (user) {
			setTaskInModal({
				title: "",
				description: "",
				due_date: new Date(),
				status: "to_be_executed",
				priority: "low",
				accountable_id: user.id,
			});
		}
	};

	const handleSaveTask = () => {
		if (user) {
			const { title, description, due_date, priority, accountable_id, status } = taskInModal;

			updateTask(idEditedTask as number, {
				title,
				description,
				due_date,
				priority,
				accountable_id,
				status,
			}).then((_: any) => {
				getUserByToken(localStorage.getItem("token") || "").then(response => {
					setUser(response.data);
					getUsers().then(res =>
						setMaybeAccountables(
							res.data.filter((user: TUser) => !user.is_manager || user.id === response.data.id),
						),
					);
				});
			});
		}
	};

	const handleCancelChanges = () => {
		onClose();
	};

	const getGroupedTasks = useMemo(
		() => () => {
			if (groupBy === "accountables") {
				const tasks: { tag: string; tasks: TTask[] }[] = [];

				if (user?.created_tasks) {
					const tags: string[] = [];

					// соберем все теги вида ID: {user_id}
					user.created_tasks.map(task => {
						if (!tags.includes(`ID: ${task.accountable_id}`)) {
							tags.push(`ID: ${task.accountable_id}`);
						}
					});

					// к каждому тегу подберем свои задачи
					tags.map(tag => {
						let tasks_for_tag: TTask[] = [];
						user.created_tasks.map(task => {
							if (tag === `ID: ${task.accountable_id}`) {
								tasks_for_tag.push(task);
							}
						});
						tasks.push({
							tag,
							tasks: tasks_for_tag,
						});
						tasks_for_tag = [];
					});
				}

				return tasks;
			}

			if (groupBy === "due_date") {
				return [
					{
						tag: "На сегодня",
						tasks: user?.accountable_tasks
							? user.accountable_tasks.filter(task => {
									const taskDate = new Date(task.due_date);
									return taskDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
							  })
							: [],
					},
					{
						tag: "На неделю",
						tasks: user?.accountable_tasks
							? user.accountable_tasks.filter(task => {
									const today = new Date();
									const nextWeek = new Date();
									nextWeek.setDate(today.getDate() + 7);
									const taskDate = new Date(task.due_date);
									return taskDate >= today && taskDate <= nextWeek;
							  })
							: [],
					},
					{
						tag: "На будущее",
						tasks: user?.accountable_tasks
							? user.accountable_tasks.filter(task => {
									const today = new Date();
									const taskDate = new Date(task.due_date);
									const nextWeek = new Date();
									nextWeek.setDate(today.getDate() + 7);
									return taskDate > nextWeek;
							  })
							: [],
					},
				];
			}

			return [
				{
					tag: "Все задачи",
					tasks: user?.accountable_tasks || [],
				},
			];
		},
		[groupBy, user],
	);

	const handleTaskClick = (task_id: number) => {
		setIdEditedTask(task_id);
		getTaskById(task_id).then(res => {
			const { title, description, priority, due_date, accountable_id, status } = res.data;
			setCreatorIdEditedTask(res.data.creator_id);
			setTaskInModal({
				title,
				description,
				due_date,
				priority,
				accountable_id,
				status,
			});
			setModalMode("editing");
			onOpen();
		});
	};

	if (user && maybeAccountables) {
		return (
			<>
				<Container maxW="6xl" px={{ base: 4, sm: 7 }} py={12}>
					<Header user={user} />
					<Box my={12}>
						<Flex align="center">
							<Input
								placeholder="Ставьте цели и действуйте!"
								borderEndRadius={0}
								value={titleInputTask}
								onChange={e => setTitleInputTask(e.target.value)}
							/>
							<Button
								minW={"116px"}
								colorScheme="blue"
								borderStartRadius={0}
								onClick={() => {
									setModalMode("creation");
									setTitleInputTask("");
									setTaskInModal({
										title: titleInputTask,
										description: "",
										due_date: new Date(),
										status: "to_be_executed",
										priority: "low",
										accountable_id: user.id,
									});
									onOpen();
								}}>
								Новая задача
							</Button>
						</Flex>
					</Box>
					<Box mb={8} maxW={"200px"}>
						<Select variant={"outline"} size="sm" onChange={e => setGroupBy(e.target.value as TGroupBy)}>
							<option value="none">Без группировки</option>
							<option value="due_date">По дате завершения</option>
							{user.is_manager && <option value="accountables">По ответственным</option>}
						</Select>
					</Box>
					<Flex direction={"column"} gap={5}>
						{getGroupedTasks().map((chapter, index) => (
							<>
								<Box>
									<Heading as="h6" mb={3} ml={3} fontSize="14px" fontWeight={500}>
										{chapter.tag}
									</Heading>
									<Flex direction={"column"} gap={5}>
										{chapter.tasks.length === 0 ? (
											<Text opacity="60%" p={5} fontSize="14px">
												Нет подходящих задач
											</Text>
										) : (
											chapter.tasks
												.sort((a, b) => {
													const dateA = new Date(a.updatedAt);
													const dateB = new Date(b.updatedAt);

													if (dateA < dateB) {
														return 1;
													}
													if (dateA > dateB) {
														return -1;
													}
													return 0;
												})
												.map(task => (
													<Task
														onClick={task_id => handleTaskClick(task_id)}
														key={task.id}
														{...task}
													/>
												))
										)}
									</Flex>
								</Box>
								{getGroupedTasks().length !== index + 1 && <Divider my={5} opacity={1} />}
							</>
						))}
					</Flex>
				</Container>
				<Modal
					size={{ base: "xs", sm: "md" }}
					isCentered
					onClose={() => {
						setTaskInModal({
							title: "",
                            status: "to_be_executed",
							description: "",
							due_date: new Date(),
							priority: "low",
							accountable_id: 1,
						});
						onClose();
					}}
					isOpen={isOpen}
					motionPreset="scale"
					scrollBehavior={"inside"}>
					<ModalOverlay backdropFilter="blur(4px)" />
					<ModalContent>
						<ModalHeader>{modalMode === "creation" ? "Создать" : "Редактировать"} задачу</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Flex as="form" gap={2.5} direction={"column"}>
								{!(modalMode === "editing" && creatorIdEditedTask !== user.id) && (
									<>
										<FormControl>
											<FormLabel>Заголовок</FormLabel>
											<Input
												type="text"
												value={taskInModal.title}
												onChange={e =>
													setTaskInModal({ ...taskInModal, title: e.target.value })
												}
											/>
										</FormControl>

										<FormControl>
											<FormLabel>Описание</FormLabel>
											<Textarea
												value={taskInModal.description}
												onChange={e =>
													setTaskInModal({ ...taskInModal, description: e.target.value })
												}
											/>
										</FormControl>

										<FormControl>
											<FormLabel>Дата окончания</FormLabel>
											<Input
												type="date"
												value={new Date(taskInModal.due_date).toISOString().split("T")[0]}
												onChange={e =>
													setTaskInModal({
														...taskInModal,
														due_date: new Date(e.target.value),
													})
												}
											/>
										</FormControl>

										<FormControl>
											<FormLabel>Приоритет</FormLabel>
											<Select
												value={taskInModal.priority}
												onChange={e =>
													setTaskInModal({
														...taskInModal,
														priority: e.target.value as "high" | "medium" | "low",
													})
												}>
												<option value="low">Низкий</option>
												<option value="medium">Средний</option>
												<option value="high">Высокий</option>
											</Select>
										</FormControl>
									</>
								)}

								{modalMode === "editing" && (
									<FormControl>
										<FormLabel>Статус</FormLabel>
										<Select
											value={taskInModal.status}
											onChange={e =>
												setTaskInModal({
													...taskInModal,
													status: e.target.value as
														| "completed"
														| "in_progress"
														| "to_be_executed"
														| "canceled",
												})
											}>
											<option value="to_be_executed">К выполнению</option>
											<option value="in_progress">Выполняется</option>
											<option value="completed">Выполнена</option>
											<option value="canceled">Отменена</option>
										</Select>
									</FormControl>
								)}

								{user.is_manager && (
									<FormControl>
										<FormLabel>Ответственный</FormLabel>
										<Select
											value={taskInModal.accountable_id}
											onChange={e =>
												setTaskInModal({
													...taskInModal,
													accountable_id: Number(e.target.value),
												})
											}>
											{maybeAccountables.map(accountable => (
												<option key={accountable.id} value={accountable.id}>
													{accountable.last_name} {accountable.first_name[0]}.
													{accountable.patronymic[0]}.{accountable.id === user.id && " (Вы)"}
												</option>
											))}
										</Select>
									</FormControl>
								)}
							</Flex>
						</ModalBody>
						<ModalFooter>
							{modalMode === "creation" ? (
								<>
									<Button
										colorScheme="green"
										mr={3}
										onClick={() => {
											onClose();
											handleCreateTask();
										}}>
										Создать
									</Button>
									<Button variant="ghost" onClick={handleResetEnters}>
										Сбросить поля
									</Button>
								</>
							) : (
								<>
									<Button
										colorScheme="blue"
										mr={3}
										onClick={() => {
											onClose();
											handleSaveTask();
										}}>
										Сохранить
									</Button>
									<Button variant="ghost" onClick={handleCancelChanges}>
										Сбросить изменения
									</Button>
								</>
							)}
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		);
	}
}
