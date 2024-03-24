import { Flex, Heading, Avatar, Button, Image, Text } from "@chakra-ui/react";

export default function Header() {
	return (
		<Flex justify="space-between" align="center">
			<Flex align={"center"} gap={3}>
				<Image h={12} src="/favicon.ico" alt="To-Do-List" />
				<Heading fontSize="3xl">To-Do-List</Heading>
			</Flex>
			<Flex align="center">
				<Avatar bg="blue.300" name={"Козлов Е.И."} src={undefined} />
				<Text ml={2}>{"Козлов Е.И."}</Text>
				<Button ml={8} variant="outline">
					Выход
				</Button>
			</Flex>
		</Flex>
	);
}
