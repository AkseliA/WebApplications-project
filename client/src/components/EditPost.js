import React, { useState, useEffect } from "react";
import { Button, TextField, Box, CssBaseline } from "@mui/material";
import postUtils from "../auth/postUtils";

const EditPost = ({ originalPost }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [codeSnippet, setCodeSnippet] = useState("");

	useEffect(() => {
		setTitle(originalPost.title);
		setContent(originalPost.content);
		setCodeSnippet(originalPost.codeSnippet);
	}, [originalPost]);

	//Insert indent (4 spaces) when tab is pressed inside code field
	const handleTab = (e) => {
		if (e.key === "Tab") {
			let newSnippet = codeSnippet + "    ";
			e.preventDefault();
			setCodeSnippet(newSnippet);
		}
	};

	// POST request to server
	const submitEditPost = (e) => {
		e.preventDefault();
		const editedPost = {
			_id: originalPost._id,
			title: title,
			content: content,
			codeSnippet: codeSnippet,
			editDate: new Date(Date.now()),
		};
		postUtils.editPost(editedPost, (result) => {
			if (result.success) {
				setTitle("");
				setContent("");
				setCodeSnippet("");
				window.location.reload();
			}
		});
	};
	return (
		<>
			<CssBaseline />
			<Box
				component="form"
				sx={{ mt: 3, width: "100%", px: 2 }}
				onSubmit={submitEditPost}
			>
				<TextField
					name="title"
					fullWidth
					required
					type="text"
					id="title"
					value={title}
					inputProps={{ maxLength: 40 }}
					sx={{ mb: 2 }}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<TextField
					name="content"
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

				{codeSnippet && (
					<TextField
						name="codeInput"
						fullWidth
						multiline
						rows={0}
						maxRows={25}
						type="text"
						id="codeInput"
						value={codeSnippet}
						onKeyDown={handleTab}
						onChange={(e) => setCodeSnippet(e.target.value)}
						sx={{ pt: 2 }}
					/>
				)}

				<Button type="submit" variant="contained" sx={{ my: 2 }}>
					Submit
				</Button>
			</Box>
		</>
	);
};

export default EditPost;
