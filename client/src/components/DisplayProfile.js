import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

//https://mui.com/components/stack/#main-content
const DisplayProfile = ({ user }) => {
	const Item = styled(Paper)(({ theme }) => ({
		...theme.typography.body1,
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.primary,
	}));
	return (
		<>
			<CssBaseline />

			<Box component="div" sx={{ mt: 2, width: "100%" }}>
				<Stack>
					<label htmlFor="bio">Biography:</label>
					<Item id="bio" sx={{ mb: 2 }}>
						{user.bio}
					</Item>

					<label htmlFor="username">Username:</label>
					<Item id="username" sx={{ mb: 2 }}>
						{user.username}
					</Item>

					<label htmlFor="email">Email:</label>
					<Item id="email">{user.email}</Item>
				</Stack>
			</Box>
		</>
	);
};

export default DisplayProfile;
