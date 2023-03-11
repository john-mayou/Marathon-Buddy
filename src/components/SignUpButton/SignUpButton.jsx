import "./SignUpButton.scss";
import { useHistory } from "react-router-dom";

function SignUpButton() {
	const history = useHistory();

	return (
		<a onClick={() => history.push("/login")} className="sign-up-btn">
			<span className="content">Get Started</span>
			<span className="icon">
				<i className="fa fa-arrow-right"></i>
			</span>
		</a>
	);
}

export default SignUpButton;
