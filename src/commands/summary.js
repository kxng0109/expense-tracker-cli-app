import { Command } from "commander";
import { summarizeExpense } from "../services/expenseService.js";
import myParseInt from "../utils/inputParser.js";

//Summary of all expenses or expenses for a time period
const summaryCommand = new Command("summary")
	.description("summary of all expenses or expenses for a time period")
	.summary("expenses summary")
	.option(
		"-m, --month <number>",
		"expense month in terms of number (1-12)",
		myParseInt,
	)
	.option("-y, --year <number>", "expense year", myParseInt)
	.action((options) => {
		summarizeExpense(options.month, options.year)
	});

export default summaryCommand;
