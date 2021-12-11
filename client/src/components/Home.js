import React, { useState, useEffect } from "react";
import { Container, Button, Typography, Link } from "@mui/material";

import authUtils from "../auth/authUtils";
import postUtils from "../auth/postUtils";
import PostInput from "./PostInput";
import Post from "./Post";
//TODO: FORM VALIDATION!

const Home = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	//usestate postauksille. Postit haetaan mongodbstä ja lisätään usestateen.
	//Kun lisätään uusia postauksia ne lisätään db sekä staten perään, jottei tarvitse
	//tehdä uutta hakua
	const [posts, setPosts] = useState(null);

	//useEffect when component is loaded, checks if user is logged in
	//and set the state "loggedIn", which is used for conditional rendering
	//Also gets current user from localStorage (null if not logged in) and
	//gets all posts from the database
	useEffect(() => {
		setLoggedIn(authUtils.isLoggedIn());
		setUser(authUtils.getCurrentUser());

		postUtils.fetchPosts((result) => {
			if (result.success) {
				setPosts(result.posts.reverse());
			}
		});
	}, []);

	//Display postInput component if logged in
	//And map all posts as Post component
	return (
		<Container component="main" maxWidth="md">
			{loggedIn && <PostInput user={user} />}
			{posts &&
				posts.map((post) => (
					<div key={post._id}>
						<Post post={post} user={user}></Post>
						<Link
							href={"/post/" + post._id}
							color="primary"
							underline="hover"
						>
							View post and comments
						</Link>
					</div>
				))}
		</Container>
	);
};

export default Home;
