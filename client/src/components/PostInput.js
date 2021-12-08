import React, { useState } from "react";
import { Button, TextField, Box, Typography, CssBaseline } from "@mui/material";
import authUtils from "../auth/authUtils";

const PostInput = ({ user }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	// POST request to server
	const submitPost = (e) => {
		e.preventDefault();

		let jwt = authUtils.getCurrentJWT();

		const newPost = {
			username: user.username,
			title: title,
			content: content,
			date: new Date(Date.now()),
		};
		fetch("/api/post/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify(newPost),
			mode: "cors",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
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
