import { Command } from "commander";
import { updateExpense } from "../services/expenseService.js";
import myParseInt from "../utils/inputParser.js";
const program = new Command();

//Update expenses
const updateCommand = program
	.command("update")
	.description(
		"update the value/s of an existing product by providing it's id",
	)
	.summary("update a product with given id")
	.option("-i, --id <number>", "product ID", myParseInt)
	.option("-d, --description <text>", "Product description")
	.option("-a, --amount <value>", "Product price", myParseInt)
	.action((options) => {
		if (!options.id) {
			console.error("ID not specified");
		} else if (!options.description && !options.amount) {
			console.log("No changes made.");
		} else {
			updateExpense(
				options.id,
				options.description,
				options.amount,
			);
		}
	});

export default updateCommand;