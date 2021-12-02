//Check if given email is in correct format using regular expressions
// returns true/false accordingly
module.exports.validateEmail = function (email) {
	let result;
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		result = true;
	} else {
		result = false;
	}

	return result;
};

//Check that given password meets the minimun requirements using regular expressions:
//min length 8, uppercase letter, lowercase letter, number and a symbol (~`!@#$%^&*()-_+={}[]|\;:"<>,./?)
module.exports.validatePassword = function (password) {
	let result;
	let regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`'!@#$%^&*()-_+={}[\]|;:"<>,.\/?])[A-Za-z\d~`'!@#$%^&*()-_+={}[\]|;:"<>,.\/?]{8,}$/;
	if (regex.test(password)) {
		result = true;
	} else {
		result = false;
	}
	return result;
};
