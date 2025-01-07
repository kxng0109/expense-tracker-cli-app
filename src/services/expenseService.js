import { readFromFile, writeToFile } from "./fileServices.js";

const addExpenseToFile = (newExpense) => {
	let data = readFromFile();
	data.push(newExpense);
	writeToFile(data);
};

const findSingleExpense = (id) => {
	const data = readFromFile();
	const item = data.find((item) => item.id === id);
	if (!item) {
		console.error(
			"No expense with this id, %i, found. Run the 'list' command to view all expenses and their respective id",
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
			let index = allExpenses.findIndex((item) => item.id === expense.id);
			allExpenses.splice(index, 1);
			writeToFile(allExpenses);
			console.log("Expense deleted successfully");
		}
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

export { addExpenseToFile, deleteExpense, findSingleExpense, updateExpense };
