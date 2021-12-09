import React, { useState } from "react";
import {
	Menu,
	MenuItem,
	Box,
	Grid,
	Typography,
	CssBaseline,
	IconButton,
	Avatar,
} from "@mui/material";
import postUtils from "../auth/postUtils";

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

	const deletePost = () => {
		//close menu
		setAnchorEl(null);

		postUtils.deletePost(post._id, (res) => {
			//After successful delete -> redirect
			if (res.success) {
				if (window.location.href === "/") {
					window.location.reload();
				} else {
					window.location.href = "/";
				}
			}
		});
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
					{user._id === post.user._id && (
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
						<MenuItem onClick={deletePost}>Delete</MenuItem>
					</Menu>
				</Box>
				<Box component="div" sx={{ my: 2, width: "100%", px: 2 }}>
					<Typography variant="body1">{post.content}</Typography>
				</Box>

				<Grid
					container
					sx={{ bgcolor: "green", m: 0, p: 0, width: "100%" }}
				>
					<Grid item xs sx={{ p: 1 }} container>
						<Grid
							item
							xs
							container
							direction="column"
							alignItems="flex-start"
						>
							<Grid item xs>
								<Grid
									item
									xs
									container
									direction="row"
									alignItems="flex-start"
								>
									<Grid item xs>
										<Avatar
											alt={post.user.username.toUpperCase()}
											src={
												"/api/user/avatar/" +
												post.user.avatar
											}
											sx={{ width: 24, height: 24 }}
										/>
									</Grid>
									<Grid item xs>
										<Typography
											variant="body"
											sx={{ pl: 1 }}
										>
											{post.user.username}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs>
								<Typography variant="caption">
									Posted: {post.date}
								</Typography>
							</Grid>
						</Grid>
						<Grid
							item
							xs
							container
							direction="column"
							alignItems="flex-end"
						>
							<Grid item xs></Grid>
							<Grid item xs>
								{post.editDate && (
									<Typography variant="caption">
										Last edited: {post.editDate}
									</Typography>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default Post;
