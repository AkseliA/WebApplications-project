import React, { useState, useEffect } from "react";
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

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import postUtils from "../auth/postUtils";

//TODO POST AVATAR, EDIT/ DELETE Button vbisibility, vote color(success^, red v)
//post and user as props, if user equals post creator -> visible edit/delete buttons
const Post = ({ post, user }) => {
	//For handling menu clicks
	const [anchorEl, setAnchorEl] = useState(null);
	const [hasVoted, setHasVoted] = useState(null);

	//This is used to check if user has voted and change the vote arrow color accordingly
	useEffect(() => {
		if (user && post.voters.length !== 0) {
			const match = post.voters.filter(
				(vote) => vote.userId === user._id
			);
			setHasVoted(match[0].voteType);
		}
	}, [post, user]);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	//voteType +/- 1
	const handleVote = (voteType) => {
		if (!user) return;
		let vote = {
			post: post,
			userId: user._id,
			voteType: voteType,
		};

		//Vote validation is done server side. After successful vote refresh page
		postUtils.handlePostVote(vote, (res) => {
			window.location.reload();
		});
	};

	const deletePost = () => {
		//close menu
		handleClose();

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

	const editPost = () => {
		//close menu
		console.log(post);
		handleClose();
	};

	return (
		<>
			<CssBaseline />

			<Box
				sx={{
					mt: 4,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					border: "1px solid red",
					position: "relative",
					bgcolor: "paleturquoise", //TODO COLOR
				}}
			>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					sx={{ bgcolor: "yellow", m: 0, p: 1, width: "100%" }}
				>
					<Grid item>
						<Grid
							container
							direction="row"
							justifyContent="flex-start"
							alignItems="center"
						>
							<Grid item>
								<IconButton
									sx={{ p: 0 }}
									onClick={() => handleVote(1)}
								>
									<ArrowUpwardIcon
										color={
											hasVoted === 1
												? "success"
												: "default"
										}
									/>
								</IconButton>
							</Grid>
							<Grid item>{post.voteCount}</Grid>
							<Grid item>
								<IconButton
									sx={{ p: 0 }}
									onClick={() => handleVote(-1)}
								>
									<ArrowDownwardIcon
										sx={{
											color:
												hasVoted === -1
													? "red"
													: "default",
										}}
									/>
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Typography variant="h5">{post.title}</Typography>
					</Grid>
					<Grid item>
						{user && user._id === post.user._id && (
							<IconButton
								onClick={handleMenu}
								color="inherit"
								display="block"
								aria-controls="menu-post"
								sx={{ p: 0 }}
							>
								<MoreVertIcon />
							</IconButton>
						)}
						<Menu
							id="menu-post"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={editPost}>Edit</MenuItem>
							<MenuItem onClick={deletePost}>Delete</MenuItem>
						</Menu>
					</Grid>
				</Grid>

				<Box
					component="div"
					sx={{ my: 2, width: "100%", px: 2, textAlign: "left" }}
				>
					<Typography variant="body1" sx={{ wordWrap: "break-word" }}>
						{post.content}
					</Typography>
					{post.codeSnippet && (
						<Box
							component="div"
							sx={{
								bgcolor: "red",
								width: "100%",
								overflow: "auto",
								p: 0.5,
							}}
						>
							<pre style={{ margin: 0 }}>
								<code>{post.codeSnippet}</code>
							</pre>
						</Box>
					)}
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
