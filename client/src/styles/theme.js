import { createTheme, ThemeProvider, makeStyles } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		type: "light",
		primary: {
			main: "#6fbfbf",
		},
		secondary: {
			main: "#f50057",
		},
		background: {
			default: "#ffffff",
			paper: "#FAF5F0",
		},
	},
});
export default theme;
