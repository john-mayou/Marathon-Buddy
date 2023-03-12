import "./AdminPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function AdminPage() {
	const [cohorts, setCohorts] = useState([]);

	useEffect(() => {
		getCohorts();
	}, []);

	const getCohorts = () => {
		axios
			.get("/api/admin")
			.then((response) => {
				setAdminText(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<h1>AdminPage</h1>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Start Date</th>
						<th>Users</th>
						<th>Completion %</th>
					</tr>
				</thead>
				<tbody>
					{cohorts.map((cohort) => {
						return (
							<tr key={cohort.id}>
								<td>{cohort.name}</td>
								<td>{cohort.start_date}</td>
								<td>{cohort.users}</td>
								<td>{cohort.completion_percentage}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default AdminPage;
