const db = require("../config/db")

class Pawn{
	static async getPawnById(id){
		const query = `
			SELECT * FROM pawns WHERE id=?
		`;

		const [results, fields] = await db.query(query, id);
		return results[0];
	}

	static async create(dataObj={}){
		const columns = Object.keys(dataObj); // []
		const data = Object.values(dataObj); // []

		const [result, fileds] = await db.query(`INSERT INTO pawns ( ${columns.join(",")} ) VALUES (${ Array(columns.length).fill("?").join(", ") })`, data)

		return result;
	}

	static async update(id, dataObj){
		const columns = Object.keys(dataObj); // []
		const setColumns = columns.map(i => i + "=?"); // ["c1=?"", "c2=?"]
		const data = Object.values(dataObj); // []
		data.push(id); // [..., id]

		const [result, fileds] = await db.query(`UPDATE pawns SET ${setColumns.join(", ")} WHERE order_id = ?`, data)

		return result;
	}
}

module.exports = Pawn;