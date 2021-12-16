import React from "react";
import { CssBaseline, Typography, Box } from "@mui/material";

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
					SnippetApp 2021
				</Typography>
			</Box>
		</>
	);
};

export default Footer;
