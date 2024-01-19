const HalfRedeem = require('../models/HalfRedeem');
const Order = require('../models/Order');

exports.create = async (req, res) => {
	const { data } = req.body; // {order_id, name,take_gold, left_gold, weight, pay_price, left_price, date, description=""}

	// validation
	if(!data.order_id ||!data.name || !data.pay_price || !data.left_price || !data.date ){
		let errObject = {};

		data.order_id ? "": errObject.order_id="err";
		data.name ? "": errObject.name="err";
		// data.take_gold ? "": errObject.take_gold="err";
		// data.left_gold ? "": errObject.left_gold="err";
		// data.weight ? "": errObject.weight="err";
		data.pay_price ? "": errObject.pay_price="err";
		data.left_price ? "": errObject.left_price="err";
		data.date ? "": errObject.date="err";

		return res.status(406).json({err: "validation", validation: errObject})
	}

	try {
		if (data.take_gold && data.left_gold && data.weight) {
			// update into orders
			const OrderUpdateData = {
				gold: data.left_gold,
				weight: data.weight,
			}
			const resultOrder = await Order.update(OrderUpdateData, data.order_id);
			if(!resultOrder.changedRows) return res.status(400).json({err: "error in update into orders"});
		}

		// insert into half_redeems
		const HalfRedeemCreateData = {
			order_id: data.order_id,
			name: data.name,
			take_gold: data.take_gold || "",
			left_gold: data.left_gold || "",
			weight: data.weight || 0,
			pay_price: data.pay_price,
			left_price: data.left_price,
			date: data.date,
			description: data.description || "",
		}
		const resultHalfRedeem = await HalfRedeem.create(HalfRedeemCreateData);
		if(!resultHalfRedeem.insertId) return res.status(400).json({err: "error in insert into half_redeems"});

		return res.status(200).json({msg: "ခွဲရွေးခြင်း အောင်မြင်ပါသည်။"});
	} catch (e) {
		return res.status(500).json({err: e.message})
	}

}
