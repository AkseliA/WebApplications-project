const mongoose = require("mongoose");

//TODO: Required fields?
const commentSchema = mongoose.Schema(
	{
		user: { type: Object },
		postId: { type: Object },
		date: { type: Date },
		editDate: { type: Date },
		content: { type: String },
		voteCount: { type: Number, default: 0 },
		voters: { type: Array },
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

module.exports.adjustVote = function (data, callback) {
	const commentId = data.comment._id;
	const voter = { userId: data.userId, voteType: data.voteType };

	//Comment has voters/votes
	if (data.comment.voters.length !== 0) {
		//Loop through voters array
		for (let i = 0; i < data.comment.voters.length; i++) {
			//Voter has vote of same type -> remove vote and correct votecount
			if (
				data.comment.voters[i].userId === data.userId.toString() &&
				data.comment.voters[i].voteType === data.voteType
			) {
				console.log("Has existing vote, same type -> remove vote");
				update = {
					$inc: { voteCount: -data.voteType },
					$unset: { voters: voter },
				};
				break;

				//Voter has vote of different type -> adjust votecount
			} else if (
				data.comment.voters[i].userId === data.userId.toString() &&
				data.comment.voters[i].voteType !== data.voteType
			) {
				console.log("Has existing vote, different types");
				let updatedVoteCount = data.voteType * 2;
				update = {
					$inc: { voteCount: updatedVoteCount },
					voters: voter,
				};
				break;
			}
		}
		//First voter
	} else {
		//Adjust votecount ($inc) and push new voter to voters ($push)
		console.log("Unique voter");
		update = {
			$inc: { voteCount: data.voteType },
			$push: { voters: voter },
		};
	}
	Comment.findByIdAndUpdate(commentId, update, { new: true }, (res, err) => {
		callback(err, res);
	});
};
