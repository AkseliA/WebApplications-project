import "./App.css";
import { Typography } from "@mui/material";
import Header from "./components/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				<Header></Header>
				<Typography variant="h1">Hello hello</Typography>
				<Routes>
					<Route path="/" element={<h2>Joo</h2>}></Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
