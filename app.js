import { Command } from "commander";
import addCommand from "./src/commands/add.js";
import deleteCommand from "./src/commands/delete.js";
import listCommand from "./src/commands/list.js";
import summaryCommand from "./src/commands/summary.js";
import updateCommand from "./src/commands/update.js";
const program = new Command();

program.name("expense-tracker").version("1.0.0");
program.addCommand(addCommand);
program.addCommand(deleteCommand);
program.addCommand(listCommand);
program.addCommand(updateCommand);
program.addCommand(summaryCommand);

program.parse();
