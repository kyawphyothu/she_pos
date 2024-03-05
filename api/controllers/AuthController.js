const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");

const secret = process.env.SECRET_KEY; //for jwt

exports.signup = async (req, res) => {
	return res.status(400).json({err: "you can't sign up."});

	const { name, username, password } = req.body;

	if (!name || !username || !password) {
		return res.status(400).json({
			msg: "name, username and password fields are required",
		});
	}

	let userExist = await User.find(username);
	if (userExist) {
		return res.status(409).json({ err: "username already taken" });
	}

	const hash = await bcrypt.hash(password, 10);

	try {
		const data = {
			name,
			username,
			password: hash,
		}
		let result = await User.create(data);

		let user = {
			id: result.insertId,
			name,
			username,
		};
		let tokenUser = { id: result.insertId, username };
		let token = jwt.sign(tokenUser, secret);

		return res.status(201).json({ token, user, msg: "user successfully created" });
	} catch (e) {
		return res.status(500).json({ err: e.message });
	}
}

exports.login = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(403).json({
			err: "both username and password are required",
		});
	}

	let user = await User.find(username);
	if (!user) return res.status(403).json({ err: "user not found" });

	const match = await bcrypt.compare(password, user.password);

	if (match) {
		delete user.password;
		let tokenUser = { id: user.id, username: user.username };
		const token = jwt.sign(tokenUser, secret);
		return res.status(201).json({ token, user });
	}

	return res.status(403).json({ err: "incorrect password" });
}

exports.getLoginUser = async (req, res) => {
	const user = res.locals.user;

	let result = await User.findById(user.id);
	if (result) {
		delete result.password;
		return res.status(200).json(result);
	}

	return res.status(401).json({ msg: "user not found" });
};