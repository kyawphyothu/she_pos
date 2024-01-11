const Album = require('../models/Album');

exports.index = async (req, res) => {
	const Albums = await Album.all();
	res.json(Albums);
}

exports.show = async (req, res) => {
	const id = req.params.id; //album id

	try{
		const orders = await Album.getOrdersByAlbumId(id);
		const album = await Album.getAlbumById(id);
		res.status(200).json({ album, orders });
	}catch(e){
		res.status(500).json({err: e.message});
	}
}

exports.latestorder = async (req, res) => {
	const id = req.params.id;

	try{
		const order = await Album.getLatestOrderByAlbumId(id);
		res.status(200).json({ order })
	}catch (e){
		res.status(500).json({ err: e.message })
	}
}

exports.create = async (req, res) => {
	const { data } = req.body;

	try{
		const result = await Album.create(data.name);
		res.status(201).json({insertId: result.insertId});
	} catch (e) {
		res.status(500).json({err: e.message})
	}

}

exports.update = async (req, res) => {
	const { data } = req.body;
	const id = req.params.id;

	try{
		const result = await Album.update(id, data.name);
		if(!result.affectedRows) return res.status(404).json({err: "update error"})
		res.send(result)
	} catch (e) {
		res.status(500).json({err: e.message})
	}
}

exports.destroy = async (req, res) => {
	const id = req.params.id;

	try{
		const result = await Album.delete(id);
		if(!result.affectedRows) return res.status(500).json({err: "delete error"})
		res.send({msg: "success"});
	}catch(e){
		res.status(500).json(e.message);
	}
}
