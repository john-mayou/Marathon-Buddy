import "./DashboardPage.scss";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../../../layout/Sidebar/Sidebar";
import Header from "../../../../components/Header/Header";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

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
				{/* <CalendarHeatmap
					startDate={new Date("2023-03-01")}
					endDate={new Date("2023-04-01")}
					values={[
						{ date: "2016-01-01", count: 12 },
						{ date: "2016-01-22", count: 122 },
						{ date: "2016-01-30", count: 38 },
						// ...and so on
					]}
				/> */}

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
