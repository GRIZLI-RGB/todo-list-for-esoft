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
	FormHelperText,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { authLogin } from "../../utils/api";

export default function Login() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState<{ login: string; password: string }>({
		login: "",
		password: "",
	});

	const [formErrors, setFormErrors] = useState<{ login: string[]; password: string[] }>({
		login: [],
		password: [],
	});

	const validate = () => {
		const { login, password } = formData;

		const loginErrors = [];
		const passwordErrors = [];

		if (login.length <= 0) loginErrors.push("Укажите логин");

		if (password.length <= 0) passwordErrors.push("Укажите пароль");

		if (loginErrors.length === 0 && passwordErrors.length === 0) {
			return true;
		} else {
			setFormErrors({ login: loginErrors, password: passwordErrors });
		}
	};

	const handleLogin = () => {
		if (validate()) {
			authLogin(formData.login, formData.password)
				.then(res => {
					localStorage.setItem("token", res.data.token);
                    navigate("/tasks");
					setFormErrors({ login: [], password: [] });
				})
				.catch(err => {
					if (err.response.status === 404) {
						setFormErrors({
							login: ["Пользователь не найден"],
							password: [],
						});
					}
					if (err.response.status === 400) {
						setFormErrors({
							login: [],
							password: ["Неверный пароль"],
						});
					}
				});
		}
	};

	return (
		<Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
			<Stack spacing={8} mx={"auto"} maxW={"sm"} w={"100%"} p={6}>
				<Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
					<Stack as="form" spacing={4}>
						<Heading fontSize={"4xl"} mb={1} textAlign={"center"}>
							Вход
						</Heading>
						<FormControl id="email">
							<FormLabel>Логин</FormLabel>
							<Input
								isInvalid={formErrors.login.length > 0}
								type="email"
								value={formData.login}
								onChange={e => setFormData(prev => ({ ...prev, login: e.target.value }))}
							/>
							{formErrors.login.length > 0 && (
								<FormHelperText color="red.500">{formErrors.login[0]}</FormHelperText>
							)}
						</FormControl>
						<FormControl id="password">
							<FormLabel>Пароль</FormLabel>
							<Input
								isInvalid={formErrors.password.length > 0}
								type="password"
								value={formData.password}
								onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
							/>
							{formErrors.password.length > 0 && (
								<FormHelperText color="red.500">{formErrors.password[0]}</FormHelperText>
							)}
						</FormControl>
						<Button onClick={handleLogin} pb={0.5} mt={1} mb={2} colorScheme="telegram">
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
