
const myParseInt = (value, previous) =>{
	let parsedValue = parseInt(value, 10);
	if(isNaN(parsedValue)){
		console.error("Option should be a number");
		process.exit(1);
	}
	return parsedValue;
}

export default myParseInt;