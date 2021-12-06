import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
	Button,
	TextField,
	Grid,
	Box,
	Typography,
	Container,
	CssBaseline,
} from "@mui/material";
//TODO: FORM VALIDATION!

const Home = () => {
	const navigate = useNavigate();
	const [content, setContent] = useState("");

	//usestate postauksille. Postit haetaan mongodbstä ja lisätään usestateen.
	//Kun lisätään uusia postauksia ne lisätään db sekä staten perään, jottei tarvitse
	//tehdä uutta hakua
	const [post, setPost] = useState("");

	const submitPost = (e) => {
		e.preventDefault();
	};
	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />

			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					border: "1px solid gray",
				}}
			>
				<Typography variant="h6" sx={{ mt: 3 }}>
					New post
				</Typography>
				<Box
					component="form"
					sx={{ mt: 3, width: "100%", px: 2 }}
					onSubmit={submitPost}
				>
					<TextField
						name="content"
						label="content"
						fullWidth
						multiline
						rows={5}
						type="text"
						id="content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Submit
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Home;
