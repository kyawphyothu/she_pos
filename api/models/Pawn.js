const db = require("../config/db")

class Pawn{
	static async create(dataObj={}){
		const columns = Object.keys(dataObj); // []
		const data = Object.values(dataObj); // []

		const [result, fileds] = await db.query(`INSERT INTO pawns ( ${columns.join(",")} ) VALUES (${ Array(columns.length).fill("?").join(", ") })`, data)

		return result;
	}
}

module.exports = Pawn;