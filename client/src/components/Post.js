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
	Link,
} from "@mui/material";
import hljs from "highlight.js";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import postUtils from "../auth/postUtils";
import dateUtils from "../auth/dateUtils";
import EditPost from "./EditPost";

//post and user as props, if user equals post creator -> visible edit/delete buttons
const Post = ({ post, user }) => {
	//For handling menu clicks
	const [anchorEl, setAnchorEl] = useState(null);
	const [hasVoted, setHasVoted] = useState(null);

	const [editMode, setEditMode] = useState(false);

	//This is used to check if user has voted and change the vote arrow color accordingly
	//Also initializes highlight.js for highlighting any <pre><code></pre></code> blocks.
	useEffect(() => {
		if (post.codeSnippet) {
			//Select any unhighlighted elements and highlight them´
			const elements = document.querySelectorAll("pre code");
			elements.forEach((element) => {
				//Highlight if classlist doesn't contain "hljs"
				if (!element.classList.contains("hljs")) {
					hljs.highlightElement(element);
				}
			});
		}

		if (user && post.voters.length !== 0) {
			const match = post.voters.filter(
				(vote) => vote.userId === user._id
			);
			if (match.length > 0) {
				setHasVoted(match[0].voteType);
			}
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
		handleClose();
		setEditMode(editMode ? false : true);
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
					borderRadius: 1,
					border: "1px solid #c0bcb8",
					position: "relative",
					backgroundColor: "background.paper",
				}}
			>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					sx={{
						borderBottom: "1px solid #c0bcb8",
						m: 0,
						p: 1,
						width: "100%",
					}}
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
							<MenuItem onClick={editPost}>
								{!editMode ? "Edit" : "Return"}
							</MenuItem>
							<MenuItem onClick={deletePost}>Delete</MenuItem>
						</Menu>
					</Grid>
				</Grid>
				{!editMode ? (
					<>
						<Box
							component="div"
							sx={{
								my: 2,
								width: "100%",
								px: 2,
								textAlign: "left",
							}}
						>
							<Typography
								variant="body1"
								sx={{ wordWrap: "break-word" }}
							>
								{post.content}
							</Typography>
							{post.codeSnippet && (
								<Box
									component="div"
									sx={{
										border: "1px solid #c0bcb8",
										width: "100%",
										overflow: "auto",
									}}
								>
									<pre style={{ margin: 0 }}>
										<code>{post.codeSnippet}</code>
									</pre>
								</Box>
							)}
						</Box>
					</>
				) : (
					<EditPost originalPost={post} />
				)}

				<Grid
					container
					sx={{
						m: 0,
						p: 0,
						width: "100%",
						borderTop: "1px solid #c0bcb8",
					}}
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
										<Link
											href={
												"/profile/" + post.user.username
											}
											color="text.primary"
										>
											<Typography
												variant="body"
												sx={{ pl: 1 }}
											>
												{post.user.username}
											</Typography>
										</Link>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs>
								<Typography variant="caption">
									Posted:{" "}
									{dateUtils.parseMongoDate(post.date)}
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
										Last edited:{" "}
										{dateUtils.parseMongoDate(
											post.editDate
										)}
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
