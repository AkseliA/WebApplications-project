const mongoose = require("mongoose");

const avatarSchema = mongoose.Schema(
	{
		buffer: { type: Buffer },
		mimetype: { type: String },
		name: { type: String },
		encoding: { type: String },
	},
	{ collection: "avatars" }
);

const Avatar = (module.exports = mongoose.model("Avatar", avatarSchema));

//Store a new image into database
module.exports.addNewAvatar = function (newImage, callback) {
	newImage.save(callback);
};

//Fetch an image based on its _id
module.exports.getAvatar = function (imageId, callback) {
	const query = { _id: imageId };
	Avatar.findOne(query, callback);
};
