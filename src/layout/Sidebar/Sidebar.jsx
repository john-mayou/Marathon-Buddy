import "./Sidebar.scss";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function UserTemplate({ PageContent }) {
	const history = useHistory();
	const dispatch = useDispatch();

	return (
		<nav className="sidebar">
			<div>
				<span>Cohorts</span>
				<ul className="sidebar__cohort-list">
					<li onClick={() => history.push("/dashboard")}>
						Dashboard
					</li>
					<li onClick={() => history.push("/join-cohort")}>
						Join Next
					</li>
					<li onClick={() => history.push("/cohort-history")}>
						History
					</li>
				</ul>
			</div>
			<div>
				<span>Account</span>
				<ul className="sidebar__account-list">
					<li onClick={() => history.push("/connected-apps")}>
						Connected Apps
					</li>
					<li onClick={() => dispatch({ type: "LOGOUT" })}>Logout</li>
				</ul>
			</div>
		</nav>
	);
}

export default UserTemplate;
