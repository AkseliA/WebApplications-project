module.exports.parseMongoDate = function (date) {
	return new Date(date).toLocaleString();
};
