var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");
var cors = require("cors");
require("dotenv").config();

var userApi = require("./routes/api/user");
var postApi = require("./routes/api/post");
var commentApi = require("./routes/api/comment");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

//MongoDB setup
const DB = "mongodb://localhost:27017/snippetapp";
mongoose.connect(DB);
mongoose.Promise = Promise;
mongoose.connection.on("connected", () => {
	console.log(`Connected to the database: ${DB}`);
});
mongoose.connection.on("error", (err) => {
	console.log(`Database error: ${err}`);
});

require("./config/passport")(passport);
app.use(passport.initialize()); /* passport for authorization */
app.use(passport.session());

app.use("/api/user", userApi);
app.use("/api/post", postApi);
app.use("/api/comment", commentApi);

if (process.env.NODE_ENV === "production") {
	console.log("Running in production mode");
	app.use(express.static(path.resolve("..", "client", "build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve("..", "client", "build", "index.html"));
	});
} else if (process.env.NODE_ENV === "development") {
	console.log("Running in development mode");
	var corsOptions = {
		origin: "http://localhost:3000",
		optionsSuccessStatus: 200,
	};
	app.use(cors(corsOptions));
}

module.exports = app;
