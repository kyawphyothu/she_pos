const Order = require('../models/Order');

exports.index = async (req, res) => {
	const nameOrCode = req.query.q;

	const result = await Order.getOrdersByNameCode(nameOrCode);
	res.json(result);
}

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
