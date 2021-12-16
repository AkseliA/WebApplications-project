import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import {
	CssBaseline,
	AppBar,
	Link,
	Box,
	Toolbar,
	Typography,
	IconButton,
	MenuItem,
	Menu,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";

import authUtils from "../auth/authUtils";

//Used a mui template appbar:
//https://mui.com/components/app-bar/#app-bar-with-menu
const Header = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const location = useLocation();

	//useEffect when url state changes
	//loggedIn is used for conditional rendering
	useEffect(() => {
		setLoggedIn(authUtils.isLoggedIn());
	}, [location.pathname]);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<CssBaseline />

			<Box sx={{ flexGrow: 1, mb: 8 }}>
				<AppBar position="static">
					<Toolbar>
						<Typography
							variant="h4"
							component="div"
							sx={{
								flexGrow: 1,
								textAlign: "left",
								fontWeight: "bold",
							}}
						>
							<Link
								href="/"
								id="homeHeader"
								color="text.primary"
								underline="none"
							>
								SnippetApp
							</Link>
						</Typography>
						<Link href="/search">
							<IconButton size="large" aria-label="Search">
								<SearchIcon sx={{ color: "text.primary" }} />
							</IconButton>
						</Link>
						{loggedIn ? (
							<div>
								<IconButton
									size="large"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									color="inherit"
								>
									<SettingsIcon />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleClose}>
										<Link
											href="/profile"
											color="text.primary"
											underline="none"
										>
											My profile
										</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link
											href="/login"
											color="text.primary"
											underline="none"
											onClick={() => {
												authUtils.logOut();
											}}
										>
											Logout
										</Link>
									</MenuItem>
								</Menu>
							</div>
						) : (
							<div>
								<Link
									href="/login"
									color="inherit"
									sx={{ mx: 1 }}
									underline="none"
								>
									Login
								</Link>
								<Link
									href="/register"
									color="inherit"
									sx={{ mx: 1 }}
									underline="none"
								>
									Register
								</Link>
							</div>
						)}
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};

export default Header;
