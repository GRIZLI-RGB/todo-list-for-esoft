import {
	Flex,
	Box,
	Container,
	Heading,
	Select,
	Divider,
	Modal,
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
import { useEffect, useState } from "react";

import Task from "../components/Task";
import Header from "../components/Header";

import { getUserByToken } from "../utils/api";
import { TTask, TUser } from "../utils/types";

type TGroupBy = "due_date" | "accountables" | "none";

export default function Tasks() {
	const [user, setUser] = useState<TUser>();

	const [groupBy, setGroupBy] = useState<TGroupBy>("none");

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalMode, setModalMode] = useState<"creation" | "editing">("creation");

	const [titleInputTask, setTitleInputTask] = useState("");

	const [taskInModal, setTaskInModal] = useState<
		Omit<TTask, "id" | "status" | "creator_id" | "createdAt" | "updatedAt">
	>({
		title: "",
		description: "",
		due_date: new Date(),
		priority: "low",
		accountable_id: 1,
	});

	useEffect(() => {
		getUserByToken(localStorage.getItem("token") || "").then(res => {
			setUser(res.data);
		});
	}, []);

	const handleCreateTask = () => {};

	const handleResetEnters = () => {};

	const handleCancelChanges = () => {};

	if (user) {
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
									setTaskInModal({ ...taskInModal, title: titleInputTask });
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
						<Box>
							<Heading as="h6" mb={3} ml={3} fontSize="14px" fontWeight={500}>
								Все задачи
							</Heading>
							<Flex direction={"column"} gap={5}>
								<Task
									title="Помыть посуду"
									dueDate={new Date("2021-01-22T09:52:02+00:00")}
									priority={"high"}
									status="completed"
									description="Описание задачи, которое может быть как большим, так и нет!"
								/>
								<Task
									title="Сходить на собеседование"
									dueDate={new Date()}
									priority={"low"}
									status="to_be_executed"
									description="Описание задачи, которое может быть как большим, так и нет!"
								/>
								<Task
									title="Сходить на собеседование"
									dueDate={new Date("2021-01-22T09:52:02+00:00")}
									priority={"medium"}
									status="canceled"
									description="Описание задачи, которое может быть как большим, так и нет!"
								/>
								<Task
									title="Выгулять собаку"
									dueDate={new Date()}
									priority={"low"}
									status="in_progress"
									description="Описание задачи, которое может быть как большим, так и нет!"
								/>
							</Flex>
						</Box>
						<Divider my={5} opacity={1} />
						<Box>
							<Heading as="h6" mb={3} ml={3} fontSize="14px" fontWeight={500}>
								Все задачи
							</Heading>
							<Flex direction={"column"} gap={5}>
								<Task
									title="Помыть посуду"
									dueDate={new Date()}
									priority={"high"}
									status="completed"
									description="Описание задачи, которое может быть как большим, так и нет!"
								/>
								<Task
									title="Сходить на собеседование"
									dueDate={new Date()}
									priority={"low"}
									status="to_be_executed"
									description="Описание задачи, которое может быть как большим, так и нет!"
								/>
								<Task
									title="Сходить на собеседование"
									dueDate={new Date()}
									priority={"medium"}
									status="canceled"
									description="Описание задачи, которое может быть как большим, так и нет!"
								/>
								<Task
									title="Выгулять собаку"
									dueDate={new Date()}
									priority={"low"}
									status="in_progress"
									description="Описание задачи, которое может быть как большим, так и нет!"
								/>
							</Flex>
						</Box>
					</Flex>
				</Container>
				<Modal
                    size={{base: "xs", sm: "md"}}
					isCentered
					onClose={() => {
						setTaskInModal({
							title: "",
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
								<FormControl>
									<FormLabel>Заголовок</FormLabel>
									<Input
										type="text"
										value={taskInModal.title}
										onChange={e => setTaskInModal({ ...taskInModal, title: e.target.value })}
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Описание</FormLabel>
									<Textarea
										value={taskInModal.description}
										onChange={e => setTaskInModal({ ...taskInModal, description: e.target.value })}
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Дата окончания</FormLabel>
									<Input
										type="date"
										value={taskInModal.due_date.toISOString().split("T")[0]}
										onChange={e =>
											setTaskInModal({ ...taskInModal, due_date: new Date(e.target.value) })
										}
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Приоритет</FormLabel>
									<Select
										value={taskInModal.priority}
										onChange={e => setTaskInModal({ ...taskInModal, priority: e.target.value })}>
										<option value="low">Низкий</option>
										<option value="medium">Средний</option>
										<option value="high">Высокий</option>
									</Select>
								</FormControl>

								<FormControl>
									<FormLabel>Статус</FormLabel>
									<Select
										value={taskInModal.status}
										onChange={e => setTaskInModal({ ...taskInModal, status: e.target.value })}>
										<option value="to-do">К выполнению</option>
										<option value="in-progress">Выполняется</option>
										<option value="done">Выполнена</option>
										<option value="cancelled">Отменена</option>
									</Select>
								</FormControl>

								<FormControl>
									<FormLabel>Ответственный</FormLabel>
									<Select
										value={taskInModal.assignee}
										onChange={e => setTaskInModal({ ...taskInModal, assignee: e.target.value })}>
										<option value="user1">Пользователь 1</option>
										<option value="user2">Пользователь 2</option>
										<option value="user3">Пользователь 3</option>
									</Select>
								</FormControl>
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
											handleCreateTask();
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
