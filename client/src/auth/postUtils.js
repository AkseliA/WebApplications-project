//Fetch all posts from "/api/post/fetch"
module.exports.fetchPosts = function (callback) {
	fetch("/api/post/fetch")
		.then((response) => response.json())
		.then((data) => {
			callback(data);
		});
};
//Fetch single post from "/api/post/fetch/:id"
//Returns a callback containing (err, post)
module.exports.fetchPost = function (postId, callback) {
	fetch("/api/post/fetch/" + postId)
		.then((response) => response.json())
		.then((data) => {
			callback(data);
		});
};

//Fetch all post related comments "api/comment/fetch"
module.exports.fetchComments = function (postId, callback) {
	fetch("/api/comment/fetch/" + postId)
		.then((response) => response.json())
		.then((data) => {
			callback(data);
		});
};

module.exports.addComment = function (data, callback) {
	let newComment = {
		user: data.user,
		postId: data.postId,
		content: data.content,
	};

	fetch("/api/comment/add", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newComment),
		mode: "cors",
	})
		.then((response) => response.json())
		.then((data) => {
			callback(data);
		});
};

module.exports.addPost = function (data, callback) {
	let jwt = localStorage.getItem("JWT");
	if (jwt) {
		let newPost = {
			user: data.user,
			title: data.title,
			content: data.content,
			date: new Date(Date.now()),
		};
		fetch("/api/post/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify(newPost),
			mode: "cors",
		})
			.then((response) => response.json())
			.then((data) => {
				callback(data);
			});
	}
};

//TODO check that user trying to delete has created the comment
module.exports.deleteComment = function (commentId, callback) {
	fetch("/api/comment/deleteSingle", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ _id: commentId }),
		mode: "cors",
	})
		.then((response) => response.json())
		.then((data) => {
			callback(data);
		});
};

//TODO check that user trying to delete has created the post
//This function deletes the post and all of its comments.
//Both deletes are handled server side
module.exports.deletePost = function (postId, callback) {
	fetch("/api/post/del", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ _id: postId }),
		mode: "cors",
	})
		.then((response) => response.json())
		.then((data) => {
			callback(data);
		});
};
