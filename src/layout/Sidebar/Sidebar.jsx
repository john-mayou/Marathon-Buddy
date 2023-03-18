import "./Sidebar.scss";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

function UserTemplate({ PageContent }) {
	const history = useHistory();
	const dispatch = useDispatch();

	// Dashboard history.push("/dashboard")
	// Join Next history.push("/join-info")
	// History history.push("/cohort-history")
	// Connected Apps history.push("/connected-apps")
	// Logout dispatch({ type: "LOGOUT" })

	return (
		<nav className="navbar">
			<ul className="navbar__nav">
				<li className="navbar__logo">
					<a className="navbar__link">
						<span className="logo-text link-text">
							<span className="logo-text-top">Marathon</span>
							<span className="logo-text-bottom">Buddy</span>
						</span>
						<FontAwesomeIcon
							icon={faAnglesRight}
							className="logo-icon link-icon"
						/>
					</a>
				</li>
				<li
					className="navbar__item"
					onClick={() => history.push("/dashboard")}
				>
					<a className="navbar__link">
						<FontAwesomeIcon icon={faHouse} className="link-icon" />
						<span className="link-text">Current</span>
					</a>
				</li>
				<li
					className="navbar__item"
					onClick={() => history.push("/join-info")}
				>
					<a className="navbar__link">
						<FontAwesomeIcon icon={faHouse} className="link-icon" />
						<span className="link-text">
							Join{" "}
							<span className="remove-for-mobile">Cohort</span>
						</span>
					</a>
				</li>
				<li
					className="navbar__item"
					onClick={() => history.push("/cohort-history")}
				>
					<a className="navbar__link">
						<FontAwesomeIcon icon={faHouse} className="link-icon" />
						<span className="link-text">History</span>
					</a>
				</li>
				<li
					className="navbar__item"
					onClick={() => history.push("/connected-apps")}
				>
					<a className="navbar__link">
						<FontAwesomeIcon icon={faHouse} className="link-icon" />
						<span className="link-text">
							<span className="remove-for-mobile">Connect</span>{" "}
							Apps
						</span>
					</a>
				</li>
				<li
					className="navbar__item"
					onClick={() => dispatch({ type: "LOGOUT" })}
				>
					<a className="navbar__link">
						<FontAwesomeIcon icon={faHouse} className="link-icon" />
						<span className="link-text">Logout</span>
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default UserTemplate;
