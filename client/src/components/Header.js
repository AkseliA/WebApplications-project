import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
//Mui imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";

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

	//TODO LOGIN / REGISTER LINKS
	return (
		<Box sx={{ flexGrow: 1 }}>
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
						<Link to="/" id="homeHeader">
							MY APP
						</Link>
					</Typography>
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
									<Link to="/profile">Edit profile</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link
										to="/login"
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
							<Link to="/login">Login</Link>
							<Link to="/register">Register</Link>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
