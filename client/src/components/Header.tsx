import { Flex, Heading, Avatar, Button, Image, Text } from "@chakra-ui/react";
import { TUser } from "../utils/types";
import { useNavigate } from "react-router-dom";

export default function Header({ user }: { user: TUser }) {
	const navigate = useNavigate();

	const handleExit = () => {
		localStorage.removeItem("token");
		navigate("/auth/login");
	};

	return (
		<Flex justify="space-between" align="center" flexWrap={"wrap"} gap={6}>
			<Flex align={"center"} gap={3}>
				<Image h={12} src="/favicon.ico" alt="To-Do-List" />
				<Heading fontSize="3xl">To-Do-List</Heading>
			</Flex>
			<Flex align="center">
				<Avatar
					bg="blue.300"
					name={`${user.last_name} ${user.first_name[0]}.${user.patronymic[0]}.`}
					src={undefined}
				/>
				<Text ml={2}>{`${user.last_name} ${user.first_name[0]}.${user.patronymic[0]}.`}</Text>
				<Button ml={8} variant="outline" onClick={handleExit}>
					Выход
				</Button>
			</Flex>
		</Flex>
	);
}
