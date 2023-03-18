import "./DashboardPage.scss";
import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../../../layout/Sidebar/Sidebar";

function DashboardPage() {
	const user = useSelector((store) => store.user);

	return (
		<div>
			<Sidebar />
			<main className="dashboard-main">
				<h1>DASHBOARD</h1>
				<h2>Welcome, {user.email}!</h2>
				<p>Your ID is: {user.id}</p>
			</main>
		</div>
	);
}

// this allows us to use <App /> in index.js
export default DashboardPage;
