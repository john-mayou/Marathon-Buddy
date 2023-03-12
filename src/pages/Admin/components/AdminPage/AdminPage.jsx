import "./AdminPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function AdminPage() {
	const [cohorts, setCohorts] = useState([]);
	const [newCohortName, setNewCohortName] = useState("");
	const [newCohortDate, setNewCohortDate] = useState("");

	useEffect(() => {
		getCohorts();
	}, []);

	const getCohorts = () => {
		axios
			.get("/api/admin")
			.then((response) => {
				setCohorts(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleAddCohort = (e) => {
		e.preventDefault();

		const newCohort = {
			name: newCohortName,
			start_date: newCohortDate,
		};

		axios
			.post("/api/admin", newCohort)
			.then(() => {
				getCohorts();
			})
			.catch((error) => {
				console.log(error);
			});
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
					</tr>
				</thead>
				<tbody>
					{cohorts.map((cohort) => {
						return (
							<tr key={cohort.id}>
								<td>{cohort.name}</td>
								<td>{cohort.start_date.toString()}</td>
								<td>{cohort.users}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default AdminPage;
