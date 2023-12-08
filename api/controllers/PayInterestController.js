const PayInterest = require('../models/PayInterest');
const Order = require('../models/Order');

exports.create = async (req, res) => {
	const { data } = req.body; // {order_id, name,pay_price, left_price, pay_date, change_date, description=""}

	// validation
	if(!data.order_id || !data.name || !data.pay_price || !data.pay_date || !data.change_date ){
		let errObject = {};

		data.order_id ? "": errObject.order_id="err";
		data.name ? "": errObject.name="err";
		data.pay_price ? "": errObject.pay_price="err";
		// data.left_price ? "": errObject.left_price="err";
		data.pay_date ? "": errObject.pay_date="err";
		data.change_date ? "": errObject.change_date="err";

		return res.status(406).json({err: "validation", validation: errObject})
	}

	try {
		// update into orders
		const OrderUpdateData = {
			date: data.change_date,
		}
		const resultOrder = await Order.update(OrderUpdateData, data.order_id);
		if (!resultOrder.changedRows) return res.status(400).json({err: "Order Id not Match found."});

		// insert into pay_interests
		const PayInterestCreateData = {
			order_id: data.order_id,
			name: data.name,
			pay_price: data.pay_price,
			// left_price: data.left_price,
			pay_date: data.pay_date,
			change_date: data.change_date,
			description: data.description || "",
		}
		const resultPayInterest = await PayInterest.create(PayInterestCreateData);
		if (!resultPayInterest.insertId) return res.status(400).json({err: "error in insert pay_interests"});

		return res.status(200).json({msg: "အတိုးဆပ် လပြောင်းပြီးပါပြီ"});
	} catch (e) {
		return res.status(500).json({err: e.message})
	}

}
