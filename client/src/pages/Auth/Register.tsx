import { Link as ChakraLink, Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, FormHelperText } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function Register() {
	return (
		<Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
			<Stack spacing={8} mx={"auto"} maxW={"sm"} w={"100%"} p={6}>
				<Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>
						<Heading fontSize={"4xl"} mb={1} textAlign={"center"}>
							Регистрация
						</Heading>
						<FormControl id="fio" isRequired>
							<FormLabel>ФИО</FormLabel>
							<Input type="text" />
						</FormControl>
						<FormControl id="login" isRequired>
							<FormLabel>Логин</FormLabel>
							<Input type="text" />
                            <FormHelperText>Может содержать английские буквы, цифры и знак нижнего подчеркивания</FormHelperText>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Пароль</FormLabel>
							<Input type="password" />
                            <FormHelperText>Не менее 8 символов</FormHelperText>
						</FormControl>
						<Button mt={1} mb={2} colorScheme="telegram">
							Создать аккаунт
						</Button>
						<ChakraLink textAlign={"center"} as={ReactRouterLink} to="/auth/login" color={"blue.500"}>
							Уже есть аккаунт?
						</ChakraLink>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
