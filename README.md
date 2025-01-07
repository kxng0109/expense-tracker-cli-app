# Expense Tracker CLI App

A command-line application to track and manage expenses. Built with Node.js using Commander.js for CLI functionality and Chalk for styling the output. 
Project idea from <a href="https://roadmap.sh/projects/expense-tracker" target="_blank">roadmap.sh<a/>

---

## Features

- Add new expenses with a description and amount.
- Update existing expenses by their unique ID.
- Delete expenses by their unique ID.
- List all recorded expenses in a tabular format.
- Summarize expenses for:
  - **All time**: Get the total of all expenses.
  - **Specific month/year**: Filter expenses by a certain year or month.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kxng0109/expense-tracker-cli-app.git
   cd expense-tracker-cli-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Usage

### Add an Expense
Add a new expense by providing a description and amount:
```bash
node app.js add -d "Coffee" -a 500
```

### Update an Expense
Update an existing expense by its ID. Optionally, specify the new description and/or amount:
```bash
node app.js update -i 1 -d "Latte" -a 600
```

### Delete an Expense
Remove an expense by its ID:
```bash
node app.js delete -i 1
```

### List All Expenses
View all recorded expenses in a tabular format:
```bash
node app.js list
```

### Summarize Expenses
Get a summary of expenses:
- **All time**: 
  ```bash
  node app.js summary
  ```
- **Specific month**:
  ```bash
  node app.js summary -m 8
  ```
- **Specific year**:
  ```bash
  node app.js summary -y 2024
  ```

---

## File Structure

```
expense-tracker/
├── src/
│   ├── commands/          # CLI command definitions
│   ├── services/          # Core application logic
│   └── utils/             # Helper utilities
├── exp.json               # Expense storage file
├── app.js                 # Entry point for the CLI
├── package.json           # Dependencies and scripts
├── README.md              # Project documentation
```

---

## Dependencies

- [Commander.js](https://github.com/tj/commander.js) - For handling CLI commands.
- [Chalk](https://github.com/chalk/chalk) - For styling terminal output.

---

## Development Notes

1. The `exp.json` file is used to store expense data in JSON format. Future versions may integrate a database for scalability.
2. Error handling and input validation have been implemented to ensure robust operation.
3. Modular design allows easy maintenance and extension of the application.

---

<!-- ## Roadmap

- [ ] Complete the summary command to allow detailed filtering by date.
- [ ] Implement better error messages using Chalk.
- [ ] Add test cases for all commands.
- [ ] Integrate with a database (e.g., MongoDB or SQLite). -->

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

