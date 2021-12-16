module.exports.validatePostInput = function (post) {
	//Check if title is empty
	if (post.title.trim().length === 0) {
		return { success: false, msg: "Title must be entered" };
	}
	//Check if content is empty
	else if (post.content.trim().length === 0) {
		return { success: false, msg: "Content must be entered" };
	}
	//Else validation passed
	else {
		return { success: true };
	}
};

module.exports.validateCommentInput = function (comment) {
	//Check if content is empty
	if (comment.content.trim().length === 0) {
		return { success: false, msg: "Comment must not be empty" };
	} else {
		return { success: true };
	}
};
