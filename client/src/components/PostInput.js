import React, { useState } from "react";
import { Button, TextField, Box, Typography, CssBaseline } from "@mui/material";
import authUtils from "../auth/authUtils";

const PostInput = ({ user }) => {
	const [content, setContent] = useState("");

	// POST request to server
	const submitPost = (e) => {
		e.preventDefault();
		console.log(user);

		let jwt = authUtils.getCurrentJWT();

		const newPost = {
			username: user.username,
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
				console.log(data);
			});
		setContent("");
	};
	return (
		<>
			<CssBaseline />

			<Box
				sx={{
					marginTop: 8,
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
						name="content"
						label="content"
						fullWidth
						multiline
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
