const db = require("../config/db")

class Acceptor{
	static async all() {
		const [results, fields] = await db.query('SELECT * FROM acceptors');
		return results;
	}

	// static async find(id) {
	// 	const result = await this.db.query('SELECT * FROM acceptors WHERE id = ?', [id]);
	// 	return new Acceptor(result[0].id, result[0].name);
	// }

	// static async create(Acceptor) {
	// 	const result = await this.db.query('INSERT INTO acceptors (name) VALUES (?)', [Acceptor.name]);
	// 	Acceptor.id = result.insertId;
	// 	return Acceptor;
	// }

	// static async update(Acceptor) {
	// 	await this.db.query('UPDATE acceptors SET name = ? WHERE id = ?', [Acceptor.name, Acceptor.id]);
	// 	return Acceptor;
	// }

	// static async destroy(id) {
	// 	await this.db.query('DELETE FROM acceptors WHERE id = ?', [id]);
	// }
}

module.exports = Acceptor;
