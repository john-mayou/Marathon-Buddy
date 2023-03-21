import "./DashboardPage.scss";
import React, { useEffect, useState } from "react";
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

	const calendarData = currentCohort?.planned.map((training) => {
		training.actual = currentCohort.actual?.find(
			(t) => t.date === training.date
		)?.actual;
		training.charge = currentCohort.charge?.find(
			(t) => t.date === training.date
		)?.charge;
		return training;
	});

	// local state
	const [focusedTraning, setFocusedTraining] = useState({});

	useEffect(() => {
		dispatch({ type: "FETCH_USER_DATA" });
	}, []);

	return (
		<div>
			<Sidebar />
			<main className="dashboard-main">
				<Header text={"Current"} />
				<div>
					<p>
						Date:{" "}
						{focusedTraning
							? dayjs(focusedTraning.date).format("MMMM D")
							: "N/A"}
					</p>
					<p>
						Planned:{" "}
						{focusedTraning ? focusedTraning.planned : "N/A"}
					</p>
					<p>
						Actual: {focusedTraning ? focusedTraning.actual : "N/A"}
					</p>
					<p>
						Charge: {focusedTraning ? focusedTraning.charge : "N/A"}
					</p>
				</div>
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
					values={calendarData ? calendarData : []}
					onClick={(value) => setFocusedTraining(value)}
					classForValue={(value) => {
						if (!value) {
							return `heatmap-nothing-planned`;
						} else if (value.charge === 0) {
							return `heatmap-completed`;
						} else if (value.charge) {
							return `heatmap-missed`;
						} else {
							return `heatmap-planned`;
						}
					}}
					tooltipDataAttrs={(value) => {
						const date = dayjs(value.date).format("ddd MMM D");
						let tooltip;

						if (!value.date) {
							tooltip = `Nothing Planned`;
						} else if (value.charge === 0) {
							tooltip = `${date}: Completed! :)`;
						} else if (value.charge) {
							tooltip = `${date}: Missed :(`;
						} else {
							tooltip = `${date}: ${
								value.planned > 1
									? `${value.planned} Miles`
									: `${value.planned} Mile`
							} Planned!`;
						}

						return {
							"data-tooltip-id": "calendar-tooltip",
							"data-tooltip-content": tooltip,
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
