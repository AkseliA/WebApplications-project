const mongoose = require("mongoose");

//TODO: Required fields?
const commentSchema = mongoose.Schema(
	{
		user: { type: Object },
		date: { type: Date },
		editDate: { type: Date },
		content: { type: String },
	},
	{ collection: "comments" }
);

const Comment = (module.exports = mongoose.model("Comment", commentSchema));

//Fetch all comments

//Create a comment

//Edit comment
