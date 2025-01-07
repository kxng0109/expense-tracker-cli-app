import { Command } from "commander";
import { listExpenses } from "../services/expenseService.js";

//View all expenses
const listCommand = new Command("list")
	.description("list all expenses")
	.action(() => {
		listExpenses();
	});

export default listCommand;
