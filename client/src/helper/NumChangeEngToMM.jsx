const NumChangeEngToMM = (n, localeString = false) => {
	let s = "";

	if (localeString) {
		s = n.toLocaleString();
	} else {
		s = n.toString();
	}

	const res = s.replaceAll("0", "၀")
		.replaceAll("1", "၁")
		.replaceAll("2", "၂")
		.replaceAll("3", "၃")
		.replaceAll("4", "၄")
		.replaceAll("5", "၅")
		.replaceAll("6", "၆")
		.replaceAll("7", "၇")
		.replaceAll("8", "၈")
		.replaceAll("9", "၉")



	return res;

}

export default NumChangeEngToMM;