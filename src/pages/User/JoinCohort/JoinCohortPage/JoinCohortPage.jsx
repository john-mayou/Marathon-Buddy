import "./JoinCohortPage.scss";
import Sidebar from "../../../../layout/Sidebar/Sidebar";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Header from "../../../../components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

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
	const { trainingDuration } = useParams(); // from url (string)
	const dayMilliseconds = 86400000;
	const timeToAdd =
		Number(trainingDuration) * dayMilliseconds - dayMilliseconds; // substract 1 day to account for calendar inaccuracies
	const availableDates = {
		min: dayjs(currentCohort?.start_date).format("YYYY/MM/DD"),
		max: dayjs(
			new Date(Date.parse(currentCohort?.start_date) + timeToAdd)
		).format("YYYY/MM/DD"),
	};

	// on load
	useEffect(() => {
		dispatch({ type: "FETCH_CURRENT_COHORT" });
	}, []);

	return (
		<div>
			<Sidebar />
			<section className="join-cohort-main">
				<Header text={"Dashboard"} />
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
					format="YYYY-MM-DD"
					plugins={[<DatePanel />]}
					render={(value, openCalendar) => {
						return (
							<button onClick={openCalendar}>Select Dates</button>
						);
					}}
					minDate={availableDates.min}
					maxDate={availableDates.max}
				/>
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
														"YYYY-MM-DD"
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
						axios
							.post("/api/stripe/create-checkout-session", {
								dates: JSON.stringify(trainingMiles),
								cohort_id: currentCohort.id,
							})
							.then((response) => {
								window.location = response.data.url;
							})
							.catch((error) => {
								console.log(error);
							});
					}}
				>
					Submit
				</button>
			</section>
		</div>
	);
}

export default JoinCohortPage;
