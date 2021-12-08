import React, { useState } from "react";
import { Button, TextField, Box, Typography, CssBaseline } from "@mui/material";
import postUtils from "../auth/postUtils";

const CommentInput = ({ user, postId }) => {
	const [content, setContent] = useState("");

	// POST request to server
	const submitComment = (e) => {
		e.preventDefault();
		let newComment = {
			user: user,
			postId: postId,
			content: content,
		};
		postUtils.addComment(newComment, (res) => {
			if (res.success) {
				console.log(res);
				window.location.reload();
			}
		});

		setContent("");
	};
	return (
		<>
			<CssBaseline />

			<Box
				sx={{
					mb: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					border: "1px solid gray",
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
