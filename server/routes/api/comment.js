var express = require("express");
var router = express.Router();
var User = require("../../models/comment");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const formValidate = require("../../auth/formValidate");
const bcrypt = require("bcryptjs");

router.post("/addComment", (req, res, next) => {});

module.exports = router;
