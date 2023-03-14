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
import DashboardPage from "../../pages/User/Dashboard/components/DashboardPage/DashboardPage";
import JoinInfoPage from "../../pages/User/JoinInfo/components/JoinInfoPage/JoinInfoPage";
import JoinCohortPage from "../../pages/User/JoinCohort/components/JoinCohortPage/JoinCohortPage";
import HistoryPage from "../../pages/User/History/components/HistoryPage/HistoryPage";
import AppsPage from "../../pages/User/Apps/components/AppsPage/AppsPage";

// Admin
import AdminPage from "../../pages/Admin/components/AdminPage/AdminPage";

// Info Pages / Landing
import HomePage from "../../pages/Home/components/HomePage/HomePage";

// Login Pages
import LoginPage from "../../pages/Login/Login/components/LoginPage/LoginPage";
import RegisterPage from "../../pages/Login/Register/components/RegisterPage/RegisterPage";

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

					<ProtectedRoute exact path="/join-cohort">
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
						{user.id ? <Redirect to="/dashboard" /> : <LoginPage />}
					</Route>

					<Route exact path="/registration">
						{user.id ? (
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
