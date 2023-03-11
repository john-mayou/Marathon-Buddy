import "./Dashboard.scss";

import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {
	const dispatch = useDispatch();
	// this component doesn't do much to start, just renders some user reducer info to the DOM
	const user = useSelector((store) => store.user);
	return (
		<div>
			<h2>Welcome, {user.email}!</h2>
			<p>Your ID is: {user.id}</p>
			<button
				// This button shows up in multiple locations and is styled differently
				// because it's styled differently depending on where it is used, the className
				// is passed to it from it's parents through React props
				onClick={() => dispatch({ type: "LOGOUT" })}
			>
				Log Out
			</button>
		</div>
	);
}

// this allows us to use <App /> in index.js
export default Dashboard;
