module.exports.setLocalStorage = function (token) {
	localStorage.setItem("JWT", token);
};
//Returns currently logged in users' JWT
module.exports.getCurrentJWT = function () {
	return localStorage.getItem("JWT");
};
//Returns currently logged in user object
module.exports.getCurrentUser = function () {
	let user = localStorage.getItem("user");
	if (user) {
		return JSON.parse(user);
	} else {
		return null;
	}
};

//Fetch logged in user from server and store in localstorage
module.exports.loadUser = function (callback) {
	let jwt = localStorage.getItem("JWT");
	//if user is not already in localstorage
	if (!localStorage.getItem("user")) {
		fetch("/api/user/profile", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			mode: "cors",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success === true) {
					localStorage.setItem("user", JSON.stringify(data.user));
				}
				callback();
			});
	}
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

module.exports.getUserByUsername = function (username, callback) {
	fetch("/api/user/profile/" + username)
		.then((response) => response.json())
		.then((data) => {
			callback(data);
		});
};
