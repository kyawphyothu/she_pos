const db = require("../config/db")

class Village{
	static async all() {
		const [results, fields] = await db.query('SELECT * FROM villages');
		return results;
	}

	static async create(name) {
		const [results, fileds] = await db.query(`INSERT INTO villages (name) VALUES (?)`, name);
		return results;
	}

	static async update(id, name) {
		const [results, fileds] = await db.query(`UPDATE villages SET name=? WHERE id=?`, [name, id]);
		return results;
	}
}

module.exports = Village;