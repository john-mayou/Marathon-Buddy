import "./DashboardPage.scss";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../../../layout/Sidebar/Sidebar";
import Header from "../../../../components/Header/Header";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import dayjs from "dayjs";

function DashboardPage() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const userData = useSelector((store) => store.userData.userDataReducer);
	const currentCohort = userData[0];

	useEffect(() => {
		dispatch({ type: "FETCH_USER_COHORT" });
		dispatch({ type: "FETCH_USER_DATA" });
	}, []);

	return (
		<div>
			<Sidebar />
			<main className="dashboard-main">
				<Header text={"Progress"} />
				<h1>NEW BELOW THIS</h1>
				{userData.map((cohort) => {
					console.log(cohort);
				})}
				<CalendarHeatmap
					showOutOfRangeDays={true}
					horizontal={false}
					gutterSize={2}
					startDate={currentCohort?.start_date}
					endDate={dayjs(currentCohort?.start_date).add(
						currentCohort?.duration,
						"day"
					)}
					showMonthLabels={true}
					showWeekdayLabels={true}
					values={[
						{ date: "2023-03-12", count: 12 },
						{ date: "2023-03-15", count: 12 },
						{ date: "2023-03-25", count: 38 },
						// ...and so on
					]}
					tooltipDataAttrs={(value) => {
						return {
							"data-tooltip-id": "calendar-tooltip",
							"data-tooltip-content": `${JSON.stringify(value)}`,
						};
					}}
				/>
				<Tooltip id="calendar-tooltip" />
				{user.is_active ? (
					<h1>CAN SEE DATA</h1>
				) : (
					<h1>Head to Join Cohort to sign up</h1>
				)}
			</main>
		</div>
	);
}

// this allows us to use <App /> in index.js
export default DashboardPage;
