import "./AdminPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function AdminPage() {
	const [adminText, setAdminText] = useState("");

	useEffect(() => {
		axios
			.get("/api/admin")
			.then((response) => {
				setAdminText(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<h1>AdminPage</h1>
			<p>{adminText}</p>
		</>
	);
}

export default AdminPage;
