import React, { useState } from "react";
import {
	Button,
	TextField,
	Box,
	Typography,
	CssBaseline,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import postUtils from "../auth/postUtils";

//TODO: Titlen pituus limit
const PostInput = ({ user }) => {
	const [checked, setChecked] = useState(false);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [codeSnippet, setCodeSnippet] = useState("");

	// POST request to server
	const submitPost = (e) => {
		e.preventDefault();
		const newPost = {
			user: user,
			title: title,
			content: content,
			codeSnippet: codeSnippet,
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
						rows={0}
						maxRows={10}
						type="text"
						id="content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={checked}
								onChange={(e) => {
									setChecked(e.target.checked);
									console.log(e.target.checked);
								}}
							/>
						}
						sx={{ m: 0, p: 0 }}
						label="Add code?"
					/>
					{checked && (
						<TextField
							name="codeInput"
							label="Code"
							fullWidth
							multiline
							rows={0}
							maxRows={25}
							type="text"
							id="codeInput"
							value={codeSnippet}
							onChange={(e) => setCodeSnippet(e.target.value)}
						/>
					)}
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
