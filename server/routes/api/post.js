var express = require("express");
var router = express.Router();
var Post = require("../../models/post");
var Comment = require("../../models/comment");
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
			userId: req.user._id,
			username: req.body.username,
			date: req.body.date,
			content: req.body.content,
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
		if (err) throw err;

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
		if (err) throw err;

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

module.exports = router;
