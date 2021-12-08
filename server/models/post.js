const mongoose = require("mongoose");
const router = require("../routes/api/post");

//TODO: Required fields?
const postSchema = mongoose.Schema(
	{
		userId: { type: Object },
		username: { type: String },
		date: { type: Date },
		editDate: { type: Date },
		title: { type: String },
		content: { type: String },
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

//TODO: Fetch post using search parameter
