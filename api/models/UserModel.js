const db = require("../config/db")

class User{
	static async find(username) {
		const [result, fileds] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
		return result[0];
	}

	static async findById(id) {
		const [result, fileds] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
		return result[0];
	}

	static async create(User) {
		const [result, fileds] = await db.query('INSERT INTO users (name, username, password) VALUES (?, ?, ?)', [User.name, User.username, User.password]);
		return result;
	}

	// static async update(Acceptor) {
	// 	await this.db.query('UPDATE acceptors SET name = ? WHERE id = ?', [Acceptor.name, Acceptor.id]);
	// 	return Acceptor;
	// }

	// static async destroy(id) {
	// 	await this.db.query('DELETE FROM acceptors WHERE id = ?', [id]);
	// }
}

module.exports = User;
