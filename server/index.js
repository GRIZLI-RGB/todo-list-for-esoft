import express from "express";

import db from "./utils/db.js";

const app = express();

async function startServer() {
	try {
		await db.authenticate();
		await db.sync();
		console.log("DB OK");
		app.listen(8000, () => console.log("SERVER OK"));
	} catch (error) {
		console.error("DB ERROR", error);
	}
}

startServer();
