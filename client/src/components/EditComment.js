import React, { useState, useEffect } from "react";
import { Button, TextField, Box, CssBaseline } from "@mui/material";
import postUtils from "../auth/postUtils";

const EditComment = ({ originalComment }) => {
	const [content, setContent] = useState("");

	useEffect(() => {
		setContent(originalComment.content);
	}, [originalComment]);

	// POST request to server
	const submitEditComment = (e) => {
		e.preventDefault();
		const editedComment = {
			_id: originalComment._id,
			content: content,
			editDate: new Date(Date.now()),
		};
		postUtils.editComment(editedComment, (res) => {
			if (res.success) {
				setContent("");
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
				onSubmit={submitEditComment}
			>
				<TextField
					name="content"
					label="Edit comment"
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
					sx={{ my: 2 }}
				>
					Submit
				</Button>
			</Box>
		</>
	);
};

export default EditComment;
