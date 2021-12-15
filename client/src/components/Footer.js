import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CssBaseline } from "@mui/material";

const Footer = () => {
	return (
		<>
			<CssBaseline />

			<Box
				bgcolor="primary.main"
				sx={{
					flexGrow: 1,
					mt: 8,
				}}
			>
				<Typography sx={{ fontWeight: "bold", color: "text.primary" }}>
					MY APP 2021
				</Typography>
			</Box>
		</>
	);
};

export default Footer;
