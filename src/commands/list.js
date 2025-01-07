import { Command } from "commander";
import { readFromFile } from "../services/fileServices.js";
const program = new Command();

//View all expenses
const listCommand = program
	.command("list")
	.description("list all expenses")
	.action(() => {
		const columnWidths = [5, 15, 15, 10];
		const allExpenses = readFromFile();
		if (!allExpenses.length) {
			console.log("No expenses recorded yet");
			return;
		}
		const expenseKeys = allExpenses.map((item) => Object.keys(item))[0];
		const headerRow = expenseKeys
			.map((header, i) => header.padEnd(columnWidths[i]))
			.join(" ");
		console.log("# " + headerRow);
		const expenseValues = allExpenses.map((item) => Object.values(item));
		expenseValues.forEach((item) => {
			const row = [
				String(item[0]).padEnd(columnWidths[0]),
				item[1].padEnd(columnWidths[1]),
				item[2].padEnd(columnWidths[2]),
				item[3].padEnd(columnWidths[3]),
			].join(" ");
			console.log("# " + row);
		});
	});

export default listCommand;
