const Redeem = require('../models/Redeem');
const Order = require('../models/Order');

exports.create = async (req, res) => {
	const { data } = req.body; // {order_id, name, price, date, description=""}

	// validation
	if(!data.order_id || !data.name || !data.price || !data.date){
		let errObject = {};

		data.order_id ? "": errObject.order_id="err";
		data.name ? "": errObject.name="err";
		data.price ? "": errObject.price="err";
		data.date ? "": errObject.date="err";

		return res.status(406).json({err: "validation", validation: errObject})
	}

	try {
		// insert into orders
		const OrderUpdateData = {
			redeem: 1
		}
		const resultOrder = await Order.update(OrderUpdateData, data.order_id);
		if(!resultOrder.changedRows) return res.status(400).json({err: "errro in update into orders"});

		// insert into pawns
		const RedeemCreateData = {
			order_id: data.order_id,
			name: data.name,
			price: data.price,
			date: data.date,
			description: data.description || "",
		}
		const resultRedeem = await Redeem.create(RedeemCreateData);
		if(!resultRedeem.insertId) return res.status(400).json({err: "error in insert into pawns"});

		return res.status(200).json({msg: "ရွေးပြီးပါပြီ"});
	} catch (e) {
		return res.status(500).json({err: e.message})
	}

}
