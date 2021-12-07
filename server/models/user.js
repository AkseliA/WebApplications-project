const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersSchema = mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	username: { type: String },
	bio: { type: String, default: "No bio" },
	registerDate: { type: Date },
	avatar: { type: Object },
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

//Used to update profile and to add bio/picture to profile
//Callback returns the updated document
module.exports.updateUser = function (updatedUser, callback) {
	let userId = updatedUser._id;
	let update = {
		bio: updatedUser.bio,
		avatar: updatedUser.avatar,
	};
	console.log(userId);

	User.findByIdAndUpdate(userId, update, { new: true }, (err, result) => {
		if (err) throw err;
		callback(null, result);
	});
};
