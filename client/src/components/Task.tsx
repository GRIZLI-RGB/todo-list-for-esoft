import { TimeIcon } from "@chakra-ui/icons";
import { Box, Text, Badge, Flex, Card, CardBody, Heading } from "@chakra-ui/react";

const PRIORITY_COLORS = { high: "#E53E3E", medium: "#D69E2E", low: "#38A169" };

const STATUS_TEXT = {
	completed: "Выполнена",
	in_progress: "Выполняется",
	to_be_executed: "К выполнению",
	canceled: "Отменена",
};

const STATUS_COLOR_SCHEMES = { completed: "green", in_progress: "orange", to_be_executed: "gray", canceled: "red" };

interface ITask {
	title: string;
	description: string;
	dueDate: Date;
	priority: "high" | "medium" | "low";
	status: "completed" | "in_progress" | "to_be_executed" | "canceled";
}

export default function Task({ title, priority, dueDate, status, description }: ITask) {
	return (
		<Card variant={"outline"} cursor={'pointer'} _hover={{borderColor: "rgba(53,53,53,60%)"}}>
			<CardBody>
				<Flex justify="space-between" align="center">
					<Flex align="center" gap={3}>
						<Heading
							color={
								status === "completed"
									? "#38A169"
									: new Date() > new Date(new Date(dueDate).setDate(new Date(dueDate).getDate() + 1))
									? "#E53E3E"
									: "#353535"
							}
							as="h3"
							size="lg"
							fontWeight="bold">
							{title}
						</Heading>
					</Flex>
					<Box>
						<Badge colorScheme={STATUS_COLOR_SCHEMES[status]}>{STATUS_TEXT[status]}</Badge>
					</Box>
				</Flex>
				<Text my={4} opacity={0.7} fontStyle="italic">
					{description}
				</Text>
				<Flex align={"center"} justifyContent={"space-between"}>
					<Flex align={"center"} gap={1}>
						<Text fontSize={"14px"} fontWeight={700}>
							Приоритет:
						</Text>
						<Box display="flex" pt={0.5}>
							{[...Array(3)].map(
								(_, index) =>
									({ high: 3, medium: 2, low: 1 }[priority] > index && (
										<Box
											key={index}
											w="8px"
											h="8px"
											borderRadius="50%"
											bg={PRIORITY_COLORS[priority]}
											mx={0.5}
										/>
									)),
							)}
						</Box>
					</Flex>
					<Flex align="center" gap={1.5}>
						<TimeIcon /> <Text>{new Date(dueDate).toLocaleDateString()}</Text>
					</Flex>
				</Flex>
			</CardBody>
		</Card>
	);
}