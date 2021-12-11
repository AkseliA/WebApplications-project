import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
	return (
		<Box
			bgcolor="primary.main"
			sx={{
				flexGrow: 1,
				mt: 8,
			}}
		>
			<Typography sx={{ color: "white" }}>MY APP 2021</Typography>
		</Box>
	);
};

export default Footer;
