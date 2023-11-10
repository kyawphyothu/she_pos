const db = require("../config/db")

class PayInterest{
	static async create(dataObj={}){
		const columns = Object.keys(dataObj); // []
		const data = Object.values(dataObj); // []

		const [result, fileds] = await db.query(`INSERT INTO pay_interests ( ${columns.join(",")} ) VALUES (${ Array(columns.length).fill("?").join(", ") })`, data)

		return result;
	}
}

module.exports = PayInterest;