import React from "react";
import { Snackbar, Alert, CssBaseline } from "@mui/material/";

//This component is built using mui snackbar template
//https://mui.com/components/snackbars/#positioned-snackbars
export default function AlertSnackbar({
	duration,
	alertType,
	msg,
	isOpen,
	onClose,
}) {
	return (
		<div>
			<CssBaseline />
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={isOpen}
				autoHideDuration={duration}
				onClose={onClose}
			>
				<Alert severity={alertType} onClose={onClose}>
					{msg}
				</Alert>
			</Snackbar>
		</div>
	);
}
