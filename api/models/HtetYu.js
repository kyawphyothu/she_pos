const db = require("../config/db")

class HtetYu{
	static async create(dataObj={}){
		const columns = Object.keys(dataObj); // []
		const data = Object.values(dataObj); // []

		const [result, fileds] = await db.query(`INSERT INTO htet_yus ( ${columns.join(",")} ) VALUES (${ Array(columns.length).fill("?").join(", ") })`, data)

		return result;
	}
}

module.exports = HtetYu;