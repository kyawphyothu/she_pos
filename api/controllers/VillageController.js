const Village = require('../models/Village');

exports.index = async (req, res) => {
	const villages = await Village.all();
	res.json(villages);
}
