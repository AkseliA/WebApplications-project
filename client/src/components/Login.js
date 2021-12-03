import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
	Button,
	TextField,
	Grid,
	Box,
	Typography,
	Container,
} from "@mui/material";
import authUtils from "../auth/authUtils";
//TODO: FORM VALIDATION!
const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//Submit login and after succesful login stores jwt to localstorage
	const submitLogin = (e) => {
		e.preventDefault();

		const user = {
			email: email,
			password: password,
		};
		//POST request to "/api/user/login"
		fetch("/api/user/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
			mode: "cors",
		})
			.then((response) => response.json())
			.then((data) => {
				//Successful registration: setStates, save JWT and redirect
				if (data.success === true) {
					setEmail("");
					setPassword("");
					authUtils.setLocalStorage(data.token);
					authUtils.isLoggedIn();
					navigate("/");
				}
			});
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography variant="h5">Login</Typography>
				<Box component="form" sx={{ mt: 3 }} onSubmit={submitLogin}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Log in
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
