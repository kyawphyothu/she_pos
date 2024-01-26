const Pawn = require('../models/Pawn');
const Order = require('../models/Order');
const OrderAlbum = require('../models/OrderAlbum');
const Album = require('../models/Album');
const Village = require('../models/Village');

exports.show = async (req, res) => {
	const id = req.params.id;

	try{
		const resultPawn = await Pawn.getPawnById(id);
		if(!resultPawn) return res.status(400).json({err: "can't find"});

		const resultOrder = await Order.getOrderById(resultPawn.order_id);

		const result = {...resultOrder[0], price: resultPawn.price, description: resultPawn.description};
		return res.status(200).json(result);
	}catch(e){
		return res.status(500).json({err: e.message});
	}
}

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


		if(data.create_album || data.album_id){
			if (data.create_album) {
				// create album
				const village = await Village.search(data.village_id);
				const resultAlbum = await Album.create(`${data.name} (${village.name})`);
				if(!resultAlbum.insertId) return res.status(500).json({err: "error in insert into Albums"});

				// insert into order_albums
				const OrderAlbumCreateData = {
					order_id: insertOrderId,
					album_id: resultAlbum.insertId
				};
				const resultOrderAlbum = await OrderAlbum.create(OrderAlbumCreateData);
				if(!resultOrderAlbum.insertId) return res.status(400).json({err: "error in insert into order albums"});
			} else {
				// insert into order_albums
				const OrderAlbumCreateData = {
					order_id: insertOrderId,
					album_id: data.album_id
				};
				const resultOrderAlbum = await OrderAlbum.create(OrderAlbumCreateData);
				if(!resultOrderAlbum.insertId) return res.status(400).json({err: "error in insert into order albums"});
			}
		}

		return res.status(200).json({msg: "ထည့်သွင်းပြီးပါပြီ", id: insertOrderId});
	} catch (e) {
		return res.status(500).json({err: e.message})
	}

}

exports.update = async (req, res) => {
	const order_id = req.params.id;
	const { data } = req.body; // {name, phone=null, villlage_id, gold, weight, price, acceptor_id, date, redeem=0, description}

	try {
		// update into orders
		const OrderUpdateData = {
			name: data.name,
			phone: data.phone||"",
			village_id: data.village_id,
			gold: data.gold,
			weight: data.weight,
			acceptor_id: data.acceptor_id,
			date: data.date,
			redeem: data.redeem
		}
		const resultOrder = await Order.update(OrderUpdateData, order_id);
		if(!resultOrder.affectedRows) return res.status(400).json({err: "error in update order"});

		// update into pawns
		const PawnUpdateData = {
			name: data.name,
			price: data.price,
			gold: data.gold,
			weight: data.weight,
			date: data.date,
			description: data.description || "",
		}
		const resultPawn = await Pawn.update(order_id, PawnUpdateData);
		if(!resultPawn.affectedRows) return res.status(400).json({err: "error in update into pawns"});

		return res.status(200).json({msg: "ပြင်ဆင်ပြီးပါပြီ", id: order_id});
	} catch (e) {
		return res.status(500).json({err: e.message})
	}
}