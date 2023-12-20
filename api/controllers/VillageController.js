const Village = require('../models/Village');

exports.index = async (req, res) => {
	const villages = await Village.all();
	res.json(villages);
}

exports.create = async (req, res) => {
	const { data } = req.body;
	if(!data.name) return res.status(400).json({err: "need village name"})

	try{
		const result = await Village.create(data.name);
		if(!result.insertId) return res.status(500).json({err: "insert error"})
		return res.status(201).json({msg: "village create success.", id: result.insertId});
	}catch (e) {
		return res.status(500).json({err: e.message})
	}
}

exports.update = async (req, res) => {
	const { data } = req.body;
	const id = req.params.id;

	if(!data.name) return res.status(400).json({err: 'need village name'});

	try{
		const result = await Village.update(id, data.name);
		if(!result.affectedRows) return res.status(500).json({err: "update error"});

		return res.status(200).json({msg: "update successful."});
	}catch (e) {
		return res.status(500).json({err: e.message});
	}

}