import { Command } from "commander";
import { addExpenseToFile } from "../services/expenseService.js";
import myParseInt from "../utils/inputParser.js";

//Add an expense
const addCommand = new Command("add")
	.description("Add an expense")
	.requiredOption("-d, --description <text>", "Product description")
	.requiredOption("-a, --amount <value>", "Product price", myParseInt)
	.action((options) => {
		addExpenseToFile(options.description, options.amount);
	});

export default addCommand;
