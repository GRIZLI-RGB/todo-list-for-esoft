import { dirname, join } from "path";
import { fileURLToPath } from "url";

import swaggerAutogen from "swagger-autogen";

const _dirname = dirname(fileURLToPath(import.meta.url));

const doc = {
	info: {
		title: "To-Do-List",
		description: "Пасхалка для компании E-Soft: прочитал, улыбнись :)",
	},
	host: "localhost:8000/api",
};

const options = {
	openapi: "3.0.0",
};

const outputFile = join(_dirname, "swagger-output.json");
const endpointsFiles = [join(_dirname, "../routes/*.js")];

const swagger = async () =>
	await swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(() => console.log("[SWAGGER OK]"));

export default swagger;
