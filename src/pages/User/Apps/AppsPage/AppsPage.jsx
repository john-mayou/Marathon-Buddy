import "./AppsPage.scss";
import Sidebar from "../../../../layout/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function AppsPage() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	// lets user approve scope for API access
	const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=102249&response_type=code&redirect_uri=http://localhost:5000/api/strava-auth&approval_prompt=force&scope=activity:read_all`;

	return (
		<div className="connected-apps">
			<Sidebar />
			<section className="connected-apps__main-content">
				<h1>CONNECTED APPS</h1>
				{user.strava_connected ? (
					<button
						onClick={() => dispatch({ type: "DISCONNECT_STRAVA" })}
					>
						Disconnect
					</button>
				) : (
					<a href={stravaAuthUrl}>Connect to Strava</a>
				)}
				<h2>Welcome, {user.email}!</h2>
				<p>Your ID is: {user.id}</p>
			</section>
		</div>
	);
}

export default AppsPage;
