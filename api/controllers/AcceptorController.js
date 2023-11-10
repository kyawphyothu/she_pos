const Acceptor = require('../models/Acceptor');

exports.index = async (req, res) => {
	const Acceptors = await Acceptor.all();
	res.json(Acceptors);
}
