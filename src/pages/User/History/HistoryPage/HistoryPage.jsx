import "./HistoryPage.scss";
import Sidebar from "../../../../layout/Sidebar/Sidebar";
import { useSelector } from "react-redux";

function HistoryPage() {
	const user = useSelector((store) => store.user);

	return (
		<div>
			<Sidebar />
			<section className="history-main">
				<h1>HISTORY</h1>
				<h2>Welcome, {user.email}!</h2>
				<p>Your ID is: {user.id}</p>
			</section>
		</div>
	);
}

export default HistoryPage;
