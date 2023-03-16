import "./LoginPage.scss";

import LoginTemplate from "../../../../../layout/LoginTemplate/LoginTemplate";
import LoginForm from "../LoginForm/LoginForm";

function LoginPage({ showVerifyEmail }) {
	return (
		<div>
			<LoginTemplate
				FormElement={LoginForm}
				showVerifyEmail={showVerifyEmail}
			/>
		</div>
	);
}

export default LoginPage;
