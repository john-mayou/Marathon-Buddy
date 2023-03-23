import "./DashboardPage.scss";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../../../layout/Sidebar/Sidebar";
import Header from "../../../../components/Header/Header";
import CalendarHeatmap from "react-calendar-heatmap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
				<section className="dashboard">
					<div className="dashboard__heatmap-box">
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
								const date = dayjs(value.date).format(
									"ddd MMM D"
								);
								let tooltip;

								if (!value.date) {
									tooltip = `Nothing Planned`;
								} else if (value.charge === 0) {
									tooltip = `${date}: Completed :)`;
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
					</div>
					<div className="dashboard__day-details-box">
						<TableContainer
							component={Paper}
							elevation={10}
							sx={{
								maxWidth: 200,
								"& .MuiTableCell-root": { fontSize: "1.1rem" },
							}}
						>
							<Table
								sx={{ minWidth: 200 }}
								aria-label="simple table"
							>
								<TableBody>
									<TableRow>
										<TableCell component="th" scope="row">
											Day
										</TableCell>
										<TableCell component="th" scope="row">
											{focusedTraning &&
											focusedTraning.date
												? dayjs(
														focusedTraning.date
												  ).format("MMMM D")
												: "N/A"}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component="th" scope="row">
											Planned
										</TableCell>
										<TableCell component="th" scope="row">
											{focusedTraning &&
											typeof focusedTraning.planned ===
												"number"
												? `${focusedTraning.planned} Miles`
												: "N/A"}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component="th" scope="row">
											Actual
										</TableCell>
										<TableCell component="th" scope="row">
											{focusedTraning &&
											typeof focusedTraning.actual ===
												"number"
												? `${focusedTraning.actual} Miles`
												: "N/A"}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component="th" scope="row">
											Charge
										</TableCell>
										<TableCell component="th" scope="row">
											{focusedTraning &&
											typeof focusedTraning.charge ===
												"number"
												? `$${focusedTraning.charge}`
												: "N/A"}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</div>
					<StatsContainer
						header={"Personal"}
						overallStat={Math.floor(
							(currentCohort?.charge.filter((t) => t.charge > 0)
								.length /
								currentCohort?.charge.filter((t) => t.date)
									.length) *
								100
						)} // percentage of days completed by user
						milesStat={
							Math.floor(
								currentCohort?.actual.reduce(
									(totalMiles, training) => {
										return totalMiles + training.actual;
									},
									0
								)
							) // total miles run by the user
						}
					/>
					<StatsContainer
						header={"Cohort"}
						overallStat={`${
							currentCohort?.num_non_zero_charges !== 0
								? Math.floor(
										(currentCohort?.num_non_zero_charges /
											(currentCohort?.num_non_zero_charges +
												currentCohort?.num_zero_charges)) *
											100
								  )
								: 100
						}`} // finds percentage of days completed by cohort
						milesStat={
							currentCohort?.cohort_miles
								? currentCohort?.cohort_miles
								: 0
						}
					/>
				</section>
				{user.is_active ? (
					<h1>CAN SEE DATA</h1>
				) : (
					<h1>Head to Join Cohort to sign up</h1>
				)}
			</main>
		</div>
	);
}

function StatsContainer({ header, overallStat, milesStat }) {
	return (
		<section className="stats__section">
			<h1 className="stats__header-primary">{header}</h1>
			<div className="stats__data-box">
				<h6 className="stats__text">{overallStat}% Overall</h6>
				<h6 className="stats__text">{milesStat} Miles</h6>
			</div>
		</section>
	);
}

// this allows us to use <App /> in index.js
export default DashboardPage;
