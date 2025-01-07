import { Command } from "commander";
import myParseInt from "../utils/inputParser.js";
const program = new Command();

//Summary of all expenses or expenses for a time period
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
		// if(!options.month && )
		console.log("#");
	});