import "./JoinCohortPage.scss";
import Sidebar from "../../../../../layout/Sidebar/Sidebar";
import MultipleDatesPicker from "@ambiot/material-ui-multiple-dates-picker";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function JoinCohortPage() {
	// redux
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user); // redux
	const cohorts = useSelector((store) => store.cohorts.cohortsReducer); // redux
	const currentCohort = useSelector(
		(store) => store.cohorts.currentCohortReducer[0]
	); // redux

	// local state
	const [open, setOpen] = useState(false);
	const [trainingDates, setTrainingDates] = useState([]);
	const [trainingMiles, setTrainingMiles] = useState({});

	// on load
	useEffect(() => {
		dispatch({ type: "FETCH_COHORTS" });
		dispatch({ type: "FETCH_CURRENT_COHORT" });
	}, []);

	console.log(currentCohort);
	console.log(trainingMiles);
	return (
		<div className="join-cohort">
			<Sidebar />
			<section className="join-cohort__main-content">
				<h1>JOIN COHORT</h1>
				<p>
					{currentCohort?.name} {currentCohort?.start_date}
				</p>
				<p>Duration: 7 days</p>
				<Button onClick={() => setOpen(!open)}>Selected Dates</Button>
				<MultipleDatesPicker
					open={open}
					selectedDates={[]}
					onCancel={() => setOpen(false)}
					onSubmit={(dates) => {
						setTrainingMiles(
							dates.reduce((obj, date) => {
								obj[date.toString()] = 0;
								return obj;
							}, {})
						);
						setTrainingDates(dates);
						setOpen(false);
					}}
					submitButtonText={"Done"}
				/>
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
									<td>{day.toString()}</td>
									<td>
										<Select
											label={"Miles"}
											value={
												trainingMiles[day.toString()]
											}
											onChange={(e) => {
												const newTrainingMiles = {
													...trainingMiles,
												};
												newTrainingMiles[
													day.toString()
												] = e.target.value;
												setTrainingMiles(
													newTrainingMiles
												);
											}}
										>
											<MenuItem value={0}>0</MenuItem>
											<MenuItem value={1}>1</MenuItem>
											<MenuItem value={2}>2</MenuItem>
											<MenuItem value={3}>3</MenuItem>
											<MenuItem value={4}>4</MenuItem>
											<MenuItem value={5}>5</MenuItem>
											<MenuItem value={6}>6</MenuItem>
											<MenuItem value={7}>7</MenuItem>
											<MenuItem value={8}>8</MenuItem>
											<MenuItem value={9}>9</MenuItem>
											<MenuItem value={10}>10</MenuItem>
											<MenuItem value={11}>11</MenuItem>
											<MenuItem value={12}>12</MenuItem>
											<MenuItem value={13}>13</MenuItem>
											<MenuItem value={14}>14</MenuItem>
											<MenuItem value={15}>15</MenuItem>
											<MenuItem value={16}>16</MenuItem>
											<MenuItem value={17}>17</MenuItem>
											<MenuItem value={18}>18</MenuItem>
											<MenuItem value={19}>19</MenuItem>
											<MenuItem value={20}>20</MenuItem>
											<MenuItem value={21}>21</MenuItem>
											<MenuItem value={22}>22</MenuItem>
											<MenuItem value={23}>23</MenuItem>
											<MenuItem value={24}>24</MenuItem>
											<MenuItem value={25}>25</MenuItem>
										</Select>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		</div>
	);
}

export default JoinCohortPage;
