const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

module.exports = function (passport) {
	let options = {};
	options.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
	options.secretOrKey = process.env.SECRET;
	passport.use(
		new jwtStrategy(options, (jwt_payload, done) => {
			User.fetchUserByEmail(jwt_payload.email, (err, user) => {
				if (err) {
					return done(err, false);
				}
				if (user) {
					return done(null, user);
				} else {
					return null, false;
				}
			});
		})
	);
};
