import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
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
import dateUtils from "../auth/dateUtils";
import DisplayProfile from "./DisplayProfile";

//TODO: error profile not found
const VisitingProfile = () => {
	const params = useParams();
	const [user, setUser] = useState(null);

	//useEffect for getting the profile using params.username
	useEffect(() => {
		if (params.username) {
			authUtils.getUserByUsername(params.username, (res) => {
				if (res.success) {
					setUser(res.user);
				}
			});
		}
	}, [params]);
	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />

			{user ? (
				<Card
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						bgcolor: "background.paper",
					}}
				>
					<Typography variant="h4" sx={{ mt: 1 }}>
						{`${user.username}'s profile`}
					</Typography>

					<Avatar
						id="profilePicture"
						src={"/api/user/avatar/" + user.avatar}
						sx={{
							width: 150,
							height: 150,
							display: "inline",
							m: 1,
						}}
					></Avatar>

					<CardContent>
						<DisplayProfile user={user} />

						<Typography
							variant="body2"
							color="text.primary"
							sx={{ mt: 2 }}
						>
							This account was created{" "}
							{dateUtils.parseMongoDate(user.registerDate)}
						</Typography>
					</CardContent>
				</Card>
			) : (
				<h1>ERROR: USER NOT FOUND</h1>
			)}
		</Container>
	);
};

export default VisitingProfile;
