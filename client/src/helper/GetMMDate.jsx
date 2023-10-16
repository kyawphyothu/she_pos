import {englishToMyanmarDate} from 'burma-calendar'
import NumChangeEngToMM from './NumChangeEngToMM';

const GetMMDate = (d) => {
	const res = englishToMyanmarDate(d);
	return `${res.month} ${res.moonPhase} ${NumChangeEngToMM(res.date)}ရက် ${NumChangeEngToMM(res.year)}ခု`;
}

export default GetMMDate;