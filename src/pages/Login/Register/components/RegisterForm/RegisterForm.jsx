import "./RegisterForm.scss";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function RegisterForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const errors = useSelector((store) => store.errors);
	const dispatch = useDispatch();
	const history = useHistory();

	const registerUser = () => {
		dispatch({
			type: "REGISTER",
			payload: {
				email,
				password,
			},
		});
	}; // end registerUser

	return (
		<form className="register-form">
			<h2>Sign Up</h2>
			{errors.registrationMessage && (
				<h3 className="alert" role="alert">
					{errors.registrationMessage}
				</h3>
			)}
			<TextField
				type="email"
				label="Email"
				variant="outlined"
				value={email}
				onChange={(event) => setEmail(event.target.value)}
				sx={{ width: "100%" }}
			/>
			<TextField
				type="password"
				label="Password"
				variant="outlined"
				value={password}
				onChange={(event) => setPassword(event.target.value)}
				sx={{ width: "100%" }}
			/>
			<Button
				variant="contained"
				sx={{ width: "100%" }}
				onClick={registerUser}
			>
				Sign Up
			</Button>
			<Button
				variant="outlined"
				sx={{ width: "100%" }}
				onClick={() => history.push("/login")}
			>
				Back To Login
			</Button>
		</form>
	);
}

export default RegisterForm;
