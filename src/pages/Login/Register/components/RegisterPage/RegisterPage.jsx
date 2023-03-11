import "./RegisterPage.scss";

import LoginTemplate from "../../../../../layout/LoginTemplate/LoginTemplate";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
	return (
		<div>
			<LoginTemplate FormElement={RegisterForm} />
		</div>
	);
}

export default RegisterPage;
