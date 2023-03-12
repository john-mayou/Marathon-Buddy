import "./JoinCohortPage.scss";
import Sidebar from "../../../../../layout/Sidebar/Sidebar";
import MultipleDatesPicker from "@ambiot/material-ui-multiple-dates-picker";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useState } from "react";

function JoinCohortPage() {
	const user = useSelector((store) => store.user);
	const [open, setOpen] = useState(false);

	return (
		<div className="join-cohort">
			<Sidebar />
			<section className="join-cohort__main-content">
				<h1>JOIN COHORT</h1>
				<Button onClick={() => setOpen(!open)}>Selected Dates</Button>
				<MultipleDatesPicker
					open={open}
					selectedDates={[]}
					onCancel={() => setOpen(false)}
					onSubmit={(dates) => console.log("selected dates", dates)}
				/>
			</section>
		</div>
	);
}

export default JoinCohortPage;
