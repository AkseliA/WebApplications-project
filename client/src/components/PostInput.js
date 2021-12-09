import React, { useState } from "react";
import { Button, TextField, Box, Typography, CssBaseline } from "@mui/material";
import postUtils from "../auth/postUtils";

//TODO: Titlen pituus limit
const PostInput = ({ user }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	// POST request to server
	const submitPost = (e) => {
		e.preventDefault();

		const newPost = {
			user: user,
			title: title,
			content: content,
			date: new Date(Date.now()),
		};
		postUtils.addPost(newPost, (res) => {
			if (res.success) {
				window.location.href = "/";
			}
		});

		setTitle("");
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
				<Typography variant="h6" sx={{ mt: 3 }}>
					New post
				</Typography>
				<Box
					component="form"
					sx={{ mt: 3, width: "100%", px: 2 }}
					onSubmit={submitPost}
				>
					<TextField
						name="title"
						label="Title"
						fullWidth
						required
						type="text"
						id="content"
						value={title}
						sx={{ mb: 2 }}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<TextField
						name="content"
						label="Content"
						fullWidth
						multiline
						required
						rows={5}
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

export default PostInput;
