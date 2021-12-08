import React, { useState } from "react";
import {
	Menu,
	MenuItem,
	Box,
	Typography,
	CssBaseline,
	IconButton,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

//TODO POST AVATAR, EDIT/ DELETE Button vbisibility
//post and user as props, if user equals post creator -> visible edit/delete buttons
const Post = ({ post, user }) => {
	//For handling menu clicks
	const [anchorEl, setAnchorEl] = useState(null);
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
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
					bgcolor: "paleturquoise", //TODO COLOR
				}}
			>
				<Box
					component="div"
					sx={{
						py: 1,
						width: "100%",
						borderBottom: "1px solid gray",
						bgcolor: "gray", //TODO color
					}}
				>
					<Typography variant="h5">{post.title}</Typography>
					{user._id === post.userId && (
						<IconButton
							onClick={handleMenu}
							color="inherit"
							display="block"
							aria-controls="menu-post"
							sx={{
								position: "absolute",
								top: 0,
								right: 0,
								py: 1.5,
								pr: 1,
							}}
						>
							<MoreVertIcon />
						</IconButton>
					)}
					<Menu
						id="menu-post"
						anchorEl={anchorEl}
						anchorOrigin={{ vertical: "top", horizontal: "right" }}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose}>Edit</MenuItem>
						<MenuItem onClick={handleClose}>Delete</MenuItem>
					</Menu>
				</Box>
				<Box component="div" sx={{ my: 2, width: "100%", px: 2 }}>
					<Typography variant="body1">{post.content}</Typography>
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
					<Typography
						variant="caption"
						noWrap
						display="block"
						align="left"
					>
						Posted by: {post.username}
					</Typography>
					<Typography variant="caption" display="block" align="left">
						Date: {post.date}
					</Typography>
					{post.editDate && (
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
							Last edited: {post.editDate}
						</Typography>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Post;
