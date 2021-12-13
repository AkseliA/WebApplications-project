var express = require("express");
var router = express.Router();
const Comment = require("../../models/comment");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
var passport = require("passport");
const formValidate = require("../../auth/formValidate");
const bcrypt = require("bcryptjs");

router.post("/add", (req, res, next) => {
	let currentDate = new Date(Date.now());
	let newComment = new Comment({
		user: req.body.user,
		postId: req.body.postId,
		date: currentDate,
		content: req.body.content,
	});
	Comment.postNewComment(newComment, (err) => {
		if (err) {
			return res.json({ success: false, msg: "Error posting" });
		} else {
			return res.json({ success: true, msg: "Comment posted" });
		}
	});
});

/* GET request for fetching all comments of a post */
router.get("/fetch/:id", (req, res, next) => {
	let postId = req.params.id;
	Comment.fetchPostComments(postId, (err, comments) => {
		if (err) throw err;
		if (comments) {
			return res.json({ success: true, comments });
		} else {
			return res.json({
				success: false,
				msg: "Could not fetch comments",
			});
		}
	});
});

router.delete("/deleteAll", (req, res, next) => {
	Comment.deletePostComments(req.body.postId, (err, result) => {
		if (err) {
			return res.json({ success: false, msg: err });
		} else if (result) {
			return res.json({ success: true, msg: result.deletedCount });
		}
	});
});

router.delete("/deleteSingle", (req, res, next) => {
	const commentId = req.body._id;
	Comment.deleteSingle(commentId, (err) => {
		if (err) {
			return res.json({ success: false, msg: err });
		} else {
			return res.json({ success: true, msg: "Comment deleted" });
		}
	});
});

router.post("/edit/:id", (req, res, next) => {
	const commentId = req.params.id;
	const editedComment = new Comment({
		_id: commentId,
		content: req.body.content,
	});
});

router.post(
	"/vote",
	passport.authenticate("jwt", { session: false }),
	(req, res, next) => {
		let data = {
			comment: req.body.comment,
			userId: req.user._id,
			voteType: req.body.voteType,
		};
		Comment.adjustVote(data, (result, err) => {
			if (err) {
				return res.json({ success: false, err });
			} else {
				return res.json({ success: true, msg: "Vote successful" });
			}
		});
	}
);
module.exports = router;
