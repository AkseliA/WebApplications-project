import React, { useState } from "react";
import { useNavigate } from "react-router";
import AlertSnackbar from "./AlertSnackbar";

import {
	Button,
	TextField,
	Grid,
	Box,
	Typography,
	CssBaseline,
	Container,
} from "@mui/material";

const Register = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [snackbarProps, setSnackbarProps] = useState({ isOpen: false });

	const onSnackbarClose = () => {
		setSnackbarProps({ isOpen: false });
	};

	//Form validation is done server side, before registering
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

					//If validation errors -> display snackbar alert
				} else {
					setSnackbarProps({
						isOpen: true,
						duration: 5000,
						alertType: "warning",
						msg: data.msg,
					});
				}
			});
	};

	return (
		<>
			<CssBaseline />
			{snackbarProps.isOpen && (
				<AlertSnackbar
					duration={snackbarProps.duration}
					alertType={snackbarProps.alertType}
					msg={snackbarProps.msg}
					isOpen={snackbarProps.isOpen}
					onClose={onSnackbarClose}
				/>
			)}

			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						backgroundColor: "background.paper",
						p: 1,
						borderRadius: 1,
					}}
				>
					<Typography variant="h5">Register</Typography>
					<Box
						component="form"
						sx={{ mt: 3 }}
						onSubmit={submitRegister}
					>
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
									onChange={(e) =>
										setUsername(e.target.value)
									}
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
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 1 }}
						>
							Submit
						</Button>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default Register;
