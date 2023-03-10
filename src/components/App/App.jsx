import React, { useEffect } from "react";
import {
	HashRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../../layout/Nav/Nav"; // Delete later

import ProtectedRoute from "../../utils/ProtectedRoute";

import Dashboard from "../../pages/Dashboard/components/Dashboard/Dashboard";
import LoginPage from "../../pages/Login/components/LoginPage/LoginPage";
import RegisterPage from "../../pages/Register/components/RegisterPage/RegisterPage";

import "./App.scss";

function App() {
	const dispatch = useDispatch();

	const user = useSelector((store) => store.user);

	useEffect(() => {
		dispatch({ type: "FETCH_USER" });
	}, [dispatch]);

	return (
		<Router>
			<div>
				<Nav />
				<Switch>
					{/* Visiting localhost:3000 will redirect to localhost:3000/home */}
					<Redirect exact from="/" to="/dashboard" />

					{/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the Dashboard if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
					<ProtectedRoute
						// logged in shows Dashboard else shows LoginPage
						exact
						path="/dashboard"
					>
						<Dashboard />
					</ProtectedRoute>

					<Route exact path="/login">
						{user.id ? (
							// If the user is already logged in,
							// redirect to the /user page
							<Redirect to="/dashboard" />
						) : (
							// Otherwise, show the login page
							<LoginPage />
						)}
					</Route>

					<Route exact path="/registration">
						{user.id ? (
							// If the user is already logged in,
							// redirect them to the /user page
							<Redirect to="/dashboard" />
						) : (
							// Otherwise, show the registration page
							<RegisterPage />
						)}
					</Route>

					{/* <Route exact path="/home">
						{user.id ? (
							// If the user is already logged in,
							// redirect them to the /user page
							<Redirect to="/login" />
						) : (
							// Otherwise, show the Landing page
							<Dashboard />
						)}
					</Route> */}

					{/* If none of the other routes matched, we will show a 404. */}
					<Route>
						<h1>404</h1>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
