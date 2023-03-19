import "./JoinCohortPage.scss";
import Sidebar from "../../../../layout/Sidebar/Sidebar";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import Select from "@mui/material/Select";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
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
	const [stake, setStake] = useState(20);

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
			<main className="join-cohort-main">
				<Header text={`Join Cohort`} />
				<section className="join-form">
					<section className="join-form__info-container">
						<p>The {currentCohort?.name} Cohort!</p>
						<p>
							Start Date:{" "}
							<strong>
								{dayjs(currentCohort?.start_date).format(
									"MMM D"
								)}
							</strong>
						</p>
						<p>
							Duration: <strong>{trainingDuration} days</strong>
						</p>
					</section>
					<section className="join-form__stake-container">
						<span>
							How much would you want to stake?{" "}
							<strong>${stake}</strong>
						</span>
						<Slider
							className="stake-input-slider"
							aria-label="Stake"
							onChange={(e) => setStake(e.target.value)}
							value={stake}
							valueLabelDisplay="auto"
							step={5}
							marks
							min={5}
							max={25}
						/>
					</section>
					<section className="join-form__date-input-container">
						<DatePicker
							className="rmdp-mobile"
							style={{ padding: "1rem" }}
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
									<Button
										color="primary"
										variant="contained"
										className="date-picker-button"
										onClick={openCalendar}
									>
										Select Dates
									</Button>
								);
							}}
							minDate={availableDates.min}
							maxDate={availableDates.max}
						/>
					</section>
					<section className="join-form__table-container">
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
												{dayjs(new Date(day)).format(
													"dddd MMM D"
												)}
											</td>
											<td>
												<Slider
													className=""
													aria-label="Stake"
													onChange={(e) => {
														const newTrainingMiles =
															{
																...trainingMiles,
															};
														newTrainingMiles[day] =
															e.target.value;
														setTrainingMiles(
															newTrainingMiles
														);
													}}
													value={
														trainingMiles[
															dayjs(
																new Date(day)
															).format(
																"YYYY-MM-DD"
															)
														]
													}
													valueLabelDisplay="auto"
													step={1}
													marks
													min={0}
													max={15}
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</section>
					<section className="join-form__checkout-container">
						<Button
							sx={{ width: "100%" }}
							color="warning"
							variant="contained"
							onClick={() => {
								console.log(
									"training miles here",
									trainingMiles
								);
								axios
									.post(
										"/api/stripe/create-checkout-session",
										{
											dates: JSON.stringify(
												trainingMiles
											),
											cohort_id: currentCohort.id,
											stake: stake,
										}
									)
									.then((response) => {
										window.location = response.data.url;
									})
									.catch((error) => {
										console.log(error);
									});
							}}
						>
							Checkout
						</Button>
						<section className="container-to-fill-navbar-space"></section>
					</section>
				</section>
			</main>
		</div>
	);
}

export default JoinCohortPage;
