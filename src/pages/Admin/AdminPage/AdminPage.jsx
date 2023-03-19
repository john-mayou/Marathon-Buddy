import "./AdminPage.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import Swal from "sweetalert2";

function AdminPage() {
	const dispatch = useDispatch();
	const cohorts = useSelector((store) => store.cohorts.cohortsReducer); // redux
	const [newCohortName, setNewCohortName] = useState("");
	const [newCohortDate, setNewCohortDate] = useState("");

	useEffect(() => {
		dispatch({ type: "FETCH_ADMIN_COHORTS" });
	}, []);

	const popupDeleteConfirmation = (cohortId) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			cancelButtonColor: "#3085d6",
			confirmButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Deleted!", "Cohort has been removed.", "success");
				dispatch({
					type: "DELETE_COHORT",
					payload: cohortId,
				});
			}
		});
	};

	const popupMakeActiveConfirmation = (cohortId, cohortName) => {
		Swal.fire({
			title: "Are you sure?",
			text: `${cohortName} will be the current cohort users can sign up for`,
			icon: "warning",
			showCancelButton: true,
			cancelButtonColor: "#3085d6",
			confirmButtonColor: "#FFA500",
			confirmButtonText: "Yes, make active!",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					"Made Active!",
					`${cohortName} is now active.`,
					"success"
				);
				dispatch({
					type: "UPDATE_CURRENT_COHORT",
					payload: cohortId,
				});
			}
		});
	};

	const handleAddCohort = (e) => {
		e.preventDefault();

		const newCohort = {
			name: newCohortName,
			start_date: newCohortDate,
		};

		dispatch({ type: "ADD_COHORT", payload: newCohort });
	};

	return (
		<div className="admin-page-container">
			<h1 className="admin-header">Admin</h1>
			<form onSubmit={handleAddCohort} className="cohort-form">
				<input
					id="cohort-date-input"
					type="date"
					onChange={(e) => setNewCohortDate(e.target.value)}
				/>
				<input
					className="cohort-name-input"
					type="text"
					placeholder="Name"
					value={newCohortName}
					onChange={(e) => setNewCohortName(e.target.value)}
				/>
				<Button
					type="submit"
					variant="contained"
					sx={{ fontSize: "1rem" }}
				>
					Add Cohort
				</Button>
			</form>
			<table className="cohort-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Date</th>
						<th>Users</th>
						<th>
							<span className="delete-when-small-screen">
								Active
							</span>
						</th>
						<th>
							<span className="delete-when-small-screen">
								Delete
							</span>
						</th>
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
								<td>
									{dayjs(cohort.start_date).format("MMM D")}
								</td>
								<td>{cohort.users}</td>
								<td>
									<Button
										color="info"
										variant="contained"
										onClick={() =>
											popupMakeActiveConfirmation(
												cohort.id,
												cohort.name
											)
										}
									>
										<span className="active-text">
											Make Active
										</span>
										<CheckIcon fontSize="small" />
									</Button>
								</td>
								<td>
									<Button
										color="error"
										variant="contained"
										onClick={() =>
											popupDeleteConfirmation(cohort.id)
										}
									>
										<DeleteIcon fontSize="small" />{" "}
										<span className="delete-text">
											Delete
										</span>
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default AdminPage;
