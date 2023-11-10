const HtetYu = require('../models/HtetYu');
const Order = require('../models/Order');

exports.create = async (req, res) => {
	const { data } = req.body; // {name, order_id, price, gold="", weight="", date, description="""}

	// validation
	if(!data.name || !data.order_id || !data.price || !data.date ){
		let errObject = {};

		data.name ? "": errObject.name="err";
		data.order_id ? "": errObject.order_id="err";
		data.price ? "": errObject.price="err";
		data.date ? "": errObject.date="err";

		return res.status(406).json({err: "validation", validation: errObject})
	}

	const isAddGold = data.gold ? true: false;

	try {
		if (isAddGold) {
			if (!data.weight) return res.status(406).json({err: "validation", validation: {weight: "err"}})

			// get order
			const order = await Order.getOrderById(data.order_id);

			// update into orders
			const OrderUpdateData = {
				gold: `${order[0].gold} ${data.gold}`,
				weight: order[0].weight+data.weight,
			}
			// return res.status(200).json({msg: OrderCreateData})
			const resultOrder = await Order.update(OrderUpdateData, data.order_id);
			if(!resultOrder.changedRows) return res.status(400).json({err: "error in update into orders."})
		}

		// insert into htet_yus
		const HtetYuCreateData = {
			order_id: data.order_id,
			name: data.name,
			gold: data.gold || "",
			weight: data.weight || null,
			price: data.price,
			date: data.date,
			description: data.description || "",
		}
		const resultPawn = await HtetYu.create(HtetYuCreateData);
		if(!resultPawn.insertId) return res.status(400).json({err: "error in insert into htet_yus"});

		return res.status(200).json({msg: "ထပ်ယူအတွက် စာရင်းသွင်းပြီးပါပြီ"});
	} catch (e) {
		return res.status(500).json({err: e.message})
	}

}
