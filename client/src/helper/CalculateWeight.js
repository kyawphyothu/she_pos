import NumChangeEngToMM from './NumChangeEngToMM';

const CalculateWeight = (w) => {
	const k = Math.floor(w/128);
	const p = Math.floor( (w%128)/8 );
	const r = Math.floor( (w%128)%8 );

	let text = "";
	if(k){
		text += `${NumChangeEngToMM(k)}ကျပ် `;
	}
	if(p){
		text += `${NumChangeEngToMM(p)}ပဲ `;
	}
	if(r){
		text += `${NumChangeEngToMM(r)}ရွေး `;
	}

	return text;
}

export default CalculateWeight;