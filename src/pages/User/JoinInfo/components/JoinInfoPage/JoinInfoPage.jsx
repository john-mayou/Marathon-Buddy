import "./JoinInfoPage.scss";
import Sidebar from "../../../../../layout/Sidebar/Sidebar";
import { useHistory } from "react-router-dom";

function JoinInfoPage() {
	const history = useHistory();

	return (
		<>
			<h1>Join Info Page</h1>
			<button onClick={() => history.push("/join-cohort")}>
				Sign Up
			</button>
		</>
	);
}

export default JoinInfoPage;
