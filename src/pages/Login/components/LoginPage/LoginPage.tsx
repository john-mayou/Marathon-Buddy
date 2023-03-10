import "./LoginPage.scss";
import { useHistory } from "react-router-dom";

import LoginForm from "../LoginForm/LoginForm";

function LoginPage(): JSX.Element {
	const history = useHistory();

	return (
		<div>
			<LoginForm />

			<center>
				<button
					type="button"
					className="btn btn_asLink"
					onClick={() => {
						history.push("/registration");
					}}
				>
					Register
				</button>
			</center>
		</div>
	);
}

export default LoginPage;
