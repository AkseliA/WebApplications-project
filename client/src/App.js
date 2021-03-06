import "./App.css";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import PostWithComments from "./components/PostWithComments";
import Search from "./components/Search";
import theme from "./styles/theme";
import VisitingProfile from "./components/VisitingProfile";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<div className="App">
					<Header></Header>
					<Routes>
						<Route
							exact={true}
							path="/register"
							element={<Register />}
						></Route>
						<Route
							exact={true}
							path="/login"
							element={<Login />}
						></Route>
						<Route exact={true} path="/" element={<Home />}></Route>
						<Route
							exact={true}
							path="/profile"
							element={<Profile />}
						></Route>
						<Route
							exact={true}
							path="/profile/:username"
							element={<VisitingProfile />}
						></Route>
						<Route
							path="/post/:id"
							element={<PostWithComments />}
						></Route>
						<Route path="/search" element={<Search />}></Route>
						<Route
							path="*"
							exact={true}
							element={
								<Typography variant="h2">
									Invalid Endpoint
								</Typography>
							}
						></Route>
					</Routes>
					<Footer />
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
