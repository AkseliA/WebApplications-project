import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import authUtils from "../auth/authUtils";
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

		fetch("/api/post/fetch")
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					setPosts(data.posts.reverse());
				}
			});
	}, []);

	//Display postInput component if logged in
	//And map all posts as Post component
	return (
		<Container
			component="main"
			maxWidth="md"
			sx={{
				marginTop: 8,
			}}
		>
			{loggedIn && <PostInput user={user} />}
			{posts &&
				posts.map((post) => (
					<Post post={post} user={user} key={post._id}></Post>
				))}
		</Container>
	);
};

export default Home;
