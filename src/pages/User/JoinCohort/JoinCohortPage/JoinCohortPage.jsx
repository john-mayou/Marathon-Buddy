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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
					<Paper
						elevation={10}
						sx={{ textAlign: "center", padding: "0.5rem" }}
					>
						<p>The {currentCohort?.name} Cohort!</p>
						<p>
							Starts{" "}
							<strong>
								{dayjs(currentCohort?.start_date).format(
									"MMM D"
								)}
							</strong>
						</p>
						<p>
							<strong>{trainingDuration} days</strong>
						</p>
					</Paper>
					<Paper
						elevation={10}
						sx={{ textAlign: "center", padding: "0.5rem" }}
					>
						<p>How much would you want to stake?</p>
						<p>
							<strong>${stake}</strong>
						</p>
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
					</Paper>
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
										color="warning"
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
						<TableContainer
							component={Paper}
							elevation={10}
							sx={{
								maxWidth: 500,
							}}
						>
							<Table
								sx={{ minWidth: 350 }}
								aria-label="simple table"
							>
								<TableHead>
									<TableRow>
										<TableCell align="center">
											Date
										</TableCell>
										<TableCell align="center">
											Miles
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{trainingDates.map((day) => (
										<TableRow
											key={day}
											sx={{
												"&:last-child td, &:last-child th":
													{
														border: 0,
													},
											}}
										>
											<TableCell
												style={{ width: "50%" }}
												component="th"
												scope="row"
												align="center"
											>
												{dayjs(new Date(day)).format(
													"dddd MMM D"
												)}
											</TableCell>

											<TableCell
												style={{ width: "50%" }}
												align="center"
											>
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
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
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
											trainingDuration,
											startDate: currentCohort.start_date,
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
