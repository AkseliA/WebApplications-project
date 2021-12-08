import React, { useState, useEffect } from "react";
import {
	Button,
	Card,
	CardContent,
	Avatar,
	Typography,
	Container,
	CssBaseline,
} from "@mui/material";
import authUtils from "../auth/authUtils";
import EditProfile from "./EditProfile";
import DisplayProfile from "./DisplayProfile";

const Profile = () => {
	const [user, setUser] = useState("");
	const [editMode, setEditMode] = useState(true);

	//useEffect for getting the current profile
	useEffect(() => {
		console.log("loaded");
		setUser(authUtils.getCurrentUser());
	}, []);

	const handleChange = () => {
		setEditMode(editMode ? false : true);
	};

	//TODO: WHEN PROFILE IS EDITED REMEMBER TO UPDATE LOCALSTORAGE
	//By default this component displays user profile. When edit button is clicked
	//a component is loaded so that editing is possible
	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />

			<Card
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					bgcolor: "primary.main",
				}}
			>
				<Typography variant="h4" color="white" sx={{ mt: 1 }}>
					{editMode ? "My profile" : "Edit profile"}
				</Typography>

				{user.avatar && (
					<Avatar
						id="profilePicture"
						src={"/api/user/avatar/" + user.avatar}
						sx={{
							width: 150,
							height: 150,
							borderRadius: "50%",
							display: "inline",
							m: 1,
						}}
					></Avatar>
				)}
				<CardContent>
					{editMode ? (
						<DisplayProfile user={user} />
					) : (
						<EditProfile user={user} />
					)}
					<Button
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						onClick={handleChange}
					>
						{editMode
							? "Click to edit profile"
							: "Return to profile"}
					</Button>
					<Typography variant="body2" color="white">
						This account was created {user.registerDate}
					</Typography>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Profile;
