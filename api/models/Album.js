const db = require("../config/db")

class Album{
	static async all() {
		const [results, fields] = await db.query('SELECT * FROM albums order by id desc');
		return results;
	}

	static async create(name) {
		const [results, fields] = await db.query(`INSERT INTO albums (name) VALUES (?)`, name);
		return results;
	}

	static async update(id, name) {
		const [results, fileds] = await db.query(`UPDATE albums SET name=? WHERE id=?`, [name, id]);
		return results;
	}

	static async getOrdersByAlbumId(id){
		const query = `
			SELECT orders.id, orders.name, orders.phone, orders.gold, orders.weight, orders.date, orders.redeem, pawns.price, acceptors.name as acceptor, villages.name as village
			FROM orders
			LEFT JOIN order_albums ON order_albums.order_id=orders.id
			LEFT JOIN albums ON albums.id=order_albums.album_id
			LEFT JOIN pawns ON pawns.order_id=orders.id
			LEFT JOIN acceptors ON acceptors.id=orders.acceptor_id
			LEFT JOIN villages ON villages.id=orders.village_id
			WHERE albums.id=?
			ORDER BY orders.date DESC, orders.created_at DESC
		`
		const [results, fileds] = await db.query(query, id);
		return results;
	}

	static async getAlbumById(id){
		const query= `
			SELECT * FROM albums WHERE albums.id=?
		`;

		const [results, fileds] = await db.query(query, id);
		return results[0];
	}

	static async delete(id){
		const [results, fileds] = await db.query(`DELETE FROM albums WHERE id=?`, id);
		return results;
	}
}

module.exports = Album;
