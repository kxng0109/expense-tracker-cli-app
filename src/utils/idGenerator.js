import { readFileSync } from "node:fs";
import { filePath, readFromFile } from "../services/fileServices.js";

const generateID = () => {
	try {
		if (!fs.existsSync(filePath)) {
			readFromFile();
			return 1;
		}

		const data = readFileSync(filePath, "utf8");
		if (data === "[]" || data.trim() === "") return 1;

		const expenses = JSON.parse(data);
		const previousID = expenses[expenses.length - 1].id;
		return previousID + 1;
	} catch (err) {
		console.error("Error reading file:", err.message);
		process.exit(1);
	}
};

export default generateID;
