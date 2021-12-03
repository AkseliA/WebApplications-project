var express = require("express");
var router = express.Router();
var Comment = require("../../models/comment");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const formValidate = require("../../auth/formValidate");
const bcrypt = require("bcryptjs");

router.post("/add", (req, res, next) => {
	let currentDate = new Date(Date.now());
	let newComment = new Comment({
		userId: req.body.userId,
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
router.get("/fetch", (req, res, next) => {
	let postId = req.body.postId;
	Comment.fetchPostComments(postId, (err, comments) => {
		if (err) throw err;
		if (comments) {
			return res.json({ success: false, comments });
		} else {
			return res.json({
				success: false,
				msg: "Could not fetch comments",
			});
		}
	});
});

router.delete("/deleteAll", (req, res, next) => {
	Comment.deletePostComments(postId, (err, result) => {
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

module.exports = router;
