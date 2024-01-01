const numbers_mm = ['', 'တစ်', 'နှစ်', 'သုံး', 'လေး', 'ငါး', 'ခြောက်', 'ခုနစ်', 'ရှစ်', 'ကိုး'];
const number_terms_mm = ['', 'ဆယ်', 'ရာ', 'ထောင်', 'သောင်း', 'သိန်း', 'သန်း'];

const num_to_mm_word = (n) => {
	let n_arr = n.toString().split("").reverse();

	if (n_arr.length > 12) return "ဂဏာန်း ၁၂ လုံးထိသာ အသုံးပြုနိုင်သေးသည်"

	let result = [];
	let isNoneZeroBehind = false;
	let useAndAfterMillion = false;
	n_arr.map((i, index) => {
		if (index < 6) {
			// အောက်ကမြင့်(့) ထည့် မထည့်ဆုံဖြတ်
			if(index >= 4) isNoneZeroBehind = false;

			if(i === "0") return;
			if(!useAndAfterMillion) useAndAfterMillion=true;

			result.push(`${numbers_mm[i]}${number_terms_mm[index]}${isNoneZeroBehind ? "့": ""}`);

			// အောက်ကမြင့်(့) ထည့် မထည့်ဆုံဖြတ်
			if(!isNoneZeroBehind) isNoneZeroBehind = true;
		}

		if (index >= 6) {
			index = index - 6;

			// အောက်ကမြင့်(့) ထည့် မထည့်ဆုံဖြတ်
			if(index<1 ||index >= 4) isNoneZeroBehind = false;

			if (index===0 && useAndAfterMillion) result.push(`နှင့်`);

			if (i === '0') return;

			// "n_arr.length-1-6" means last item of n_arr
			result.push(`${index===n_arr.length-1-6 && n_arr[6]==='0' ? "သန်း": ""}${numbers_mm[i]}${number_terms_mm[index]}${isNoneZeroBehind ? "့": ""}${index===0 && n_arr[6]!=='0' ? "သန်း": ""}`);

			// အောက်ကမြင့်(့) ထည့် မထည့်ဆုံဖြတ်
			if(!isNoneZeroBehind) isNoneZeroBehind = true;
		}

	})

	return result.reverse().join(" ");
}

export default num_to_mm_word;