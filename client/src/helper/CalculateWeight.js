import NumChangeEngToMM from './NumChangeEngToMM';

const weight_type = [
	{
		mm: "ကျပ်",
		eng: "k"
	},
	{
		mm: "ပဲ",
		eng: "p"
	},
	{
		mm: "ရွေး",
		eng: "y"
	},
]

const CalculateWeight = (w, lang="mm") => {
	const k = Math.floor(w/128);
	const p = Math.floor( (w%128)/8 );
	const r = Math.floor( (w%128)%8 );

	let text = "";
	if(k){
		text += `${lang==="mm" ? NumChangeEngToMM(k) : k}${weight_type[0][lang]} `;
	}
	if(p){
		text += `${lang==="mm" ? NumChangeEngToMM(p) : p}${weight_type[1][lang]} `;
	}
	if(r){
		text += `${lang==="mm" ? NumChangeEngToMM(r) : r}${weight_type[2][lang]} `;
	}

	return text;
}

export default CalculateWeight;