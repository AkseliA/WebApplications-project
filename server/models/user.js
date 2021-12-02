const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersSchema = mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	name: { type: String },
	registerDate: { type: Date },
	avatar: {
		buffer: { type: Buffer },
		mimetype: { type: String },
		name: { type: String },
		encoding: { type: String },
	},
});

const User = (module.exports = mongoose.model("users", usersSchema));

module.exports.fetchUserByEmail = function (email, callback) {
	const query = { email: email };
	User.findOne(query, callback);
};

//compare given password to hashed password
module.exports.authenticatePassword = function (candidatePassword, hash, cb) {
	bcrypt.compare(candidatePassword, hash, (err, matchResult) => {
		if (err) throw err;
		cb(null, matchResult);
	});
};
