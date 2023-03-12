import "./AppsPage.scss";
import Sidebar from "../../../../../layout/Sidebar/Sidebar";
import { useSelector } from "react-redux";

function AppsPage() {
	const user = useSelector((store) => store.user);

	return (
		<div className="connected-apps">
			<Sidebar />
			<section className="connected-apps__main-content">
				<h1>CONNECTED APPS</h1>
				<h2>Welcome, {user.email}!</h2>
				<p>Your ID is: {user.id}</p>
			</section>
		</div>
	);
}

export default AppsPage;
