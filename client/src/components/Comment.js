import React, { useState } from "react";
import {
	Menu,
	MenuItem,
	Avatar,
	Box,
	Typography,
	CssBaseline,
	IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Comment = ({ user, comment }) => {
	const deleteComment = () => {
		console.log("remove");
	};

	const editComment = () => {
		console.log("edit");
	};

	return (
		<>
			<CssBaseline />

			<Box
				sx={{
					mb: 4,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					border: "1px solid gray",
					position: "relative",
					bgcolor: "red", //TODO COLOR
				}}
			>
				<Box
					component="div"
					sx={{
						py: 1,
						pl: 1,
						width: "100%",
						borderBottom: "1px solid gray",
						bgcolor: "gray", //TODO color
					}}
				>
					<Avatar
						alt="user"
						src={"/api/user/avatar/" + user.avatar}
						sx={{ width: 24, height: 24 }}
					/>
					<Typography display="block" align="left">
						{comment.user.username}:
					</Typography>
					{user._id === comment.user._id && (
						<>
							<IconButton
								onClick={editComment}
								color="inherit"
								display="block"
								aria-controls="edit-comment"
								aria-label="edit"
								sx={{
									position: "absolute",
									top: 0,
									right: 25,
									py: 1.25,
									pr: 1,
								}}
							>
								<EditIcon fontSize="small" />
							</IconButton>
							<IconButton
								onClick={deleteComment}
								color="inherit"
								display="block"
								aria-controls="del-comment"
								aria-label="delete"
								sx={{
									position: "absolute",
									top: 0,
									right: 0,
									py: 1.25,
									pr: 1,
								}}
							>
								<DeleteIcon fontSize="small" />
							</IconButton>
						</>
					)}
				</Box>
				<Box component="div" sx={{ my: 2, width: "100%", px: 2 }}>
					<Typography variant="body1">{comment.content}</Typography>
				</Box>
				<Box
					component="div"
					sx={{
						py: 1,
						px: 1,
						width: "100%",
						borderBottom: "1px solid gray",
						bgcolor: "gray", //TODO color
					}}
				>
					<Typography variant="caption" display="block" align="left">
						Date: {comment.date}
					</Typography>
					{comment.editDate && (
						<Typography
							variant="caption"
							sx={{
								position: "absolute",
								bottom: 0,
								right: 0,
								pb: 1.2,
								pr: 1,
							}}
						>
							Last edited: {comment.editDate}
						</Typography>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Comment;
