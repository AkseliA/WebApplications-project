import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import authUtils from "../auth/authUtils";

const Header = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<NavLink to="/" activeClassName="active">
						Home
					</NavLink>

					<Typography
						variant="h3"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						TEKSTIÄ
					</Typography>

					<NavLink to="/register" activeClassName="active">
						Register
					</NavLink>
					<NavLink to="/login" activeClassName="active">
						Login
					</NavLink>

					<NavLink to="/" onClick={authUtils.logOut}>
						Logout
					</NavLink>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
