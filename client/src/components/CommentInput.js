import React, { useState } from "react";
import { Button, TextField, Box, CssBaseline } from "@mui/material";
import AlertSnackbar from "./AlertSnackbar";
import postUtils from "../auth/postUtils";
import { validateCommentInput } from "../auth/validateInput";

const CommentInput = ({ user, postId }) => {
	const [content, setContent] = useState("");
	const [snackbarProps, setSnackbarProps] = useState({ isOpen: false });

	const onSnackbarClose = () => {
		setSnackbarProps({ isOpen: false });
	};

	// POST request to server
	const submitComment = (e) => {
		e.preventDefault();
		let newComment = {
			user: user,
			postId: postId,
			content: content,
		};
		//Validate comment input before posting
		let result = validateCommentInput(newComment);
		if (result.success) {
			postUtils.addComment(newComment, (res) => {
				if (res.success) {
					console.log(res);
					window.location.reload();
				}
			});
		}
		//Else display a snackbar alert
		else {
			setSnackbarProps({
				isOpen: true,
				duration: 3000,
				alertType: "error",
				msg: result.msg,
			});
		}
		setContent("");
	};
	return (
		<>
			<CssBaseline />
			{snackbarProps.isOpen && (
				<AlertSnackbar
					duration={snackbarProps.duration}
					alertType={snackbarProps.alertType}
					msg={snackbarProps.msg}
					isOpen={snackbarProps.isOpen}
					onClose={onSnackbarClose}
				/>
			)}
			<Box
				sx={{
					mb: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					border: "1px solid #c0bcb8",
					backgroundColor: "background.paper",
				}}
			>
				<Box
					component="form"
					sx={{ mt: 3, width: "100%", px: 2 }}
					onSubmit={submitComment}
				>
					<TextField
						name="content"
						label="Add a comment"
						fullWidth
						multiline
						required
						rows={2}
						type="text"
						id="content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Submit
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default CommentInput;
