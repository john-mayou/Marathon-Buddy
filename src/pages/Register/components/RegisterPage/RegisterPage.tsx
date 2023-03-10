import "./RegisterPage.scss";

import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage(): JSX.Element {
	const history = useHistory();

	return (
		<div>
			<RegisterForm />

			<center>
				<button
					type="button"
					className="btn btn_asLink"
					onClick={() => {
						history.push("/login");
					}}
				>
					Login
				</button>
			</center>
		</div>
	);
}

export default RegisterPage;
