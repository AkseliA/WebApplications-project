const mongoose = require("mongoose");
const router = require("../routes/api/post");

//TODO: Required fields?
const postSchema = mongoose.Schema(
	{
		user: { type: Object },
		date: { type: Date },
		editDate: { type: Date },
		title: { type: String },
		content: { type: String },
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

//Edit post
module.exports.editPost = function (post, callback) {
	let postId = post._id;
	let update = { editDate: post.editDate, content: post.content };

	Post.findByIdAndUpdate(postId, update, (err, result) => {
		if (err) throw err;
		callback(null, result);
	});
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
			}
		}

		//Post has no voters (or votes)
	} else {
		//Adjust votecount and add user to voters
		console.log("Unique vote");
		update = {
			$inc: { voteCount: data.voteType },
			$push: { voters: voter },
		};
	}

	Post.findByIdAndUpdate(postId, update, { new: true }, (res, err) => {
		callback(err, res);
	});
};
