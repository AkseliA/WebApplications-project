module.exports.setLocalStorage = function (token) {
	localStorage.setItem("JWT", token);
};
module.exports.getLocalStorage = function (token) {
	return localStorage.getItem("JWT", token);
};

module.exports.logOut = function () {
	localStorage.clear();
};

//Function checks if jwt token exists
module.exports.isLoggedIn = function () {
	let token = localStorage.getItem("JWT");
	if (token) {
		return true;
	} else {
		return false;
	}
};
