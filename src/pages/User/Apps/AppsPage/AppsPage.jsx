import "./AppsPage.scss";
import Sidebar from "../../../../layout/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../../../components/Header/Header";
import StravaLogo from "../../../../assets/images/Strava_Logo.svg.png";
import { useEffect } from "react";

function AppsPage() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	// lets user approve scope for API access
	const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=102249&response_type=code&redirect_uri=http://localhost:5000/api/strava-auth&approval_prompt=force&scope=activity:read_all`;

	return (
		<div>
			<Sidebar />
			<section className="connected-apps-main">
				<Header text={"Connect Apps"} />
				<div className="app-card">
					<div class="app-card__upper-container">
						<img src={StravaLogo} className="app-card__logo" />
						{user.strava_connected ? (
							<button
								className="app-card__connected-btn"
								onClick={() =>
									user.is_active
										? alert(
												"You can disconnect once you are done with your current cohort"
										  )
										: dispatch({
												type: "DISCONNECT_STRAVA",
										  })
								}
							>
								Connected
							</button>
						) : (
							<a
								className="app-card__connect-link"
								href={stravaAuthUrl}
							>
								Connect
							</a>
						)}
					</div>
					<p className="app-card__description">
						Allow Marathon Buddy to check you daily activies to
						update your progress
					</p>
				</div>
			</section>
		</div>
	);
}

export default AppsPage;
