import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Box, TextField, Input } from "@mui/material";
import authUtils from "../auth/authUtils";

const EditProfile = ({ user }) => {
	const [newBio, setNewBio] = useState("");
	const [newPfp, setNewPfp] = useState("");
	const navigate = useNavigate();

	const submitEdit = (e) => {
		e.preventDefault();
		console.log(newPfp);

		//The following fetch sends editedUser as formData
		let formData = new FormData();
		formData.append("avatar", newPfp);
		formData.append("bio", newBio);

		fetch("/api/user/edit", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${authUtils.getCurrentJWT()}`,
			},
			body: formData,
			mode: "cors",
		})
			.then((response) => response.json())
			.then((data) => {
				//Successful update returns the updated mongo document (user)
				//Replace the current localstorage user with new one and redirect.
				if (data.success === true && data.result) {
					setNewBio("");
					setNewPfp("");
					localStorage.removeItem("user");
					authUtils.loadUser(() => {
						navigate("/profile");
					});
				}
			});
	};

	return (
		<Box
			component="form"
			sx={{ mt: 2, width: "100%" }}
			onSubmit={submitEdit}
		>
			<label htmlFor="fileInput">Upload new avatar:</label>
			<Input
				type="file"
				sx={{ mb: 2.5, ml: 2 }}
				id="fileInput"
				onChange={(e) => setNewPfp(e.target.files[0])}
			></Input>
			<TextField
				name="bio"
				label="New bio"
				fullWidth
				multiline
				rows={2}
				type="text"
				id="bio"
				sx={{ mb: 2 }}
				value={newBio}
				onChange={(e) => setNewBio(e.target.value)}
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
	);
};

export default EditProfile;
