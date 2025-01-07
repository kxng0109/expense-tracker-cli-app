import { Command } from "commander";
import addCommand from "./src/commands/add.js";
import listCommand from "./src/commands/list.js";
import { readFromFile } from "./src/services/fileServices.js";
import myParseInt from "./src/utils/inputParser.js";
const program = new Command();

program.name("expense-tracker").version("1.0.0");

program
	.command("summary")
	.description("summary of all expenses or expenses for a time period")
	.summary("expenses summary")
	.option(
		"-m, --month <number>",
		"expense month in terms of number (1-12)", 
		myParseInt
	)
	.option("-y, --year <number>", "expense year", myParseInt)
	.action((options) => {
		if(!options.month && !options.year){
			const allExpenses = readFromFile();
			if (!allExpenses.length) {
				console.log("No expenses recorded yet");
				return;
			}
			const prices = allExpenses.map(item => Number(item.amount));
			const totalPrice = prices.reduce((total, num) => total + num)
			console.log(`Total expenses: ₦${totalPrice}`);
		}
	});

program.parse();
