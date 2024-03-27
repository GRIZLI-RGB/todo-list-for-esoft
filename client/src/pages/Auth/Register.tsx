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

import { authRegister } from "../../utils/api";

export default function Register() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState<{ fio: string; login: string; password: string }>({
		fio: "",
		login: "",
		password: "",
	});

	const [formErrors, setFormErrors] = useState<{ fio: string[]; login: string[]; password: string[] }>({
		fio: [],
		login: [],
		password: [],
	});

	const validate = () => {
		const { fio, login, password } = formData;

		const fioErrors = [];
		const loginErrors = [];
		const passwordErrors = [];

		if (fio.length <= 0) fioErrors.push("Укажите ФИО");
		if (fio.split(" ").length !== 3) fioErrors.push("Проверьте правильность ввода");

		if (login.length <= 0) loginErrors.push("Укажите логин");
		if (!/^[a-zA-Z0-9_]{1,}$/.test(login))
			loginErrors.push("Может содержать английские буквы, цифры и знак нижнего подчеркивания");

		if (password.length <= 0) passwordErrors.push("Укажите пароль");
		if (password.length < 8) passwordErrors.push("Не менее 8 символов");

		if (fioErrors.length === 0 && loginErrors.length === 0 && passwordErrors.length === 0) {
			return true;
		} else {
			setFormErrors({ fio: fioErrors, login: loginErrors, password: passwordErrors });
		}
	};

	const handleRegister = () => {
		if (validate()) {
			authRegister(
				formData.fio.split(" ")[1],
				formData.fio.split(" ")[0],
				formData.fio.split(" ")[2],
				formData.login,
				formData.password,
			).then(res => {
				localStorage.setItem("token", res.data.token);
				navigate("/tasks");
				setFormErrors({ fio: [], login: [], password: [] });
			}).catch(err => {
                if (err.response.status === 400) {
                    setFormErrors({
                        fio: [],
                        login: ["Пользователь уже существует"],
                        password: [],
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
							Регистрация
						</Heading>
						<FormControl id="fio" isRequired>
							<FormLabel>ФИО</FormLabel>
							<Input
								type="text"
								isInvalid={formErrors.fio.length > 0}
								value={formData.fio}
								onChange={e => setFormData(prev => ({ ...prev, fio: e.target.value }))}
							/>
							{formErrors.fio.length > 0 && (
								<FormHelperText color="red.500">{formErrors.fio[0]}</FormHelperText>
							)}
						</FormControl>
						<FormControl id="login" isRequired>
							<FormLabel>Логин</FormLabel>
							<Input
								type="text"
								isInvalid={formErrors.login.length > 0}
								value={formData.login}
								onChange={e => setFormData(prev => ({ ...prev, login: e.target.value }))}
							/>
							{/* <FormHelperText>
								Может содержать английские буквы, цифры и знак нижнего подчеркивания
							</FormHelperText> */}
							{formErrors.login.length > 0 && (
								<FormHelperText color="red.500">{formErrors.login[0]}</FormHelperText>
							)}
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Пароль</FormLabel>
							<Input
								type="password"
								isInvalid={formErrors.password.length > 0}
								value={formData.password}
								onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
							/>
							{/* <FormHelperText>Не менее 8 символов</FormHelperText> */}
							{formErrors.password.length > 0 && (
								<FormHelperText color="red.500">{formErrors.password[0]}</FormHelperText>
							)}
						</FormControl>
						<Button onClick={handleRegister} pb={1} mt={1} mb={2} colorScheme="telegram">
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
