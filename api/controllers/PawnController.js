const Pawn = require('../models/Pawn');
const Order = require('../models/Order');

exports.create = async (req, res) => {
	const { data } = req.body; // {name, phone=null, villlage_id, gold, weight, price, acceptor_id, date, redeem=0, description}

	// validation
	if(!data.name || !data.village_id || !data.gold || !data.weight || !data.price || !data.acceptor_id || !data.date || data.redeem===undefined){
		let errObject = {};

		data.name ? "": errObject.name="err";
		data.village_id ? "": errObject.village_id="err";
		data.gold ? "": errObject.gold="err";
		data.weight ? "": errObject.weight="err";
		data.price ? "": errObject.price="err";
		data.acceptor_id ? "": errObject.acceptor_id="err";
		data.date ? "": errObject.date="err";
		data.redeem!==undefined ? "": errObject.redeem="err";

		return res.status(406).json({err: "validation", validation: errObject})
	}

	try {
		// insert into orders
		const OrderCreateData = {
			name: data.name,
			phone: data.phone||"",
			village_id: data.village_id,
			gold: data.gold,
			weight: data.weight,
			acceptor_id: data.acceptor_id,
			date: data.date,
			redeem: data.redeem
		}
		const resultOrder = await Order.create(OrderCreateData);
		const insertOrderId = resultOrder.insertId;

		// insert into pawns
		const PawnCreateData = {
			order_id: insertOrderId,
			name: data.name,
			price: data.price,
			gold: data.gold,
			weight: data.weight,
			date: data.date,
			description: data.description || "",
		}
		const resultPawn = await Pawn.create(PawnCreateData);
		if(!resultPawn.insertId) return res.status(400).json({err: "error in insert into pawns"});

		return res.status(200).json({msg: "ထည့်သွင်းပြီးပါပြီ"});
	} catch (e) {
		return res.status(500).json({err: e.message})
	}

}
