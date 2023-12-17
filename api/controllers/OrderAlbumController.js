const OrderAlbum = require('../models/OrderAlbum');

exports.create = async (req, res) => {
	const { data } = req.body; //{order_id, album_id}

	try{
		const result = await OrderAlbum.create(data);
		res.status(201).json({insertId: result.insertId});
	} catch (e) {
		res.status(500).json({err: e.message})
	}

}

exports.destroy = async (req, res) => {
	const id = req.params.id;

	try{
		const result = await OrderAlbum.destroy(id);
		if(!result.affectedRows) return res.status(404).json({err: "ဖျက်ပြီးသား ဖြစ်သည်"})
		res.status(200).json({msg: "success"});
	} catch (e) {
		res.status(500).json({err: e.message})
	}

}
