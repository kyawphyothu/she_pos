const Report = require('../models/Report');

exports.index = async (req, res) => {
	const { year } = req.query;

	const {pawn_results, htet_yu_results, pay_interest_results, redeem_results, half_redeem_results} = await Report.get_monthly_report(year);

	let r= {}

	pawn_results.map(i => {
		if(!r[i.pawn_date]) r[i.pawn_date] = {};
		if(!r[i.pawn_date][i.acceptor_id]) r[i.pawn_date][i.acceptor_id] = {}

		r[i.pawn_date][i.acceptor_id].pawn_price = i.pawn_price;
	})
	htet_yu_results.map(i => {
		if(!r[i.htet_yu_date]) r[i.htet_yu_date] = {};
		if(!r[i.htet_yu_date][i.acceptor_id]) r[i.htet_yu_date][i.acceptor_id] = {}

		r[i.htet_yu_date][i.acceptor_id].htet_yu_price = i.htet_yu_price;
	})
	pay_interest_results.map(i => {
		if(!r[i.pay_interest_date]) r[i.pay_interest_date] = {};
		if(!r[i.pay_interest_date][i.acceptor_id]) r[i.pay_interest_date][i.acceptor_id] = {}

		r[i.pay_interest_date][i.acceptor_id].pay_interest_price = i.pay_interest_price;
	})
	half_redeem_results.map(i => {
		if(!r[i.half_redeem_date]) r[i.half_redeem_date] = {};
		if(!r[i.half_redeem_date][i.acceptor_id]) r[i.half_redeem_date][i.acceptor_id] = {}

		r[i.half_redeem_date][i.acceptor_id].half_redeem_price = i.half_redeem_price;
	})
	redeem_results.map(i => {
		if(!r[i.redeem_date]) r[i.redeem_date] = {};
		if(!r[i.redeem_date][i.acceptor_id]) r[i.redeem_date][i.acceptor_id] = {}

		r[i.redeem_date][i.acceptor_id].redeem_price = i.redeem_price;
	})

	res.json(r);
}
