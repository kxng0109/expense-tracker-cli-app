import chalk from "chalk";
import currencyUtils from "../utils/currencyUtils.js";
import { formatDate } from "../utils/dateUtils.js";
import generateID from "../utils/idGenerator.js";
import { readFromFile, writeToFile } from "./fileServices.js";

const addExpenseToFile = (description, amount) => {
	try {
		const id = generateID();
		const newExpense = {
			id,
			date: `${formatDate(new Date())}`,
			description: description,
			amount: `₦${amount}`,
		};
		let data = readFromFile();
		data.push(newExpense);
		writeToFile(data);
		console.log(chalk.green("Expense added successfully (ID: %i)"), id);
	} catch (err) {
		console.error(
			chalk.red("An error occured while adding expense: ", err.message),
		);
	}
};

const findSingleExpense = (id) => {
	const data = readFromFile();
	const item = data.find((item) => item.id === id);
	if (!item) {
		console.error(
			chalk.red(
				"No expense with this id, %i, found. Run the 'list' command to view all expenses and their respective id",
			),
			id,
		);
		process.exit(1);
	}
	return item;
};

const updateExpense = (id, description, amount) => {
	try {
		const expense = findSingleExpense(id);
		let allExpenses = readFromFile();
		const expensePostion = allExpenses.findIndex(
			(item) => item.id === expense.id,
		);
		let updated = {
			...expense,
			description: description || expense.description,
			amount: amount || expense.amount,
		};
		allExpenses.splice(expensePostion, 1, updated);
		writeToFile(allExpenses);
		console.log(chalk.green("Expense updated successfully."));
	} catch (err) {
		console.error(chalk.red("Error updating expenses: ", err.message));
		process.exit(1);
	}
};

const deleteExpense = (id) => {
	try {
		let expense = findSingleExpense(id);
		let allExpenses = readFromFile();
		if (expense) {
			let index = allExpenses.findIndex((item) => item.id === expense.id);
			allExpenses.splice(index, 1);
			writeToFile(allExpenses);
			console.log(chalk.green("Expense deleted successfully"));
		}
	} catch (err) {
		console.error(chalk.red("Error deleting expenses: ", err.message));
		process.exit(1);
	}
};

const listExpenses = () => {
	try {
		const columnWidths = [5, 15, 25, 10];
		const allExpenses = readFromFile();
		if (!allExpenses.length) {
			console.log(chalk.yellow("No expenses recorded yet"));
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
	} catch (err) {
		console.error(chalk.red("Error listing expenses: ", err.message));
		process.exit(1);
	}
};

const summarizeExpense = (month, year) => {
	const monthsArray = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const allExpenses = readFromFile();
	if (!allExpenses || !allExpenses.length) {
		console.log("No expenses recorded yet");
		return;
	}
	if (!month && !year) {
		const prices = allExpenses.map((item) =>
			Number(currencyUtils(item.amount)),
		);
		const totalPrice = prices.reduce((total, num) => total + num);
		console.log(chalk.green(`Total expenses: ₦${totalPrice}`));
	} else {
		const filteredExpenses = allExpenses.filter(
			(item) =>
				item.date.includes(`-${month}-`) || item.date.startsWith(year),
		);
		const prices = filteredExpenses.map((item) =>
			Number(currencyUtils(item.amount)),
		);
		if (prices.length) {
			const totalPrice = prices.reduce((total, num) => total + num);
			console.log(
				chalk.green(
					`Total expenses for ${monthsArray[month - 1] || year}: ₦${totalPrice}`,
				),
			);
			return;
		}
		console.log(chalk.yellow("No expense found within this time period"));
	}
};

export {
    addExpenseToFile,
    deleteExpense,
    findSingleExpense,
    listExpenses,
    summarizeExpense,
    updateExpense
};

