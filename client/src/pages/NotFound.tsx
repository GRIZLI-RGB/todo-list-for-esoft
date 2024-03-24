import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<Flex justifyContent="center" alignItems="center" h="100vh">
			<Box textAlign="center">
				<Heading as="h1" size="4xl">
					404
				</Heading>
				<Text fontSize="2xl" mt={4}>
					Страница не найдена
				</Text>
				<Button colorScheme="telegram" mt={10} onClick={() => navigate(-1)} size="lg" variant="outline">
					Вернуться назад
				</Button>
			</Box>
		</Flex>
	);
}
