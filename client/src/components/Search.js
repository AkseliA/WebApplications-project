import React, { useState, useEffect } from "react";
import {
	TextField,
	Box,
	CssBaseline,
	Container,
	IconButton,
	Stack,
	Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Post from "./Post";

import postUtils from "../auth/postUtils";
import authUtils from "../auth/authUtils";

const Search = () => {
	const [user, setUser] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [foundPosts, setFoundPosts] = useState("");

	useEffect(() => {
		setUser(authUtils.getCurrentUser());
	}, []);

	//TODO: input sanitization
	const handleSearch = (e) => {
		e.preventDefault();
		setFoundPosts("");
		if (searchTerm === "") {
			return;
		}

		postUtils.searchPosts(searchTerm.toLowerCase(), (posts) => {
			//If results found -> display posts
			if (posts.length !== 0) {
				setFoundPosts(posts);
			}
		});
		setSearchTerm("");
	};
	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />

			<Box
				sx={{
					mb: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					border: "1px solid gray",
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
			{foundPosts &&
				foundPosts.map((post) => (
					<div key={post._id}>
						<Post post={post} user={user}></Post>
						<Link
							href={"/post/" + post._id}
							color="primary"
							underline="hover"
						>
							View post and comments
						</Link>
					</div>
				))}
		</Container>
	);
};

export default Search;
