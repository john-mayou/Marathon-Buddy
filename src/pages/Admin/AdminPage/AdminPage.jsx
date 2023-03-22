import "./AdminPage.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
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

		if (!newCohortName || !newCohortDate) {
			return;
		}

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
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<MobileDatePicker
						label={"Start Date"}
						onChange={(e) => setNewCohortDate(e)}
						minDate={dayjs()}
						sx={{ backgroundColor: "#fff", borderRadius: "5px" }}
					/>
				</LocalizationProvider>
				<TextField
					type="text"
					label="Name"
					varitant="outlined"
					value={newCohortName}
					onChange={(e) => setNewCohortName(e.target.value)}
					sx={{ backgroundColor: "#fff", borderRadius: "5px" }}
				/>
				<Button
					type="submit"
					variant="contained"
					sx={{ fontSize: "1rem" }}
				>
					Add Cohort
				</Button>
			</form>
			<TableContainer
				component={Paper}
				elevation={10}
				sx={{
					maxWidth: 700,
				}}
			>
				<Table sx={{ minWidth: 350 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="center">Date</TableCell>
							<TableCell align="center">Users</TableCell>
							<TableCell align="center">Active</TableCell>
							<TableCell align="center">Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cohorts.map((cohort) => (
							<TableRow
								key={cohort.name}
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
								}}
								style={
									cohort.is_current
										? { backgroundColor: "lightgreen" }
										: { backgroundColor: "#f0f0f0" }
								}
							>
								<TableCell component="th" scope="row">
									{cohort.name}
								</TableCell>
								<TableCell align="center">
									{dayjs(cohort.start_date).format("MMMM D")}
								</TableCell>
								<TableCell align="center">
									{cohort.users}
								</TableCell>
								<TableCell align="center">
									{cohort.is_current ? (
										<></>
									) : (
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
									)}
								</TableCell>
								<TableCell align="center">
									{cohort.is_current ? (
										<></>
									) : (
										<Button
											color="error"
											variant="contained"
											onClick={() =>
												popupDeleteConfirmation(
													cohort.id
												)
											}
										>
											<DeleteIcon fontSize="small" />{" "}
											<span className="delete-text">
												Delete
											</span>
										</Button>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default AdminPage;
