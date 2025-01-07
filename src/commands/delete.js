import { Command } from "commander";
import { deleteExpense } from "../services/expenseService.js";
import myParseInt from "../utils/inputParser.js";
const program = new Command();

//Delete expense
const deleteCommand = program
	.command("delete")
	.description("delete an existing product by providing it's id")
	.summary("delete an product")
	.option("-i, --id <number>", "product ID", myParseInt)
	.action((options) => {
		if (!options.id) {
			console.error("ID not specified");
		} else {
			deleteExpense(options.id);
		}
	});

export default deleteCommand;