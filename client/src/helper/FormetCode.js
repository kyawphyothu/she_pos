export default function FormatCode(inputString) {
	// Ensure the input is a string
	// const inputString = String(number);

	// Use slice to extract substrings and concatenate them with the desired formatting
	const formattedNumber =
	inputString.slice(0, 3) +
	' ' +
	inputString.slice(3, 6) +
	' ' +
	inputString.slice(6, 9) +
	' ' +
	inputString.slice(9, 13)

	return formattedNumber;
}