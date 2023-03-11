import "./LoginForm.scss";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function LoginForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const errors = useSelector((store) => store.errors);
	const dispatch = useDispatch();
	const history = useHistory();

	const login = () => {
		if (username && password) {
			dispatch({
				type: "LOGIN",
				payload: {
					username: username,
					password: password,
				},
			});
		} else {
			dispatch({ type: "LOGIN_INPUT_ERROR" });
		}
	}; // end login

	return (
		<form className="login-form">
			<h2 className="login-form__header">Welcome Back</h2>
			{errors.loginMessage && (
				<h3 className="alert" role="alert">
					{errors.loginMessage}
				</h3>
			)}
			<TextField
				type="email"
				label="Email"
				variant="outlined"
				value={username}
				onChange={(event) => setUsername(event.target.value)}
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
			<div className="login-form__additional-actions-box">
				<a
					className="login-form__sign-up-btn"
					onClick={() => {
						history.push("/registration");
					}}
				>
					Don't have an account ? <span>Sign Up</span>
				</a>
				<a className="login-form__forgot-password-btn">
					Forgot Password
				</a>
			</div>
			<Button variant="contained" sx={{ width: "100%" }} onClick={login}>
				Sign In
			</Button>
		</form>
	);
}

export default LoginForm;
