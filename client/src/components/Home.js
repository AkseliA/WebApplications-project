import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Container } from "@mui/material";
import authUtils from "../auth/authUtils";
import PostInput from "./PostInput";
//TODO: FORM VALIDATION!

const Home = () => {
	const navigate = useNavigate();
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	//usestate postauksille. Postit haetaan mongodbstä ja lisätään usestateen.
	//Kun lisätään uusia postauksia ne lisätään db sekä staten perään, jottei tarvitse
	//tehdä uutta hakua
	const [post, setPost] = useState("");

	//useEffect when component is loaded, checks if user is logged in
	//and set the state "loggedIn", which is used for conditional rendering
	//Also gets current user from localStorage (null if not logged in)
	useEffect(() => {
		setLoggedIn(authUtils.isLoggedIn());
		setUser(authUtils.getCurrentUser());
	}, []);

	return (
		<Container component="main" maxWidth="sm">
			{loggedIn && <PostInput user={user} />}
		</Container>
	);
};

export default Home;
