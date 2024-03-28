import { TimeIcon } from "@chakra-ui/icons";
import { Box, Text, Badge, Flex, Card, CardBody, Heading } from "@chakra-ui/react";

import { TTask } from "../utils/types";

const PRIORITY_COLORS = { high: "#E53E3E", medium: "#D69E2E", low: "#38A169" };

const STATUS_TEXT = {
	completed: "Выполнена",
	in_progress: "Выполняется",
	to_be_executed: "К выполнению",
	canceled: "Отменена",
};

const STATUS_COLOR_SCHEMES = { completed: "green", in_progress: "orange", to_be_executed: "gray", canceled: "red" };

export default function Task({
	id,
	title,
	priority,
	due_date,
	status,
	description,
	onClick,
}: TTask & { onClick: (id: number) => void }) {
	return (
		<Card
			onClick={() => onClick(id)}
			variant={"outline"}
			cursor={"pointer"}
			_hover={{ borderColor: "rgba(53,53,53,60%)" }}
			size={{ base: "sm", sm: "md" }}>
			<CardBody>
				<Flex
					justify="space-between"
					align={{ sm: "center", base: "flex-start" }}
					gap={5}
					direction={{ base: "column", sm: "row" }}>
					<Flex align="center" gap={3}>
						<Heading
							color={
								status === "completed"
									? "#38A169"
									: (due_date && new Date()) >
									new Date(new Date(due_date).setDate(new Date(due_date).getDate() + 1))
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
					{due_date && (
						<Flex align="center" gap={1.5}>
							<TimeIcon /> <Text>{new Date(due_date).toLocaleDateString()}</Text>
						</Flex>
					)}
				</Flex>
			</CardBody>
		</Card>
	);
}
