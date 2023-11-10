export default function FormatCode(inputString) {
	// Ensure the input is a string
	// const inputString = String(number);

	// Use slice to extract substrings and concatenate them with the desired formatting
	const formattedNumber =
	inputString.slice(0, 4) +
	' ' +
	inputString.slice(4, 8) +
	' ' +
	inputString.slice(8, 11) +
	' ' +
	inputString.slice(11);

	return formattedNumber;
}