const db = require("../config/db")

class HalfRedeem{
	static async create(dataObj={}){
		const columns = Object.keys(dataObj); // []
		const data = Object.values(dataObj); // []

		const [result, fileds] = await db.query(`INSERT INTO half_redeems ( ${columns.join(",")} ) VALUES (${ Array(columns.length).fill("?").join(", ") })`, data)

		return result;
	}
}

module.exports = HalfRedeem;