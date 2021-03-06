const mongoose = require("mongoose");
const router = require("../routes/api/post");

const postSchema = mongoose.Schema(
	{
		user: { type: Object, required: true },
		date: { type: Date },
		editDate: { type: Date },
		title: { type: String, required: true },
		content: { type: String, required: true },
		codeSnippet: { type: String },
		voteCount: { type: Number, default: 0 },
		voters: { type: Array },
	},
	{ collection: "posts" }
);

const Post = (module.exports = mongoose.model("Post", postSchema));

//Fetch all posts
module.exports.fetchAllPosts = function (callback) {
	Post.find({}, callback);
};

//Fetch single post based on its id
module.exports.fetchSinglePost = function (postId, callback) {
	Post.findById(postId, callback);
};

//Create a post
module.exports.postNewPost = function (newPost, callback) {
	newPost.save(callback);
};

//Remove post
module.exports.deletePost = function (postId, callback) {
	Post.findByIdAndDelete(postId, callback);
};

module.exports.adjustVote = function (data, callback) {
	const postId = data.post._id;
	const voter = { userId: data.userId, voteType: data.voteType };
	let update;

	//Post has voters(and votes)
	if (data.post.voters.length !== 0) {
		//Loop through voters and do validation
		for (let i = 0; i < data.post.voters.length; i++) {
			//if previous votetype == current -> remove voter and adjust counter (db)
			if (
				data.post.voters[i].userId === data.userId.toString() &&
				data.post.voters[i].voteType === data.voteType
			) {
				console.log("Has existing vote, same type -> remove vote");
				update = {
					$inc: { voteCount: -data.voteType },
					$unset: { voters: voter },
				};
				break;
			}

			//if previous votetype != current -> change votetype and adjust count (-1 <-> 1)
			else if (
				data.post.voters[i].userId === data.userId.toString() &&
				data.post.voters[i].voteType !== data.voteType
			) {
				console.log("Has existing vote, different types");
				let updatedVoteCount = data.voteType * 2;
				update = {
					$inc: { voteCount: updatedVoteCount },
					voters: voter,
				};
				break;
				//Unique voter votes a post that has voters already
			} else {
				console.log("Unique voter");
				update = {
					$inc: { voteCount: data.voteType },
					$push: { voters: voter },
				};
			}
		}

		//Post has no voters (or votes)
	} else {
		//Adjust votecount and add user to voters
		console.log("first vote");
		update = {
			$inc: { voteCount: data.voteType },
			$push: { voters: voter },
		};
	}
	Post.findByIdAndUpdate(postId, update, { new: true }, (res, err) => {
		callback(err, res);
	});
};

module.exports.editPost = function (updatedPost, callback) {
	let postId = updatedPost;
	let update = {
		title: updatedPost.title,
		content: updatedPost.content,
		codeSnippet: updatedPost.codeSnippet,
		editDate: updatedPost.editDate,
	};
	Post.findByIdAndUpdate(postId, update, { new: true }, (err, result) => {
		callback(err, result);
	});
};
