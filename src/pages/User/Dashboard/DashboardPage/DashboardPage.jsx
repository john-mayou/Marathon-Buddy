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
	const userCohort = useSelector((store) => store.cohorts.userCohortReducer);

	useEffect(() => {
		dispatch({ type: "FETCH_USER_COHORT" });
	}, []);

	return (
		<div>
			<Sidebar />
			<main className="dashboard-main">
				<Header text={"Progress"} />
				<h1>{JSON.stringify(userCohort)}</h1>
				<CalendarHeatmap
					showOutOfRangeDays={true}
					horizontal={false}
					gutterSize={2}
					startDate={userCohort.start_date}
					endDate={dayjs(userCohort.start_date).add(
						userCohort.duration,
						"day"
					)}
					showMonthLabels={true}
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
