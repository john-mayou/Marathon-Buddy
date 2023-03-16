import React, { useEffect } from "react";
import {
	HashRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "../../utils/ProtectedRoute";

// User Pages
import DashboardPage from "../../pages/User/Dashboard/DashboardPage/DashboardPage";
import JoinInfoPage from "../../pages/User/JoinInfo/JoinInfoPage/JoinInfoPage";
import JoinCohortPage from "../../pages/User/JoinCohort/JoinCohortPage/JoinCohortPage";
import HistoryPage from "../../pages/User/History/HistoryPage/HistoryPage";
import AppsPage from "../../pages/User/Apps/AppsPage/AppsPage";

// Admin
import AdminPage from "../../pages/Admin/AdminPage/AdminPage";

// Info Pages / Landing
import HomePage from "../../pages/Home/HomePage/HomePage";

// Login Pages
import LoginPage from "../../pages/Login/LoginPage/LoginPage";
import RegisterPage from "../../pages/Login/RegisterPage/RegisterPage";

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
				<Switch>
					<Redirect exact from="/" to="/home" />

					<ProtectedRoute exact path="/dashboard">
						<DashboardPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/join-info">
						<JoinInfoPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/join-cohort/:trainingDuration">
						<JoinCohortPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/cohort-history">
						<HistoryPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/connected-apps">
						<AppsPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/admin">
						<AdminPage />
					</ProtectedRoute>

					<Route exact path="/login">
						{user.id && user.email_verified ? (
							<Redirect to="/dashboard" />
						) : (
							<LoginPage />
						)}
					</Route>

					<Route exact path="/registration">
						{user.email_verified ? (
							<Redirect to="/dashboard" />
						) : (
							<RegisterPage />
						)}
					</Route>

					<Route exact path="/home">
						{user.id ? <Redirect to="/dashboard" /> : <HomePage />}
					</Route>

					<Route>
						<h1>404</h1>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
