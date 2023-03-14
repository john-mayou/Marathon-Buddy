import "./JoinCohortPage.scss";
import Sidebar from "../../../../../layout/Sidebar/Sidebar";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

function JoinCohortPage() {
	// redux
	const dispatch = useDispatch();
	const currentCohort = useSelector(
		(store) => store.cohorts.currentCohortReducer[0]
	);

	// local state
	const [trainingDates, setTrainingDates] = useState([]); // for calendar state
	const [trainingMiles, setTrainingMiles] = useState({});

	// variables
	const availableDates = {
		min: dayjs(currentCohort?.start_date).format("YYYY/MM/DD"),
		max: dayjs(
			new Date(Date.parse(currentCohort?.start_date) + 518400000)
		).format("YYYY/MM/DD"),
	};

	// on load
	useEffect(() => {
		dispatch({ type: "FETCH_CURRENT_COHORT" });
	}, []);

	return (
		<div className="join-cohort">
			<Sidebar />
			<section className="join-cohort__main-content">
				<DatePicker
					multiple
					value={trainingDates}
					onChange={(e) => {
						setTrainingDates(e);
						setTrainingMiles(
							e.reduce((obj, date) => {
								obj[date] = 0;
								return obj;
							}, {})
						);
					}}
					format="MMM D"
					plugins={[<DatePanel />]}
					render={(value, openCalendar) => {
						return (
							<button onClick={openCalendar}>Select Dates</button>
						);
					}}
					minDate={availableDates.min}
					maxDate={availableDates.max}
				/>
				<h1>JOIN COHORT</h1>
				{<p>{currentCohort?.name}</p>}
				{
					<p>
						Start Date:{" "}
						{dayjs(currentCohort?.start_date).format("MMM D")}
					</p>
				}
				<p>Duration: 7 days</p>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Miles</th>
						</tr>
					</thead>
					<tbody>
						{trainingDates.map((day, i) => {
							return (
								<tr key={i}>
									<td>
										{dayjs(new Date(day)).format("MMM D")}
									</td>
									<td>
										<Select
											label={"Miles"}
											value={
												trainingMiles[
													dayjs(new Date(day)).format(
														"MMM D"
													)
												]
											}
											onChange={(e) => {
												const newTrainingMiles = {
													...trainingMiles,
												};
												newTrainingMiles[day] =
													e.target.value;
												setTrainingMiles(
													newTrainingMiles
												);
											}}
										>
											{[...Array(26).keys()].map(
												(notUsed, i) => {
													return (
														<MenuItem
															key={i}
															value={i}
														>
															{i}
														</MenuItem>
													);
												}
											)}
										</Select>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<button
					onClick={() => {
						Object.keys(trainingMiles).map((date) => {
							console.log(date, trainingMiles[date]);
						});
						console.log("");
					}}
				>
					Submit
				</button>
			</section>
		</div>
	);
}

export default JoinCohortPage;
