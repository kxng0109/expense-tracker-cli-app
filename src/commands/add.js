import { Command } from "commander";
import { addExpenseToFile } from "../services/expenseService.js";
import { formatDate } from "../utils/dateUtils.js";
import generateID from "../utils/idGenerator.js";
import myParseInt from "../utils/inputParser.js";
const program = new Command();

//Add an expense
const addCommand = program
	.command("add")
	.description("Add an expense")
	.option("-d, --description <text>", "Product description")
	.option("-a, --amount <value>", "Product price", myParseInt)
	.action((options) => {
		const id = generateID();
		const newExpense = {
			id,
			date: `${formatDate(new Date())}`,
			description: options.description,
			amount: `${options.amount}`,
		};
		addExpenseToFile(newExpense);
		console.log("Expense added successfully (ID: %i)", id);
	});

export default addCommand;
