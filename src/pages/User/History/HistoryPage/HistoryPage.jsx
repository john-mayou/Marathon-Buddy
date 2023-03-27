import "./HistoryPage.scss";
import Sidebar from "../../../../layout/Sidebar/Sidebar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../../../components/Header/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";

function HistoryPage() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const userData = useSelector((store) => store.userData.userDataReducer);

	useEffect(() => {
		dispatch({ type: "FETCH_USER_DATA" });
	}, []);

	return (
		<div>
			<Sidebar />
			<section className="history-main">
				<Header text={"History"} />
				<TableContainer
					component={Paper}
					elevation={10}
					sx={{
						maxWidth: 500,
						"& .MuiTableCell-root": { fontSize: "1.1rem" },
					}}
				>
					<Table sx={{ minWidth: 350 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Cohort</TableCell>
								<TableCell align="center">Date</TableCell>
								<TableCell align="center">Length</TableCell>
								<TableCell align="center">Miles</TableCell>
								<TableCell align="center">Completed</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{userData.map((cohort) => (
								<TableRow
									key={cohort.name}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell component="th" scope="row">
										{cohort.name}
									</TableCell>
									<TableCell align="center">
										{dayjs(cohort.start_date).format(
											"MMMM D"
										)}
									</TableCell>
									<TableCell align="center">
										{cohort.duration}
									</TableCell>
									<TableCell align="center">
										{
											Math.floor(
												cohort?.actual.reduce(
													(totalMiles, training) => {
														return (
															totalMiles +
															training.actual
														);
													},
													0
												)
											) // total miles run by the user
										}
									</TableCell>
									<TableCell align="center">
										{
											`${
												cohort?.charge.some(
													(charge) => charge.date
												) // checks if any of the charges are not null
													? Math.floor(
															(cohort?.charge.filter(
																(t) =>
																	t.charge ===
																	0
															).length /
																cohort?.charge.filter(
																	(t) =>
																		t.date
																).length) *
																100
													  )
													: 100
											}%` // percentage of days completed by user
										}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</section>
		</div>
	);
}

export default HistoryPage;
