var express = require("express");
var router = express.Router();
var User = require("../../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const formValidate = require("../../auth/formValidate");
const bcrypt = require("bcryptjs");
const passport = require("passport");

/* Register new user POST request */
//TODO USERNAME validate
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
				msg: `Password is not strong enough`,
			});
		}

		//Check if the email is already registered
		User.findOne({ email: req.body.email }, (err, user) => {
			if (user) {
				return res.status(403).json({
					success: false,
					msg: "Email already in use",
				});
			} else {
				//Hash the password using bcrypt
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(req.body.password, salt, (err, hash) => {
						if (err) throw err;
						User.create(
							{
								email: req.body.email,
								password: hash,
								username: req.body.username,
								registerDate: req.body.date,
							},
							(err, result) => {
								if (err) throw err;

								return res.json({
									success: true,
									msg: "user registered",
								});
							}
						);
					});
				});
			}
		});
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
			if (err) throw err;
			//user not found
			if (!user) {
				return res.json({ success: false, msg: "Invalid credentials" });
			}

			//User has been found, compare given password to hashed password
			User.authenticatePassword(
				password,
				user.password,
				(err, matchResult) => {
					if (err) throw err;

					//Create a jwt
					if (matchResult) {
						const jwtPayLoad = {
							email: user.email,
						};
						jwt.sign(
							jwtPayLoad,
							process.env.SECRET,
							{ expiresIn: 600 },
							(err, token) => {
								res.json({
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
			if (err) throw err;
			if (user) {
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
module.exports = router;
