var express = require("express");
var router = express.Router();
const Post = require("../../models/post");
const Comment = require("../../models/comment");
var passport = require("passport");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const formValidate = require("../../auth/formValidate");
const bcrypt = require("bcryptjs");

//TODO: userid from after passport auth
router.post(
	"/add",
	passport.authenticate("jwt", { session: false }),
	(req, res, next) => {
		let newPost = new Post({
			user: req.body.user,
			date: req.body.date,
			title: req.body.title,
			content: req.body.content,
			codeSnippet: req.body.codeSnippet,
		});

		Post.postNewPost(newPost, (err) => {
			if (err) {
				return res.json({ success: false, msg: "Error posting" });
			} else {
				return res.json({ success: true, msg: "Post posted" });
			}
		});
	}
);

// GET request for fetching all posts
router.get("/fetch", (req, res, next) => {
	Post.fetchAllPosts((err, posts) => {
		if (err) {
			return res.json({ success: false, err });
		}

		if (posts) {
			return res.json({ success: true, posts });
		} else {
			return res.json({ success: false, msg: "Could not fetch posts" });
		}
	});
});

// GET request for fetching a single post
router.get("/fetch/:postId", (req, res, next) => {
	let postId = req.params.postId;
	Post.fetchSinglePost(postId, (err, post) => {
		if (err) {
			return res.json({ success: false, err });
		}

		if (post) {
			return res.json({ success: true, post });
		} else {
			return res.json({ success: false, msg: "Could not fetch post" });
		}
	});
});

//TODO Suojattu, KESKEN
router.post("/edit", (req, res, next) => {
	let currentDate = new Date(Date.now());

	let editedPost = new Post({
		editDate: currentDate,
		content: req.body.content,
		codeSnippet: req.body.codeSnippet,
	});

	Post.editPost(editedPost, (err, result) => {
		if (result) {
			return res.json({ success: true, msg: "Post edited" });
		} else {
			return res.json({ success: false, msg: "Failed to edit post" });
		}
	});
});

// DELETE post based on its mongodb _id (Also removes related comments)
router.delete("/del", (req, res) => {
	const postId = req.body._id;
	Post.deletePost(postId, (err) => {
		if (err) {
			return res.json({ success: false, msg: err });
		} else {
			//Delete comments
			Comment.deletePostComments(postId, (err, result) => {
				if (err) {
					return res.json({ success: false, msg: err });
				} else if (result) {
					return res.json({
						success: true,
						msg: "Deleted post and its comments",
					});
				}
			});
		}
	});
});

router.post(
	"/vote",
	passport.authenticate("jwt", { session: false }),
	(req, res, next) => {
		let data = {
			post: req.body.post,
			userId: req.user._id,
			voteType: req.body.voteType,
		};
		Post.adjustVote(data, (result, err) => {
			if (err) {
				return res.json({ success: false, err });
			} else {
				return res.json({ success: true, msg: "Vote successful" });
			}
		});
	}
);

module.exports = router;
