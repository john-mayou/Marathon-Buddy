import "./AppsPage.scss";
import Sidebar from "../../../../../layout/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";

function AppsPage() {
	const user = useSelector((store) => store.user);

	const handleConnectStrava = () => {
		axios
			.get("/api/strava-auth")
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="connected-apps">
			<Sidebar />
			<section className="connected-apps__main-content">
				<h1>CONNECTED APPS</h1>
				<button onClick={handleConnectStrava}>Connect to Strava</button>
				<h2>Welcome, {user.email}!</h2>
				<p>Your ID is: {user.id}</p>
			</section>
		</div>
	);
}

export default AppsPage;
