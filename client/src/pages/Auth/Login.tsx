import {
	Link as ChakraLink,
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function Login() {
	return (
		<Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
			<Stack spacing={8} mx={"auto"} maxW={"sm"} w={"100%"} p={6}>
				<Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>
						<Heading fontSize={"4xl"} mb={1} textAlign={"center"}>
							Вход
						</Heading>
						<FormControl id="email">
							<FormLabel>Логин</FormLabel>
							<Input type="email" />
						</FormControl>
						<FormControl id="password">
							<FormLabel>Пароль</FormLabel>
							<Input type="password" />
						</FormControl>
						<Button mt={1} mb={2} colorScheme="telegram">
							Войти в аккаунт
						</Button>
						<ChakraLink textAlign={"center"} as={ReactRouterLink} to="/auth/register" color={"blue.500"}>
							Не зарегистрированы?
						</ChakraLink>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
