const db = require("../config/db")

class Report{
	static async get_monthly_report(year) {
		const query_pawn = `
			SELECT acceptors.id as acceptor_id, acceptors.name, sum(pawns.price) as pawn_price, month(pawns.date) as pawn_date
			FROM acceptors
			LEFT JOIN orders on orders.acceptor_id = acceptors.id
			LEFT JOIN pawns on pawns.order_id = orders.id and year(pawns.date)=?
			WHERE pawns.price is not null
			GROUP BY month(pawns.date), acceptors.id`
		;
		const query_htet_yu = `
			SELECT acceptors.id as acceptor_id, acceptors.name, sum(htet_yus.price) as htet_yu_price, month(htet_yus.date) as htet_yu_date
			FROM acceptors
			LEFT JOIN orders on orders.acceptor_id = acceptors.id
			LEFT JOIN htet_yus on htet_yus.order_id = orders.id and year(htet_yus.date)=?
			WHERE htet_yus.price is not null
			GROUP BY month(htet_yus.date), acceptors.id`
		;
		const query_pay_interest = `
			SELECT acceptors.id as acceptor_id, acceptors.name, sum(pay_interests.pay_price) as pay_interest_price, month(pay_interests.pay_date) as pay_interest_date
			FROM acceptors
			LEFT JOIN orders on orders.acceptor_id = acceptors.id
			LEFT JOIN pay_interests on pay_interests.order_id = orders.id and year(pay_interests.pay_date)=?
			WHERE pay_interests.pay_price is not null
			GROUP BY month(pay_interests.pay_date), acceptors.id`
			;
			const query_half_redeem = `
			SELECT acceptors.id as acceptor_id, acceptors.name, sum(half_redeems.pay_price) as half_redeem_price, month(half_redeems.date) as half_redeem_date
			FROM acceptors
			LEFT JOIN orders on orders.acceptor_id = acceptors.id
			LEFT JOIN half_redeems on half_redeems.order_id = orders.id and year(half_redeems.date)=?
			WHERE half_redeems.pay_price is not null
			GROUP BY month(half_redeems.date), acceptors.id`
			;
			const query_redeem = `
			SELECT acceptors.id as acceptor_id, acceptors.name, sum(redeems.price) as redeem_price, month(redeems.date) as redeem_date
			FROM acceptors
			LEFT JOIN orders on orders.acceptor_id = acceptors.id
			LEFT JOIN redeems on redeems.order_id = orders.id and year(redeems.date)=?
			where redeems.price is not null
			GROUP BY month(redeems.date), acceptors.id`
		;

		const [pawn_results, p_fields] = await db.query(query_pawn,[year]);
		const [htet_yu_results] = await db.query(query_htet_yu,[year]);
		const [pay_interest_results] = await db.query(query_pay_interest,[year]);
		const [half_redeem_results] = await db.query(query_half_redeem,[year]);
		const [redeem_results] = await db.query(query_redeem,[year]);

		return {
			pawn_results, htet_yu_results, pay_interest_results, half_redeem_results, redeem_results
		}
	}
}

module.exports = Report;
