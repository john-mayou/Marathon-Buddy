import "./LoginPage.scss";

import LoginTemplate from "../../../../../layout/LoginTemplate/LoginTemplate";
import LoginForm from "../LoginForm/LoginForm";

function LoginPage() {
	return (
		<div>
			<LoginTemplate FormElement={LoginForm} />
		</div>
	);
}

export default LoginPage;
