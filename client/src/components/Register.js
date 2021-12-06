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

//TODO: FORM VALIDATION!
const Register = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitRegister = (e) => {
		e.preventDefault();

		const newUser = {
			email: email,
			password: password,
			username: username,
			date: new Date(Date.now()),
		};
		//Post request to backend "/api/user/register"
		fetch("/api/user/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newUser),
			mode: "cors",
		})
			.then((response) => response.json())
			.then((data) => {
				//Successful registration -> redirect and set states to ""
				if (data.success === true) {
					setUsername("");
					setEmail("");
					setPassword("");
					navigate("/login");
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
				<Typography variant="h5">Register</Typography>
				<Box component="form" sx={{ mt: 3 }} onSubmit={submitRegister}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								name="username"
								required
								fullWidth
								id="username"
								label="Username"
								autoFocus
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Grid>
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
						Submit
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Register;
