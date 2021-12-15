import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
	Button,
	TextField,
	CssBaseline,
	Grid,
	Box,
	Typography,
	Container,
} from "@mui/material";
import authUtils from "../auth/authUtils";
import AlertSnackbar from "./AlertSnackbar";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [snackbarProps, setSnackbarProps] = useState({ isOpen: false });

	const onSnackbarClose = () => {
		setSnackbarProps({ isOpen: false });
	};

	//Submit login and after succesful login stores jwt and user to localstorage
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
				//Successful login: setStates, save JWT and user and redirect
				if (data.success === true) {
					setEmail("");
					setPassword("");
					authUtils.setLocalStorage(data.token);
					authUtils.loadUser(() => {
						//Redirects after loadUser fetch finished
						navigate("/");
					});
					//failed login -> set and display snackbar alert
				} else {
					setSnackbarProps({
						isOpen: true,
						duration: 5000,
						alertType: "error",
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

export default Login;
