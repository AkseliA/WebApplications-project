var express = require("express");
var router = express.Router();
var User = require("../../models/user");
var Avatar = require("../../models/avatar");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const formValidate = require("../../auth/formValidate");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* Register new user POST request */
router.post(
	"/register",
	body("email").escape(),
	body("password").escape(),
	body("username").escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//validate given email before registering
		if (!formValidate.validateEmail(req.body.email)) {
			return res.status(400).json({
				success: false,
				msg: `Invalid email format: ${req.body.email}`,
			});
		}

		//validate given password before registering
		if (!formValidate.validatePassword(req.body.password)) {
			return res.status(400).json({
				success: false,
				msg: `The password must contain at least the following: 8 letters, uppercase letter, lowercase letter, number and a special character.`,
			});
		}

		//Check if the email or username is already registered using mongoose find and ($orr)
		User.findOne(
			{
				$or: [
					{ email: req.body.email },
					{ username: req.body.username },
				],
			},
			(err, user) => {
				if (err) {
					return res.status(404).json({ success: false, err });
				} else if (user) {
					return res.status(403).json({
						success: false,
						msg: "Email or username already in use.",
					});
				} else {
					//Hash the password using bcrypt
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(req.body.password, salt, (err, hash) => {
							if (err) {
								return res
									.status(404)
									.json({ success: false, err });
							} else {
								User.create(
									{
										email: req.body.email,
										password: hash,
										username: req.body.username,
										registerDate: req.body.date,
									},
									(err, result) => {
										if (err) {
											return res
												.status(404)
												.json({ success: false, err });
										} else {
											return res.json({
												success: true,
												msg: "user registered.",
											});
										}
									}
								);
							}
						});
					});
				}
			}
		);
	}
);

/* User login POST request */
router.post(
	"/login",
	body("email").escape(),
	body("password").escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const email = req.body.email;
		const password = req.body.password;

		//Fetch user from the database
		User.fetchUserByEmail(email, (err, user) => {
			if (err) {
				return res.status(404).json({ success: false, err });
				//User not found
			} else if (!user) {
				return res.json({ success: false, msg: "Invalid credentials" });
			}

			//User has been found, compare given password to hashed password
			User.authenticatePassword(
				password,
				user.password,
				(err, matchResult) => {
					if (err) {
						return res.status(404).json({ success: false, err });
					}

					//Create a jwt
					if (matchResult) {
						const jwtPayLoad = {
							email: user.email,
						};
						jwt.sign(
							jwtPayLoad,
							process.env.SECRET,
							{ expiresIn: 3600 }, //expires after 1 hour
							(err, token) => {
								if (err) {
									return res
										.status(404)
										.json({ success: false, err });
								}
								return res.json({
									success: true,
									token,
								});
							}
						);
					} else {
						//Password did not match
						return res.json({
							success: false,
							msg: "Invalid credentials",
						});
					}
				}
			);
		});
	}
);

//GET user information
//This route can be accessed only when logged in
router.get(
	"/profile",
	passport.authenticate("jwt", { session: false }),
	(req, res, next) => {
		let userEmail = req.user.email;

		User.fetchUserByEmail(userEmail, (err, user) => {
			if (err) {
				return res.status(404).json({ success: false, err });
			} else if (user) {
				return res.json({ success: true, user });
			} else {
				return res.json({
					success: false,
					msg: "Could not fetch user",
				});
			}
		});
	}
);

//GET single user information using username
router.get("/profile/:username", (req, res, next) => {
	let username = req.params.username;

	User.fetchUserByUsername(username, (err, user) => {
		if (err) {
			return res.status(404).json({ success: false, err });
		}
		if (user) {
			return res.json({ success: true, user });
		} else {
			return res.json({
				success: false,
				msg: "Could not fetch user",
			});
		}
	});
});

//passport protected POST request used to update current user
//Uses multer for image handling: https://github.com/expressjs/multer
router.post(
	"/edit",
	passport.authenticate("jwt", { session: false }),
	upload.single("avatar"),
	(req, res, next) => {
		//First upload avatar to avatars collection. if avatar exists
		//New avatar _id is linked to users' db "avatar" field
		if (req.file) {
			const newAvatar = new Avatar({
				buffer: req.file.buffer,
				mimetype: req.file.mimetype,
				name: req.file.originalname,
				encoding: req.file.encoding,
			});
			Avatar.addNewAvatar(newAvatar, (err) => {
				if (err) {
					return res.status(404).json({ success: false, err });
				}
			});
			var updatedUser = new User({
				_id: req.user._id,
				bio: req.body.bio,
				avatar: newAvatar._id,
			});
		} else {
			updatedUser = new User({
				_id: req.user._id,
				bio: req.body.bio,
				avatar: null,
			});
		}
		//Then the user is updated
		User.updateUser(updatedUser, (err, result) => {
			if (err) {
				return res.status(404).json({ success: false, err });
			}
			if (result) {
				return res.json({ success: true, result });
			} else {
				return res.json({
					success: false,
					msg: "Failed to edit user",
				});
			}
		});
	}
);

//Get avatar image using the _imageID as req parameter :id
router.get("/avatar/:id", (req, res) => {
	let avatarId = req.params.id;
	Avatar.getAvatar(avatarId, (err, avatar) => {
		if (err) {
			return res.status(404).json({ success: false, err });
		}
		if (!avatar) {
			return res.json({ success: false, msg: "Could not fetch image" });
		} else {
			//Set res headers for sending an image
			res.setHeader("Content-Type", avatar.mimetype);
			res.setHeader("Content-Encoding", "7bit");
			res.setHeader("Content-Disposition", "inline");
			return res.send(avatar.buffer);
		}
	});
});
module.exports = router;
