import React from "react";
import {
	Avatar,
	Box,
	Typography,
	CssBaseline,
	IconButton,
	Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import postUtils from "../auth/postUtils";

const Comment = ({ user, comment }) => {
	//TODO: Confirm dialogs?
	const deleteComment = () => {
		postUtils.deleteComment(comment._id, (res) => {
			if (res.success) {
				//redirect
				window.location.reload();
			}
		});
	};

	const editComment = () => {
		console.log("edit");
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
					border: "1px solid gray",
					position: "relative",
					bgcolor: "red", //TODO COLOR
				}}
			>
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
											alt={comment.user.username.toUpperCase()}
											src={
												"/api/user/avatar/" +
												comment.user.avatar
											}
											sx={{ width: 24, height: 24 }}
										/>
									</Grid>
									<Grid item xs>
										<Typography
											variant="body"
											sx={{ pl: 1 }}
										>
											{comment.user.username}
										</Typography>
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
											onClick={(e) => deleteComment(e)}
											color="inherit"
											display="block"
											aria-controls="del-comment"
											aria-label="delete"
											sx={{ p: 0 }}
										>
											<DeleteIcon fontSize="small" />
										</IconButton>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Box sx={{ my: 2, width: "100%", px: 1 }}>
					<Typography variant="body1" sx={{ textAlign: "left" }}>
						{comment.content}
					</Typography>
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
								<Typography variant="caption">
									Posted : {comment.date}
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
										Last edited: {comment.editDate}
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
