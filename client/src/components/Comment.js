import React, { useState, useEffect } from "react";
import {
	Avatar,
	Box,
	Typography,
	CssBaseline,
	IconButton,
	Grid,
	Link,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import dateUtils from "../auth/dateUtils";
import postUtils from "../auth/postUtils";
import EditComment from "./EditComment";

const Comment = ({ user, comment }) => {
	const [hasVoted, setHasVoted] = useState(null);
	const [editMode, setEditMode] = useState(false);

	//Check if user has voted and change color of arrows accordingly
	useEffect(() => {
		if (user && comment.voters.length !== 0) {
			const match = comment.voters.filter(
				(vote) => vote.userId === user._id
			);
			if (match.length > 0) {
				setHasVoted(match[0].voteType);
			}
		}
	}, [comment, user]);

	const deleteComment = () => {
		postUtils.deleteComment(comment._id, (res) => {
			if (res.success) {
				//redirect
				window.location.reload();
			}
		});
	};

	const editComment = () => {
		setEditMode(editMode ? false : true);
	};

	//voteType +/- 1
	const handleVote = (voteType) => {
		if (!user) return;
		let vote = {
			comment: comment,
			userId: user._id,
			voteType: voteType,
		};
		console.log(voteType);
		postUtils.handleCommentVote(vote, (res) => {
			window.location.reload();
		});
		//Vote validation is done server side. Refresh page after successful vote
	};

	return (
		<>
			<CssBaseline />

			<Box
				sx={{
					mb: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					borderRadius: 1,
					border: "1px solid #c0bcb8",
					position: "relative",
					bgcolor: "background.paper",
				}}
			>
				<Grid
					container
					sx={{
						m: 0,
						p: 0,
						width: "100%",
						borderBottom: "1px solid #c0bcb8",
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
											alt={comment.user.username.toUpperCase()}
											src={
												"/api/user/avatar/" +
												comment.user.avatar
											}
											sx={{ width: 24, height: 24 }}
										/>
									</Grid>
									<Grid item xs>
										<Link
											href={
												"/profile/" +
												comment.user.username
											}
											color="text.primary"
										>
											<Typography
												variant="body"
												sx={{ pl: 1 }}
											>
												{comment.user.username}
											</Typography>
										</Link>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							item
							xs
							container
							direction="column"
							alignItems="flex-end"
						>
							<Grid item>
								<Grid item xs container direction="row">
									{user && user._id === comment.user._id && (
										<>
											<Grid item xs>
												<IconButton
													onClick={editComment}
													color="inherit"
													display="block"
													aria-controls="edit-comment"
													aria-label="edit"
													sx={{ p: 0 }}
												>
													<EditIcon fontSize="small" />
												</IconButton>
											</Grid>
											<Grid item xs>
												<IconButton
													onClick={(e) =>
														deleteComment(e)
													}
													color="inherit"
													display="block"
													aria-controls="del-comment"
													aria-label="delete"
													sx={{ p: 0 }}
												>
													<DeleteIcon fontSize="small" />
												</IconButton>
											</Grid>
										</>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{!editMode ? (
					<>
						<Grid container sx={{ m: 0, p: 0, width: "100%" }}>
							<Grid item xs>
								<Box
									sx={{
										my: 2,
										width: "100%",
										px: 2,
										textAlign: "left",
									}}
								>
									<Typography variant="body1">
										{comment.content}
									</Typography>
								</Box>
							</Grid>
							<Grid item xs="auto">
								<Grid
									container
									direction="column"
									justifyContent="flex-end"
									alignItems="flex-end"
								>
									<Grid item xs>
										<IconButton
											sx={{ py: 0 }}
											onClick={() => handleVote(1)}
										>
											<KeyboardArrowUpIcon
												color={
													hasVoted === 1
														? "success"
														: "default"
												}
											/>
										</IconButton>
									</Grid>
									<Grid item xs sx={{ px: 2 }}>
										{comment.voteCount}
									</Grid>
									<Grid item xs>
										<IconButton
											sx={{ py: 0 }}
											onClick={() => handleVote(-1)}
										>
											<KeyboardArrowDownIcon
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
						</Grid>
					</>
				) : (
					<EditComment originalComment={comment} />
				)}

				<Grid
					container
					sx={{
						borderTop: "1px solid #c0bcb8",
						m: 0,
						p: 0,
						width: "100%",
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
								<Typography variant="caption">
									Posted:{" "}
									{dateUtils.parseMongoDate(comment.date)}
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
							<Grid item xs>
								{comment.editDate && (
									<Typography variant="caption">
										Last edited:{" "}
										{dateUtils.parseMongoDate(
											comment.editDate
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

export default Comment;
