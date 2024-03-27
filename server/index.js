import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import fs from "fs";

import db from "./utils/db.js";

import swagger from "./docs/swagger.js";

import authRouter from "./routes/auth.router.js";
import usersRouter from "./routes/user.router.js";
import tasksRouter from "./routes/task.router.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", authRouter, usersRouter, tasksRouter);

async function startServer() {
	try {
		await db.authenticate();
		await db.sync();
		console.log("[DB OK]");
		swagger().then(_ => {
			app.use(
				"/swagger",
				swaggerUI.serve,
				swaggerUI.setup(JSON.parse(fs.readFileSync("./docs/swagger-output.json"))),
			);
		});
		app.listen(8000, () => console.log("[SERVER OK]"));
	} catch (error) {
		console.error("DB ERROR", error);
	}
}

startServer();
