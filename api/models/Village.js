const db = require("../config/db")

class Village{
	static async all() {
		const [results, fields] = await db.query('SELECT * FROM villages');
		return results;
	}
}

module.exports = Village;