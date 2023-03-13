import "./AdminPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminPage() {
	const dispatch = useDispatch();
	const cohorts = useSelector((store) => store.cohorts); // redux
	const [newCohortName, setNewCohortName] = useState("");
	const [newCohortDate, setNewCohortDate] = useState("");

	useEffect(() => {
		dispatch({ type: "FETCH_COHORTS" });
	}, []);

	const handleAddCohort = (e) => {
		e.preventDefault();

		const newCohort = {
			name: newCohortName,
			start_date: newCohortDate,
		};

		dispatch({ type: "ADD_COHORT", payload: newCohort });
	};

	return (
		<>
			<h1>AdminPage</h1>
			<form onSubmit={handleAddCohort}>
				<input
					type="date"
					onChange={(e) => setNewCohortDate(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Name"
					value={newCohortName}
					onChange={(e) => setNewCohortName(e.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Start Date</th>
						<th>Users</th>
						<th>Set Current</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{cohorts.map((cohort) => {
						return (
							<tr
								key={cohort.id}
								style={
									cohort.is_current
										? { backgroundColor: "lightgreen" }
										: { backgroundColor: "#f0f0f0" }
								}
							>
								<td>{cohort.name}</td>
								<td>{cohort.start_date.toString()}</td>
								<td>{cohort.users}</td>
								<td>
									<button
										onClick={() =>
											dispatch({
												type: "SET_CURRENT_COHORT",
												payload: cohort.id,
											})
										}
									>
										Set Current
									</button>
								</td>
								<td>
									<button
										onClick={() =>
											dispatch({
												type: "DELETE_COHORT",
												payload: cohort.id,
											})
										}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default AdminPage;
