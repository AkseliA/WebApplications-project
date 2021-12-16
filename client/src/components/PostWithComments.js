import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container, List, CssBaseline, ListSubheader } from "@mui/material";
import authUtils from "../auth/authUtils";
import postUtils from "../auth/postUtils";
import Post from "./Post";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

const PostWithComments = () => {
	const params = useParams();
	const [user, setUser] = useState(null);
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState(null);
	useEffect(() => {
		//Get current user from authUtils
		setUser(authUtils.getCurrentUser());
		//Fetch post
		postUtils.fetchPost(params.id, (res) => {
			if (res.success) {
				setPost(res.post);
			}
		});
		//Fetch post related comments
		postUtils.fetchComments(params.id, (res) => {
			if (res.success) {
				setComments(res.comments);
			}
		});
	}, [params.id]);

	//Renders Post, Comemnts and a field for adding comments
	return (
		<>
			<CssBaseline />

			<Container
				component="main"
				maxWidth="md"
				sx={{
					marginTop: 8,
				}}
			>
				{post && <Post post={post} user={user}></Post>}
				<List
					sx={{ width: "100%", pb: 0 }}
					aria-labelledby="comment-list-header"
					subheader={
						<ListSubheader
							element="div"
							id="comment-list-header"
							sx={{
								backgroundColor: "transparent",
								textAlign: "left",
								color: "text.primary",
								pl: 0,
							}}
						>
							Comments:
						</ListSubheader>
					}
				>
					{comments &&
						comments.map((comment) => (
							<Comment
								key={comment._id}
								comment={comment}
								user={user}
							></Comment>
						))}
				</List>
				{user && post && (
					<CommentInput user={user} postId={post._id}></CommentInput>
				)}
			</Container>
		</>
	);
};

export default PostWithComments;
