const mongoose = require("mongoose");

//TODO: Required fields?
const postSchema = mongoose.Schema(
	{
		user: { type: Object },
		date: { type: Date },
		editDate: { type: Date },
		content: { type: String },
	},
	{ collection: "posts" }
);

const Post = (module.exports = mongoose.model("Post", postSchema));

//Fetch all posts

//Create a post

//Edit post

//Fetch post using search parameter
