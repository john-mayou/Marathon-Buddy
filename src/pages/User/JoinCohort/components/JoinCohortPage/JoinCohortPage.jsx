import "./JoinCohortPage.scss";
import Sidebar from "../../../../../layout/Sidebar/Sidebar";
import { useSelector } from "react-redux";

function JoinCohortPage() {
	const user = useSelector((store) => store.user);

	return (
		<div className="join-cohort">
			<Sidebar />
			<section className="join-cohort__main-content">
				<h1>JOIN COHORT</h1>
				<h2>Welcome, {user.email}!</h2>
				<p>Your ID is: {user.id}</p>
			</section>
		</div>
	);
}

export default JoinCohortPage;
