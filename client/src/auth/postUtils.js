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
	let jwt = localStorage.getItem("JWT");
	let newComment = {
		user: data.user,
		postId: data.postId,
		content: data.content,
	};

	fetch("/api/comment/add", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
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
			codeSnippet: data.codeSnippet,
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
	let jwt = localStorage.getItem("JWT");
	fetch("/api/comment/deleteSingle", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
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
	let jwt = localStorage.getItem("JWT");
	fetch("/api/post/del", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify({ _id: postId }),
		mode: "cors",
	})
		.then((response) => response.json())
		.then((data) => {
			callback(data);
		});
};

module.exports.handlePostVote = function (vote, callback) {
	let jwt = localStorage.getItem("JWT");
	fetch("/api/post/vote", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify(vote),
		mode: "cors",
	})
		.then((response) => response.json())
		.then((data) => {
			callback(data);
		});
};

module.exports.handleCommentVote = function (vote, callback) {
	let jwt = localStorage.getItem("JWT");
	fetch("/api/comment/vote", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify(vote),
		mode: "cors",
	})
		.then((response) => response.json())
		.then((data) => {
			callback(data);
		});
};

//This function fetches all posts and filters out any posts containing searchTerm
//in title, content or codeSnippet field.
module.exports.searchPosts = function (searchTerm, callback) {
	fetch("/api/post/fetch")
		.then((response) => response.json())
		.then((data) => {
			let searchResult = [];
			if (data.success) {
				//filter out messages with matches
				data.posts.forEach((post) => {
					if (
						post.title.toLowerCase().includes(searchTerm) ||
						post.content.toLowerCase().includes(searchTerm) ||
						post.codeSnippet.toLowerCase().includes(searchTerm)
					) {
						searchResult.push(post);
					}
				});
			}
			callback(searchResult);
		});
};

module.exports.editPost = function (editedPost, callback) {
	let jwt = localStorage.getItem("JWT");
	fetch("/api/post/edit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify(editedPost),
		mode: "cors",
	})
		.then((response) => response.json())
		.then((data) => {
			callback(data);
		});
};

module.exports.editComment = function (editedComment, callback) {
	let jwt = localStorage.getItem("JWT");
	fetch("/api/comment/edit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify(editedComment),
		mode: "cors",
	})
		.then((response) => response.json())
		.then((data) => {
			callback(data);
		});
};
