import React, { useState, useEffect } from "react";
import {
	Button,
	Box,
	Card,
	CardContent,
	Avatar,
	Typography,
	TextField,
	Container,
	CssBaseline,
} from "@mui/material";
import authUtils from "../auth/authUtils";
import testImage from "./testimage.png";

const Profile = () => {
	const [user, setUser] = useState("");

	//useEffect for fetching profile from "/api/user/profile"
	useEffect(() => {
		let jwt = authUtils.getLocalStorage();
		fetch("/api/user/profile", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			mode: "cors",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success === true) {
					setUser(data.user);
				}
			});
	}, []);

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
					Edit profile
				</Typography>

				<Avatar
					id="profilePicture"
					src={testImage}
					sx={{
						width: 150,
						height: 150,
						borderRadius: "50%",
						display: "inline",
						m: 1,
					}}
				></Avatar>
				<CardContent>
					<Typography variant="body2" color="white">
						*** BIOGRAPHY ***
					</Typography>
					<Box component="form" sx={{ mt: 3, width: "100%" }}>
						<TextField
							name="content"
							label="content"
							fullWidth
							multiline
							type="text"
							id="content"
							color="secondary"
							sx={{ mb: 2 }}
						/>
						<TextField
							name="content"
							label="content"
							fullWidth
							multiline
							type="text"
							id="content"
							sx={{ mb: 2 }}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Submit
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Profile;
