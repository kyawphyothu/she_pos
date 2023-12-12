const Order = require('../models/Order');

exports.index = async (req, res) => {
	const nameOrCode = req.query.q || "";
	const village_id = req.query.village || "all";
	const page = +req.query.page || 1;
	const limit = +req.query.limit || 3;

	try{
		const countTotal = await Order.getOrdersByNameCode(true, nameOrCode, village_id);
		const result = await Order.getOrdersByNameCode(false, nameOrCode, village_id, page, limit);

		res.json({countTotal: countTotal[0].total, result});
	}catch (e){
		return res.json({err: e.message});
	}
}

// search by order id
exports.show = async (req, res) => {
	const order_id = req.params.id;

	const result = await Order.getOrderById(order_id);
	res.json(result[0]);
}

exports.thisDay = async (req, res) => {
	const result = await Order.getThisDayOrder();
	res.json(result);
}

exports.history = async (req, res) => {
	const order_id = req.params.id;

	const result = await Order.getHistoryByOrderId(order_id);
	res.json(result);
}
