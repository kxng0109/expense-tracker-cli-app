import { Command } from "commander";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
const program = new Command();

const filePath = "./exp.json";

const writeToFile = (content) => {
	try {
		writeFileSync(filePath, JSON.stringify(content), "utf8");
	} catch (err) {
		console.error("An error occured when writing file: ", err.message);
		process.exit(1);
	}
};

const readFromFile = () => {
	try {
		const data = readFileSync(filePath, "utf8");
		return JSON.parse(data);
	} catch (err) {
		if (err.code === "ENOENT") {
			writeToFile([]);
		} else {
			console.error(
				"An error occurred while trying to fetch summary:",
				err.message,
			);
			process.exit(1);
		}
	}
};

const addExpenseToFile = (newExpense) => {
	let data = readFromFile();
	data.push(newExpense);
	writeToFile(data);
};

const generateID = () => {
	try {
		if (!existsSync(filePath)) {
			readFromFile();
			return 1;
		}

		const data = readFileSync(filePath, "utf8");
		if (data === "[]" || data.trim() === "") return 1;

		const expenses = JSON.parse(data);
		const previousID = expenses[expenses.length - 1].id;
		return previousID + 1;
	} catch (err) {
		console.error("Error reading file:", err.message);
		process.exit(1);
	}
};

const findSingleExpense = (id) => {
	const data = readFromFile();
	const item = data.find((item) => item.id === id);
	if (!item) {
		console.error(
			"No expense with this id, %i, found. Run the 'list' command to view all expenses and their respective id", id
		);
		process.exit(1);
	}
	return item;
};

const updateExpense = (id, description, amount) => {
	try {
		const expense = findSingleExpense(id);
		let allExpenses = readFromFile();
		const expensePostion = allExpenses.findIndex(item => item.id === expense.id);
		let updated = {
			...expense,
			description: description || expense.description,
			amount: amount || expense.amount,
		};
		allExpenses.splice(expensePostion, 1, updated);
		writeToFile(allExpenses);
		console.log("Expense updated successfully.");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

const deleteExpense = (id) => {
	try {
		let expense = findSingleExpense(id);
		let allExpenses = readFromFile();
		if (expense) {
			let index = allExpenses.findIndex(item => item.id === expense.id)
			allExpenses.splice(index, 1);
			writeToFile(allExpenses);
			console.log("Expense deleted successfully");
		}
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

const myParseInt = (value, previous) =>{
	let parsedValue = parseInt(value, 10);
	if(isNaN(parsedValue)){
		console.error("Option should be a number");
		process.exit(1);
	}
	return parsedValue;
}

const dateParser = date => date < 10 ? `0${date}` : date;

const formatDate = date => {
    const d = dateParser(date.getDate());
    const m = dateParser(date.getMonth() + 1);
    return `${date.getFullYear()}-${m}-${d}`;
};

program.name("expense-tracker").version("1.0.0");

//Add an expense
program
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
			amount: `₦${options.amount}`,
		};
		addExpenseToFile(newExpense);
		console.log("Expense added successfully (ID: %i)", id);
	});

//Update expenses
program
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

//Delete expense
program
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

//View all expenses
program
	.command("list")
	.description("list all expenses")
	.action(() => {
		const columnWidths = [5, 15, 15, 10];
		const allExpenses = readFromFile();
		if(!allExpenses.length){
			console.log("No expenses recorded yet");
			return;
		}
		const expenseKeys = allExpenses.map(item => Object.keys(item))[0];
		const headerRow = expenseKeys.map((header, i) => header.padEnd(columnWidths[i])).join(" ");
		console.log("# " + headerRow)
		const expenseValues = allExpenses.map(item => Object.values(item));
		expenseValues.forEach(item =>{
			const row = [
				String(item[0]).padEnd(columnWidths[0]),
				item[1].padEnd(columnWidths[1]),
				item[2].padEnd(columnWidths[2]),
				item[3].padEnd(columnWidths[3]),
			].join(" ");
			console.log("# " + row);
		})
	});

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

program.parse();
