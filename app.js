import { Command } from "commander";
import { appendFile, readFile } from "node:fs";
const program = new Command();

const addToFile = content =>{
    appendFile("./exp.json", `\n{${content}},`, "utf8", err => {
        if (err) {
            console.error("An error occured when writing file: ", err.message);
            process.exit(1);
        }
    });
}

const readSavedFile = () =>{
	return readFile("./exp.json", "utf8", (err, data) =>{
		if(err){
			console.log("An error occurred while trying to fetch summary: ", err.message)
			process.exit(1);
		}
		console.log(data)
		return data;
	})
}


program
	.name("expense-tracker")
	.version("1.0.0")


program
	.command("add")
	.description("Add an expense")
	.option("-d, --description <text>", "Product description")
	// .option("-id, --id [number]", "Product id", generateID)
	.option("-a, --amount <value>", "Product price")
	.action(options =>{
		console.log(new Date().getMonth())
		addToFile(`"id": 1, "description": "${options.description}", "amount": ${options.amount}, "date": "${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}"`)
		console.log("Expense added successfully")
	});

//Update expenses
program
	.command("update")
	.description("update the value/s of an existing product by providing it's id")
	.summary("update a product with given id")
	// .option("-id, --id <number>", "product ID", findID)
	.action(options =>{
		// if(!options.id) throw new CommanderError(1, )
		console.log("Expense updated successfully.")
	});

//Delete expense
program
	.command("delete")
	.description("delete an existing product by providing it's id")
	.summary("delete an product")
	// .option("-id, --id <number>", "product ID", findID)
	.action(options =>{
		// if(!options.id) throw new CommanderError(1, )
		console.log("Expense deleted successfully")
	});

//View all expenses
program
	.command("list")
	.description("list all expenses")
	.action(() =>{
		// console.log(readSavedFile())
	});

//Summary of all expenses or expenses for a time period
program
	.command("summary")
	.description("summary of all expenses or expenses for a time period")
	.summary("expenses summary")
	.option("-m, --month <number>", "expense month in terms of number (1-12)", 0)
	.option("-y, --year <number>", "expense year", 0)
	.action(options =>{
		// if(!options.month && )
		console.log("#")
	});

program.parse();