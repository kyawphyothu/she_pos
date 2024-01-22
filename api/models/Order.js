const db = require("../config/db")

class Order{
	static async getOrdersByNameCode(isCountQuery, searchString, villageId, page, limit){
		searchString = `%${searchString}%`;
		const params = [searchString, searchString];
		let query;

		if (isCountQuery) {
			query = `SELECT count(orders.id) as total`;
		} else {
			query = `SELECT orders.id, orders.name, orders.phone, pawns.gold, pawns.weight, pawns.date, orders.redeem, pawns.price, acceptors.name as acceptor, villages.name as village`;
		}

		query += ` FROM orders
			LEFT JOIN pawns ON pawns.order_id=orders.id
			LEFT JOIN acceptors ON acceptors.id=orders.acceptor_id
			LEFT JOIN villages ON villages.id=orders.village_id
			WHERE orders.name LIKE ? OR orders.code LIKE ?`
		;

		if(villageId !== "all"){
			query += ` AND village_id in (?)`;
			params.push(villageId);
		}

		query += ` ORDER BY pawns.date desc, orders.created_at desc`;

		if (!isCountQuery) {
			query += ` LIMIT ?,?`;
			params.push((page - 1) * limit, limit);
		}

		const [result, fileds] = await db.query(query, params)

		return result;
	}

	static async getOrderById(id){
		const query = `
			SELECT orders.id, orders.code, orders.name, orders.phone, orders.gold, orders.weight, orders.redeem, orders.date, acceptors.id as acceptor_id, acceptors.name as acceptor, villages.id as village_id, villages.name as village, order_albums.id as order_album_id, albums.id as album_id, albums.name as album_name
			FROM orders
			LEFT JOIN acceptors ON acceptors.id=orders.acceptor_id
			LEFT JOIN villages ON villages.id=orders.village_id
			LEFT JOIN order_albums ON order_albums.order_id=orders.id
			LEFT JOIN albums ON albums.id = order_albums.album_id
			WHERE orders.id=?
		`;
		const [result, fileds] = await db.query(query, id)

		return result;
	}

	static async getThisDayOrder(){
		const query = `SELECT orders.id, orders.name, orders.phone, orders.gold, orders.weight, orders.date, orders.redeem, pawns.price, acceptors.name as acceptor, villages.name as village
			FROM orders
			LEFT JOIN pawns ON pawns.order_id=orders.id
			LEFT JOIN acceptors ON acceptors.id=orders.acceptor_id
			LEFT JOIN villages ON villages.id=orders.village_id
			WHERE orders.date = CURDATE()
			ORDER BY date desc`
		;
		const [result, fileds] = await db.query(query)

		return result;
	}

	static async getHistoryByOrderId(order_id){
		const query = `
			SELECT id, name, gold, NULL as take_gold, NULL as left_gold, weight, price, NULL as pay_price, NULL as left_price, date, NULL as pay_date, NULL as change_date, description, created_at, "pawn" as status
			FROM pawns
			WHERE order_id = ?
			UNION
			SELECT id, name, NULL as gold, NULL as take_gold, NULL as left_gold, NULL as weight, NULL as price, pay_price, NULL as left_price, NULL as date, pay_date, change_date, description, created_at, "pay_interest" as status
			FROM pay_interests
			WHERE order_id = ?
			UNION
			SELECT id, name, gold, NULL as take_gold, NULL as left_gold, weight, price, NULL as pay_price, NULL as left_price, date, NULL as pay_date, NULL as change_date, description, created_at, "htet_yu" as status
			FROM htet_yus
			WHERE order_id = ?
			UNION
			SELECT id, name, NULL as gold, take_gold, left_gold, weight, NULL as price, pay_price, left_price, date, NULL as pay_date, NULL as change_date, description, created_at, "half_redeem" as status
			FROM half_redeems
			WHERE order_id = ?
			UNION
			SELECT id, name, NULL as gold, NULL as take_gold, NULL as left_gold, NULL as weight, price, NULL as pay_price, NULL as left_price, date, NULL as pay_date, NULL as change_date, description, created_at, "redeem" as status
			FROM redeems
			WHERE order_id = ?
			ORDER BY created_at;
		`;
		const [result, fileds] = await db.query(query, [order_id, order_id, order_id, order_id, order_id]);

		return result;
	}

	static async create(dataObj={}) {
		dataObj.code = new Date().getTime();

		const columns = Object.keys(dataObj); // []
		const data = Object.values(dataObj); // []

		const [result, fileds] = await db.query(`INSERT INTO orders ( ${columns.join(",")} ) VALUES (${Array(columns.length).fill("?").join(", ")})`, data)

		return result;
	}

	static async update(dataObj={}, id) {
		const columns = Object.keys(dataObj); // []
		const setColumns = columns.map(i => i + "=?"); // ["c1=?"", "c2=?"]
		const data = Object.values(dataObj); // []
		data.push(id); // [..., id]

		const [result, fileds] = await db.query(`UPDATE orders SET ${setColumns.join(", ")} WHERE id = ?`, data)

		return result;
	}

	static async destroy (id){
		const [results, fields] = await db.query(`DELETE FROM orders WHERE id=?`, id);
		return results;
	}
}

module.exports = Order;