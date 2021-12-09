import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container, List } from "@mui/material";
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
	}, []);

	//Renders Post, Comemnts and a field for adding comments
	return (
		<Container
			component="main"
			maxWidth="md"
			sx={{
				marginTop: 8,
			}}
		>
			{post && <Post post={post} user={user}></Post>}
			<List sx={{ width: "100%" }}>
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
				<CommentInput user={user} post={post._id}></CommentInput>
			)}
		</Container>
	);
};

export default PostWithComments;
