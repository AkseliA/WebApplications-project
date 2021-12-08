const mongoose = require("mongoose");

//TODO: Required fields?
const commentSchema = mongoose.Schema(
	{
		user: { type: Object },
		postId: { type: Object },
		date: { type: Date },
		editDate: { type: Date },
		content: { type: String },
	},
	{ collection: "comments" }
);

const Comment = (module.exports = mongoose.model("Comment", commentSchema));

//Fetch all comments of a post
module.exports.fetchPostComments = function (postId, callback) {
	const query = { postId: postId };
	Comment.find(query, callback);
};

//Create a comment
module.exports.postNewComment = function (newComment, callback) {
	newComment.save(callback);
};

//Edit comment
module.exports.editComment = function (editedComment, callback) {
	let commentId = editedComment._id;
	let update = {
		editDate: editedComment.editDate,
		content: editedComment.content,
	};

	Comment.findByIdAndUpdate(commentId, update, (err, result) => {
		if (err) throw err;
		callback(null, result);
	});
};

//Delete single comment (based on comment _id)
module.exports.deleteSingle = function (commentId, callback) {
	Comment.findByIdAndDelete(commentId, callback);
};

//Delete all comments of a post (based on postId)
module.exports.deletePostComments = function (postId, callback) {
	let option = { postid: postId };
	Comment.deleteMany(option, callback);
};
