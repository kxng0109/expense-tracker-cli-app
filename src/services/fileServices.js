import chalk from "chalk";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, "../../exp.json");

const writeToFile = (content) => {
	try {
		writeFileSync(filePath, JSON.stringify(content), "utf8");
	} catch (err) {
		console.error(
			chalk.red("An error occured when writing file: ", err.message),
		);
		process.exit(1);
	}
};

const readFromFile = () => {
	try {
		const data = readFileSync(filePath, "utf8");
		return JSON.parse(data);
	} catch (err) {
		if (err.code === "ENOENT") {
			writeToFile([]);
		} else {
			console.error(
				chalk.red(
					"An error occurred while trying to fetch summary:",
					err.message,
				),
			);
			process.exit(1);
		}
	}
};

export { filePath, readFromFile, writeToFile };
