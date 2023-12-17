const db = require("../config/db")

class OrderAlbum{
	static async create({order_id, album_id}) {
		const [results, fields] = await db.query(`INSERT INTO order_albums (album_id, order_id) VALUES (?, ?)`, [album_id, order_id]);
		return results;
	}

	static async destroy(id) {
		const [results, fields] = await db.query(`DELETE FROM order_albums WHERE id=?`, id);
		return results;
	}
}

module.exports = OrderAlbum;
