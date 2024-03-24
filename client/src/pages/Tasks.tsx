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
	Text,
	useDisclosure,
	Input,
} from "@chakra-ui/react";
import { useState } from "react";

import Task from "../components/Task";
import Header from "../components/Header";

export default function Tasks() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalMode, setModalMode] = useState<"creation" | "editing">("creation");

	return (
		<>
			<Container maxW="6xl" px={7} py={12}>
				<Header />
				<Box my={12}>
					<Flex align="center">
						<Input placeholder="Ставьте цели и действуйте!" borderEndRadius={0} />
						<Button
							colorScheme="green"
							borderStartRadius={0}
							onClick={() => {
								setModalMode("creation");
								onOpen();
							}}>
							Новая задача
						</Button>
					</Flex>
				</Box>
				<Box mb={8} maxW={"200px"}>
					<Select variant={"outline"} size="sm">
						<option value="withoutGrouping">Без группировки</option>
						<option value="dueDate">По дате завершения</option>
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
			<Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="scale">
				<ModalOverlay backdropFilter="blur(4px)" />
				<ModalContent>
					<ModalHeader>{modalMode === "creation" ? "Создать" : "Редактировать"} задачу</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Text</Text>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant="ghost">Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
