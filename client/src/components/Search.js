import React, { useState, useEffect } from "react";
import {
	TextField,
	Box,
	CssBaseline,
	Container,
	IconButton,
	Stack,
	Link,
	Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Post from "./Post";
import AlertSnackbar from "./AlertSnackbar";

import postUtils from "../auth/postUtils";
import authUtils from "../auth/authUtils";

const Search = () => {
	const [user, setUser] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [foundPosts, setFoundPosts] = useState(null);

	const [snackbarProps, setSnackbarProps] = useState({ isOpen: false });
	const onSnackbarClose = () => {
		setSnackbarProps({ isOpen: false });
	};

	useEffect(() => {
		setUser(authUtils.getCurrentUser());
	}, []);

	const handleSearch = (e) => {
		e.preventDefault();
		setFoundPosts(null);
		if (searchTerm === "") {
			return;
		}

		postUtils.searchPosts(searchTerm.toLowerCase(), (posts) => {
			//If results found -> display posts
			if (posts.length !== 0) {
				setFoundPosts(posts);
				//No posts found -> snackbar alert
			} else {
				setSnackbarProps({
					isOpen: true,
					duration: 3000,
					alertType: "error",
					msg: "No posts found",
				});
			}
		});
		setSearchTerm("");
	};
	return (
		<>
			<CssBaseline />
			{snackbarProps.isOpen && (
				<AlertSnackbar
					duration={snackbarProps.duration}
					alertType={snackbarProps.alertType}
					msg={snackbarProps.msg}
					isOpen={snackbarProps.isOpen}
					onClose={onSnackbarClose}
				/>
			)}
			<Container component="main" maxWidth="md">
				<Box
					sx={{
						mb: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						backgroundColor: "background.paper",
						p: 1,
						borderRadius: 1,
						border: "1px solid #c0bcb8",
					}}
				>
					<Box
						component="form"
						sx={{ width: "100%", px: 2 }}
						onSubmit={handleSearch}
					>
						<Stack direction="row">
							<TextField
								name="search"
								label="Search"
								fullWidth
								type="text"
								id="search"
								sx={{ my: 2 }}
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<IconButton
								size="large"
								aria-label="Search"
								type="submit"
							>
								<SearchIcon />
							</IconButton>
						</Stack>
					</Box>
				</Box>
				{foundPosts && <Typography>Search results:</Typography>}
				{foundPosts &&
					foundPosts.map((post) => (
						<div key={post._id}>
							<Post post={post} user={user}></Post>
							<Link
								href={"/post/" + post._id}
								color="text.primary"
								underline="hover"
							>
								View post and comments
							</Link>
						</div>
					))}
			</Container>
		</>
	);
};

export default Search;
